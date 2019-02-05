---
authorId: rwwagner90
categories: 
  - ember.js
  - ember optional features
  - ember update 
date: '2018-02-18'
nextSlug: testing-ember-addons-in-an-app
nextTitle: Testing Ember Addons in a Real App Using ember-cli-addon-tests
previousSlug: static-blogs-with-prember-and-markdown
previousTitle: Static Blogs with Prember and Markdown
slug: ember-3-1-testing-and-optional-features
title: Updating to Ember 3.1 and Enabling Optional Features
---

Now that Ember 3.0 is officially out, it is time to start playing more with the new things coming in 3.1+ versions
of Ember. As I work through updating my apps and addons, I wanted to capture, step by step, what I am doing, so others
can hopefully benefit from this and update their apps.

* [Updating Ember/Ember CLI with ember-cli-update](#updating-ember)

* [Default Ember App Features](#default-features)
  1. [Native ES5 getters](#native-es5-getters)
  1. [Named Args](#named-args)
 
* [Optional Ember App Features](#optional-features)
  1. [Application Template Wrapper](#application-template-wrapper)
  1. [Template Only Glimmer Components](#template-only-glimmer-components)

* [Ember Qunit Testing Tweaks](#testing-tweaks)
  1. [ember-qunit-codemod](#ember-qunit-codemod)
  1. [ember-test-helpers-codemod](#ember-test-helpers-codemod) 

<h2 id="updating-ember">Updating Ember/Ember CLI with ember-cli-update</h2>

First, we'll want to update our project to Ember 3.1. For me, and at the time of writing this, that will be updating
my app from 2.18 to 3.1-beta.1. I chose to use [ember-cli-update](https://github.com/kellyselden/ember-cli-update) to update my app, but you can also use `ember init`.

```bash
npm install -g ember-cli-update
ember-cli-update
```

<h2 id="default-features">Default Ember App Features</h2>

Ember 3.1 brings in several new features, some of which are enabled by default like [named args](https://github.com/emberjs/rfcs/blob/master/text/0276-named-args.md), and [native ES5 getters](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md).

<h3 id="native-es5-getters">Native ES5 Getters</h3>

We'll start with ES5 getters. Since this is enabled by default, we can jump right into using the [codemod](https://github.com/rondale-sc/es5-getter-ember-codemod) to update our code. For the sake of completeness, I will also copy over the steps here.

```bash
npm install -g jscodeshift
jscodeshift -t https://rawgit.com/rondale-sc/ecma5-getter-ember-codemod/master/es5-getter-ember-codemod.js ./app
```

This should automatically change most of your usages of things like `this.get('foo')` to just `this.foo`. It does not handle all cases, but should do most of the work for you.

<h3 id="named-args">Named Args</h3>

Named args is also enabled by default, and is best explained from the summary straight from the RFC. 
It says "Introduce `{{@foo}}` in as a dedicated syntax for a component's template to refer to named arguments passed in by the caller. This just means that if `foo` is passed to your component, not a property on the component itself, you should try to
access it via `{{@foo}}`. This is not required right now, but will get you setup
for the future.

<h2 id="optional-features">Optional Ember App Features</h2>

Ember 3.1 also gives us access to a few more features, but these have to be opted into via [ember-optional-features](https://github.com/emberjs/ember-optional-features). They are not the same as the normal feature flags you are used to,
where they will be enabled by default in the near future, these will remain
optional for an indeterminate amount of time.

First, we'll want to install `ember-optional-features` like so:

```bash
ember install @ember/optional-features
```

We can then, list, enable, or disable features.

```bash
ember feature:list
ember feature:enable some-feature
ember feature:disable some-feature
```

<h3 id="application-template-wrapper">Application Template Wrapper</h3>

This adds/removes the `<div class="ember-view"></div>` wrapper from your Ember app and tests. If you do not need the extra wrapper you can remove it by running:

```bash
ember feature:disable application-template-wrapper
```

It will prompt you to add the wrapper back into your `application.hbs`. Unless you 
are really sure you don't want it, you may want to just go ahead and say yes, to be safe.

<h3 id="template-only-glimmer-components">Template Only Glimmer Components</h3>

Similar to the `application-template-wrapper` flag, you can enable
`template-only-glimmer-components` to remove the wrapper `<div>` from
components that have only a template, and no JS file. You can enable this by running:

```bash
ember feature:enable template-only-glimmer-components
```

<h2 id="testing-tweaks">Ember Qunit Testing Tweaks</h2>

<h3 id="ember-qunit-codemod">ember-qunit-codemod</h3>

[ember-qunit-codemod](https://github.com/rwjblue/ember-qunit-codemod) is a quick and easy way to update all 
your old style qunit tests to the new syntax from 
[this rfc](https://github.com/emberjs/rfcs/blob/master/text/0232-simplify-qunit-testing-api.md). 
It has been around and usable for awhile now, but if you
have not yet made the switch, I highly recommend going ahead and making the jump. 
[@rwjblue](https://twitter.com/rwjblue) also wrote a nice writeup about this testing syntax 
update on his [site](http://rwjblue.com/2017/10/23/ember-qunit-simplication/). 
Again, for the sake of not having to leave here to accomplish this, I have copied over what you need to run.

```bash
npm install -g jscodeshift
jscodeshift -t https://rawgit.com/rwjblue/ember-qunit-codemod/master/ember-qunit-codemod.js ./tests/
```

<h3 id="ember-test-helpers-codemod">ember-test-helpers-codemod</h3>

[ember-test-helpers-codemod](https://github.com/simonihmig/ember-test-helpers-codemod) is an awesome codemod 
by [@simonihmig](https://twitter.com/simonihmig) that allows us to quickly bring in the new test helpers syntax 
and remove old ember-native-dom-helpers usage, in favor of the new helpers. I ran this on most of
my Ember apps and addons and it worked perfectly, for almost all cases. To run it, you can do:

```bash
npm install -g ember-test-helpers-codemod
cd my-ember-app-or-addon
ember-test-helpers-codemod --type=integration tests/integration
ember-test-helpers-codemod --type=acceptance tests/acceptance
ember-test-helpers-codemod --type=native-dom tests
```

Hopefully this helps everyone get their Ember apps and Ember addons working on the
latest, shiniest Ember releases, and makes the process painless. If this helped you
please let me know and please share!
