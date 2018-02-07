---
author: Robert Wagner
date: 2017-07-31
slug: reloading-hasmany-relationships
tags: ember, ember data, ember.js, hasMany
title: Reloading hasMany relationships
---

A few months back, I had a need to have a `hasMany` relationship automatically reload itself when I saved a `user`.

It seemed to me, that Ember Data would handle this for me, if I did a manual `reload` of the model, but it seems this was incorrect. Despite reloading the `user` attributes, none of the relationships are reloaded and you must manually trigger a reload on them.

For anyone else who has the same problem, here is how I got around it and forced a reload:

```javascript
item.save().then(() => {
  const user = this.modelFor(this.routeName);
      const item = this.store.createRecord(type);
      const pluralType = `${type}s`;
      user.get(pluralType).addObject(item);
        return user.save().then((savedUser) => {
          savedUser.hasMany(pluralType).reload();
        });
      });
```
