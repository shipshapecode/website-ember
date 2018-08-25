---
author: robert
categories: 
  - ember
  - ember.js
  - ember data
  - ember-data
  - relationships
date: '2018-08-07'
slug: ad-hoc-relationships-with-ember-data
title: Ad Hoc Relationships with Ember Data
---

Ember Data is a wonderful tool, and frequently makes you feel like dealing with a REST or JSONAPI back end 
is super easy, and downright magical. When your API conforms to the standards laid out by REST or JSONAPI, 
you basically do not need any adapters or serializers, and can just define your `attrs`, `belongsTo`, and 
`hasMany` relationships, and things "just work".

However, when things do not conform, as they should, and you have to customize things, it can get a bit hairy.
I recently had a particular situation that was giving me a lot of trouble, so I reached out to the Ember Data 
Master himself, [@runspired](https://twitter.com/Runspired), for help.

We had a relationship like `website -> page -> pageViewStats`, where each website could have multiple pages and each
page would have a single `pageViewStats` object. However, we had an endpoint of the form 
`/api/v3/websites/{websiteId}/pageViewStats`, and this endpoint would return an array of objects 
of type `pageViewStat`. 

This array would need to live on the `website` model as a `hasMany` relationship.

```js
// models/website.js
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  pageViewStats: hasMany('pageViewStat', {
    async: true
  })
});  
```

Then, however, since we did not have a url that conformed to REST standards, we had to do some magic to 
add this relationship into `links`, which we did in the website `serializer`. This technique was learned
from a [blog post](https://thejsguy.com/2016/02/21/handling-nested-resources-in-ember-data.html) by 
[David Tang](https://twitter.com/iamdtang).

```js
// serializers/website.js
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeFindAllResponse(store, type, payload) {
    payload.websites.forEach((website) => {
      website.links = {
        pageViewStats: `/api/v3/websites/${website.id}/pageViewStats`
      };
    });

    return this._super(...arguments);
  },

  normalizeFindRecordResponse(store, type, payload) {
    payload.website.links = {
      pageViewStats: `/api/v3/websites/${website.id}/pageViewStats`
    };
    
    return this._super(...arguments);
  }
});
```

This correctly setup our `hasMany` relationship so if all we needed was that, we would be done, but we 
did not actually consume the `website.pageViewStats` array directly, rather we needed a `belongsTo` 
relationship on a third model, `page`, which would map to an entry in our `hasMany` array where 
`page.id === pageViewStats.id`. Since we were not using the values from the `hasMany` directly, and 
never called `get` on them, we had to make sure they were loaded in the model hook.

```js
model(params) {
  return this.store.findRecord('website', params.id)
    .then(website => {
      return website.hasMany('pageViewStats').load().then(() => {
        return website;
      });
    });
},
```

With our data successfully loaded into the model and the `hasMany` triggered, we could then be sure the data 
was available, and ready to map to our `belongsTo` relationship. We would need to define a `belongsTo` in
the `page` model and the inverse to it in the `pageViewStat` model.

```js
// models/page.js
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  pageViewStats: belongsTo('pageViewStat', { async: false })
});
```

```js
//models/page-view-stat.js
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  page: belongsTo('page', { async: false })
});
```

Finally, we had to setup a relationship in the `pageViewStat` serializer, by looping through the `hasMany` records,
and setting the `page` relationship on each of them.

```js
// serializers/page-view-stat.js
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeResponse(store, ModelClass, rawPayload, id, requestType) {
    let normalized = this._super(store, ModelClass, rawPayload, id, requestType);
  
    if (requestType === 'findHasMany') {
      normalized.data.forEach(resource => {
        let r = resource.relationships = resource.relationships || {};
        
        r.page = { data: { type: 'page', id: resource.id } };
      });
    }
  
    return normalized;
  }
});
```

This allowed us to have one aggregated data set sent down from one API call, which populated the `hasMany`, 
and also allowed us to access the specific `pageViewStat` records associated with each `page` record by 
just checking `page.pageViewStats`, which accomplished our ultimate goal of displaying a table of `page`
records, and listing the `pageViewStat` values for each. Keep in mind our endpoints were not correctly 
REST or JSONAPI formatted, and neither of these relationships existed from our API, so we manually forced 
them in.

Hopefully this helps someone struggling, as I did, with how to setup relationships for something that is
not related at all from the back end!
