---
author: Robert Wagner
authorId: rwwagner90
categories: 
  - ember
  - ember.js
  - ember data
  - ember-data
  - relationships
date: '2018-08-07'
slug: non-compliant-relationships-with-ember-data
title: Non-Compliant Relationships with Ember Data
---

Ember Data is a wonderful tool, and frequently makes you feel like dealing with a REST or JSONAPI back end 
is super easy, and downright magical. When your API conforms to the standards laid out by REST or JSONAPI, 
you basically do not need any adapters or serializers, and can just define your `attrs`, `belongsTo`, and 
`hasMany` relationships, and things "just work".

However, when things do not conform, as they should, and you have to customize things, it can get a bit hairy.
I recently had a particular situation that was giving me a lot of trouble, so I reached out to the Ember Data 
Master himself, [@runspired](https://twitter.com/Runspired), for help.

The situation was this, we had an endpoint of the form `/api/v3/foos/{fooId}/bars`, and this endpoint 
would return an array of objects of type `bar`. 

This array would need to live on the `foo` model as a `hasMany` relationship.

```js
// models/foo.js
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  bars: hasMany('bar', {
    async: true
  })
});  
```

Then, however, since we did not have a url that conformed to REST standards, we had to do some magic to add 
this relationship into `links`, which we did in the foo `serializer`. This technique was learned from a [blog 
post](https://thejsguy.com/2016/02/21/handling-nested-resources-in-ember-data.html) by David Tang.

```js
// serializers/foo.js
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeFindAllResponse(store, type, payload) {
    payload.foos.forEach((foo) => {
      foo.links = {
        bars: `/api/v3/foos/${foo.id}/bars`
      };
    });

    return this._super(...arguments);
  },

  normalizeFindRecordResponse(store, type, payload) {
    payload.foo.links = {
      bars: `/api/v3/foos/${foo.id}/bars`
    };
    
    return this._super(...arguments);
  }
});
```

This correctly setup our `hasMany` relationship so if all we needed was that, we would be done, but we did not 
actually consume the `foo.bars` array directly, rather we needed a `belongsTo` relationship on a third model, `baz`, which would map to an entry in our `hasMany` array where `baz.id === bar.id`. Since we were not using 
the values from the `hasMany` directly, and never called `get` on them, we had to make sure they were loaded 
in the model hook.

```js
model(params) {
  return this.store.find('foo', params.id)
    .then(foo => {
      return foo.hasMany('bars').load().then(() => {
        return foo;
      });
    });
},
```

With our data successfully loaded into the model and the `hasMany` triggered, we could then be sure the data 
was available, and ready to map to our `belongsTo` relationship. We would need to define a `belongsTo` in the 
`baz` model and the inverse to it in the `bar` model.

```js
// models/baz.js
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  bars: belongsTo('bar', { async: false })
});
```

```js
//models/bar.js
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  baz: belongsTo('baz', { async: false })
});
```

Finally, we had to setup a relationship in the `bar` serializer, by looping through the `hasMany` records,
and setting the `baz` relationship on each of them.

```js
// serializers/bar.js
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeResponse(store, ModelClass, rawPayload, id, requestType) {
    let normalized = this._super(store, ModelClass, rawPayload, id, requestType);
  
    if (requestType === 'findHasMany') {
      normalized.data.forEach(resource => {
        let r = resource.relationships = resource.relationships || {};
        
        r.baz = { data: { type: 'baz', id: resource.id } };
      });
    }
  
    return normalized;
  }
});
```

This allowed us to have one aggregated data set sent down from one API call, which populated the `hasMany`, 
and also allowed us to access the specific `bar` records associated with each `baz` record by just checking 
`baz.bar`, which accomplished our ultimate goal of displaying a table of `baz` records, and listing the `bar` 
values for each. Keep in mind our endpoints were not correctly REST or JSONAPI formatted, and neither of these 
relationships existed from our API, we manually forced them in.

Hopefully this helps someone struggling, as I did, with how to setup relationships for something that is not
related at all from the back end!
