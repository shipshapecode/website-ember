---
author: Robert Wagner
date: 2016-05-22
slug: ember-data-passing-query-params-to-save
tags: ember, ember data, ember.js, query params
title: Ember Data | Passing query params to .save()
---

I recently had a need to pass query params to an Ember Data `save()` call, and I found all of the StackOverflow answers, and blog posts lacking on how exactly to do this, especially for someone new to Ember Data.

Therefore, I decided I would post this article detailing how exactly I did it.

The model I need to accept query params on save, is the `appointment` model. 

My application adapter uses the `DS.JSONAPIAdapter` and I wanted to extend that default adapter, and just add some query params to the `appointment.save()` call.

To create the adapter I simply ran `ember g adapter appointment`

Then you have to override the `updateRecord` method, since that is what is called for a `save()`. The resulting adapter looks something like this:

```javascript
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  updateRecord(store, type, snapshot) {
    const data = {};
    const serializer = store.serializerFor(type.modelName);

    serializer.serializeIntoHash(data, type, snapshot, {includeId: true});

    const id = snapshot.id;
    let url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

    if (snapshot.adapterOptions && snapshot.adapterOptions.recurrenceStart) {
      url += '?recurrenceStart=' + snapshot.adapterOptions.recurrenceStart;
    }

    return this.ajax(url, 'PATCH', {data: data});
  }
});

```

For the most part, this is just a copy of the `updateRecord` method from the `DS.JSONAPIAdapter`, so you'll want to copy the `updateRecord` method from whatever adapter you are using by default.

The important part, which adds the query params to the url is this:
```javascript
if (snapshot.adapterOptions && snapshot.adapterOptions.recurrenceStart) {
  url += '?recurrenceStart=' + snapshot.adapterOptions.recurrenceStart;
}
```

To execute a `save` and pass this query param, you'll want to do something like this:

```javascript
appointment.save(adapterOptions: {
  recurrenceStart: 'foo'
});
```

Hopefully this helps someone!
