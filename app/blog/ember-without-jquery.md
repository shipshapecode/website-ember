---
author: Robert Wagner
date: 2017-09-08
slug: ember-without-jquery
tags: ember, ember data, ember.js, jQuery
title: Removing jQuery from Ember - For Dummies
---

I've recently been on a crusade to remove jQuery from all my apps and addons, in an attempt to save the 35 kb (min + gzip) that jQuery adds to the payload of all Ember apps. I have been following this amazing [blog post](http://miguelcamba.com/blog/2017/04/11/the-future-of-embers-testing-and-the-beheading-of-jquery/), by [Miguel Camba](https://twitter.com/MiguelCamba), but wanted to just list out some quick steps, in less detail, for removing jQuery from you app or addon. If you encounter issues or want more detail on how to do things, I highly recommend checking out the original [blog post](http://miguelcamba.com/blog/2017/04/11/the-future-of-embers-testing-and-the-beheading-of-jquery/)!

### Setting up your app/addon
1. Make sure you are on Ember `2.13+`
2. `ember install ember-native-dom-event-dispatcher`
4. Remove `ember-ajax` and optionally replace with `ember-fetch`
5. If you use `ember-data`, you will need to [tell it to use `ember-fetch`](https://github.com/ember-cli/ember-fetch#use-with-ember-data) as well.
6. If you are using `ember-fastboot`, you must override the initializer. Create a new file `<your app name>/fastboot/initializers/ajax.js` and paste in the following contents:

```javascript
export default {
  name: 'ajax-service',
  initialize() {
    // noop
    // This initializer is here to avoid https://github.com/ember-fastboot/ember-cli-fastboot/blob/master/fastboot/initializers/ajax.js
    // from running and undoing the work ember-fetch does.
  }
};
```

### Setting up tests
1. `ember install ember-native-dom-helpers`
2. `ember install ember-maybe-import-regenerator`

### Removing all jQuery from the app/addon/tests
1. The easiest way to be sure you have removed all jQuery everywhere is to use `eslint-plugin-ember` and enable the `no-jquery` rule. This will flag `Ember.$`, `this.$`, etc. and make it easy to see what you need to remove.
2. Once all jQuery has been flagged, go through and replace things like `this.$` with `this.element` in app code, and things like `this.$('.foo')` in tests with the `ember-native-dom-helpers` equivalent, like `find('.foo')`. **Note:** There is a [codemod](https://github.com/simonihmig/ember-native-dom-helpers-codemod) that can help with migration of your tests. It is not perfect, but should work well for most cases.
3. Finally, you need to tell `ember-cli-build.js` to not include jQuery, by doing something like:

```javascript
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    vendorFiles: { 'jquery.js': null }
  });

  return app.toTree();
};
```

### Addon Specific Tweaks
For addons using `ember-try`, for all scenarios where Ember `< 2.13`, you will need to set `'ember-native-dom-event-dispatcher': null` in `config/ember-try.js`.

example:
```json
{
  name: 'ember-lts-2.12',
    npm: {
      devDependencies: {
        'ember-source': '~2.12.0',
        'ember-native-dom-event-dispatcher': null
      }
    }
}
```

You will also need to tweak your `ember-cli-build.js` to reflect these changes:
```javascript
/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let project = defaults.project;
  let options = {};

  if (project.findAddonByName('ember-native-dom-event-dispatcher') && process.env.DEPLOY_TARGET === undefined) {
    options.vendorFiles = { 'jquery.js': null };
  }

  let app = new EmberAddon(defaults, options);

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
```

That should be it! If you think I missed something major, please reach out and let me know! Again, this is a quick and dirty list of the things you need to do, intended for those with prior experience removing jQuery to refer to, and not intended to explain the *why* or *how* exactly we are removing jQuery, so for more details, refer to Miguel's [blog post](http://miguelcamba.com/blog/2017/04/11/the-future-of-embers-testing-and-the-beheading-of-jquery/).
