---
author: Robert Wagner
authorId: rwwagner90
categories: 
  - ember
  - ember.js
  - history-location
  - routes
  - static html
  - trailing slash
date: '2018-08-13'
slug: forcing-trailing-slashes-for-routes
title: Forcing Trailing Slashes for Routes
---

Most static asset servers will load `index.html` files from paths automatically, if they end in a
trailing `/`. However, Ember routes typically omit the `/`, so to get everything loading, without a redirect,
I had to apply some tweaks. This was completely stolen from the [Ember Guides App](https://github.com/ember-learn/guides-app/blob/448308e28bf32f37ed4141fe8e529ba24b32087b/app/locations/trailing-history.js).
They use Prember there as well, and several of our techniques overlap.

Essentially, we just need to override the `HistoryLocation` location, and everything should "just work".

```js
// locations/history-location.js
import HistoryLocation from '@ember/routing/history-location';

export default HistoryLocation.extend({
  formatURL() {
    let url = this._super(...arguments);

    if (url.includes('#')) {
      return url.replace(/([^/])#(.*)/, '$1/#$2');
    } else {
      return url.replace(/\/?$/, '/');
    }
  }
});
```

For my use case specifically, I was using ember-router-scroll, and I just had to apply the same tweak there.

```js
// locations/router-scroll.js
import EmberRouterScroll from 'ember-router-scroll/locations/router-scroll';

export default EmberRouterScroll.extend({
  formatURL() {
    let url = this._super(...arguments);

    if (url.includes('#')) {
      return url.replace(/([^/])#(.*)/, '$1/#$2');
    } else {
      return url.replace(/\/?$/, '/');
    }
  }
});
```

That's all folks! More posts on all the pieces of my static blog setup coming soon!
