---
authorId: rwwagner90
categories: 
  - catch belongsTo 404
  - ember.js
  - ember-data
  - get or create
date: '2018-10-8'
previousSlug: converting-a-webpack-build-to-rollup
previousTitle: Converting a Webpack Build to Rollup
nextSlug: forcing-trailing-slashes-for-routes
nextTitle: Forcing Trailing Slashes for Routes
slug: ember-data-belongs-to-find-or-create
title: Creating a Default Record When a belongsTo Request Errors
---

## Creating a Default Record When a belongsTo Request Errors

Today I had an interesting need in ember-data, which was to create an empty record,
when the API returned a 404 for a `belongsTo`. Typically an `AdapterError` would be thrown,
but we have some really hacky stuff in our serializer to create a bunch of blank lines, and I
basically wanted ember-data to behave as if it had not received a 404, and return an empty record.

*Note:* I do not think this is necessary if you correctly follow JSONAPI, as it should return 200 and
`{ data: null }`.

Naturally, I reached out to [runspired](https://twitter.com/Runspired), and he had an elegant solution for me,
as he always does. The solution was to catch the error in the `findBelongsTo` method, and return an empty record there.

### Models

The models simply setup the relationships between themselves. For the sake of illustration, we will use a person -> address relationship.

```js
// app/models/person.js
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  address: belongsTo('address', { async: true })
});
```

```js
// app/models/address.js
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  line1: attr('string'),
  line2: attr('string'),
  city: attr('string'),
  state: attr('string'),
  zip: attr('string'),
  
  person: belongsTo('person', { async: false })
});
```

### Adapter

The adapter is going to catch the 404, and return an object with a default value instead, so this will be 
serialized as the "value from the server", and treated just like a normal server response would be.

```js
// app/adapters/person.js
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  async findBelongsTo(store, snapshot, url, relationship) {
    const response = await this._super(store, snapshot, url, relationship).catch((error) => {
      // If the relationship is of type `address` and the error status is 404, return an empty object
      if (relationship.key === 'address' && error.errors[0].status === '404') {
        return {
          line1: null,
          line2: null,
          city: null,
          state: null,
          zip: null
        };
      }

      // For other errors, we should rethrow them here
      throw error;
    });

    return response;
  }
});
```

That's all there is to it! It's a pretty elegant and straightforward concept, and just one more reason 
ember-data is such a powerful tool.
