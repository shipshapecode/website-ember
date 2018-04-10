---
author: Robert Wagner
authorId: rwwagner90
date: 2018-04-09
slug: ember-inspector-the-journey-so-far
tags: ember, ember.js, ember inspector
title: Ember Inspector - The Journey so Far
---

Did you know the Ember Inspector is actually an Ember app itself? I personally had no idea, but found this to be amazingly helpful,
when trying to jump in and help with the development of new features. It is also very cool that you can work on an Ember app, that 
literally benefits all Ember developers. Learn more about how it introspects your code, and the architecture behind that capability, 
after the break.

<centered>
![Yo dawg, I heard you like inspecting Ember apps, so we made Ember Inspector an Ember app, so you can inspect your Ember app, with your Ember app.](/img/blog/inspector.jpg)
</centered>

## Getting Started with Ember Inspector

I'm always looking for new ways to help out the [Ember Teams](https://www.emberjs.com/team/), specifically
the Ember Learning Team. I have been helping out with some of the pushes to get the various website repos
all up and running in Ember, instead of Middleman, and various modernization efforts. It was brought to my
attention, by [@locks](https://github.com/locks) and [@acorncom](https://github.com/acorncom), that 
[Ember Inspector](https://github.com/emberjs/ember-inspector) could also use some love and modernization, so
I set aside some time to meet with [@teddyzeenny](https://github.com/teddyzeenny) to go over how Ember Inspector
worked.

For those of you that prefer to see a visual walkthrough of the inner workings of Ember Inspector, we 
[created a video](https://youtu.be/PvsfQrKxl_8) explaining the different parts of Ember Inspector and how they work, 
what the restrictions are for them, and how to write a new feature.

There are a few main things to note about how Ember Inspector works. These make it an interesting, and somewhat different
thought process, when you want to develop a new feature.

## `app` vs `ember_debug` and Version Support

The `master` branch of Ember Inspector only supports Ember apps running 2.8+. 
There is a [separate branch](https://github.com/emberjs/ember-inspector/tree/ember-0.0.0-2.7.0) for Ember <= 2.7.
The older branch is, typically, not updated, and all new work is done in the master branch. However, something to note is,
only the `ember_debug` folder needs to maintain compatibility with these versions, as it runs in your app, but the inspector itself,
which lives in the `app` directory, runs the version of Ember which we specify, so it only needs to support the version we pull in,
in package.json.

When Ember Inspector starts up, it will run some logic in the [startup-wrapper](https://github.com/emberjs/ember-inspector/blob/master/ember_debug/vendor/startup-wrapper.js)
which will check which version of Ember your app is on. If you are on Ember <= 2.7, it will swap out the entire codebase for the one in
the 2.7 compatible branch. This allows us to remain compatible with all Ember versions, while also adding nice improvements to the `master`
branch.

## Inspecting the Inspector

Developing the Ember Inspector can be super meta at times, as you will end up inspecting the Inspector with the Inspector. This is very
helpful to inspect the components in the Inspector itself, and see their DOM structure, data, etc. while you are developing features. 
This is accomplished by running in bookmarklet mode, which is detailed [here](https://github.com/emberjs/ember-inspector#bookmarklet-all-browsers).
You can then navigate to the Ember app you want to inspect, and open the bookmarklet, to get an instance of the Inspector running in its
own tab. Then, you can right click and inspect element on this tab to bring up DevTools for the Inspector itself, and even run the
Ember Inspector against itself, since it is an Ember app.

## Supporting Ember 3.0+

When I started working on Ember Inspector, it was not compatible with Ember 3.0+, and it was a passion of mine
to try to remedy that. This ended up being weeks of work, and pairing with [@rwjblue](https://github.com/rwjblue) 
on some of the inner workings of Ember, which ultimately culimated in one [massive PR](https://github.com/emberjs/ember-inspector/pull/762).
Some of the things we had to tackle were:
  * Converting usages of `__container__` to use the `this.owner` API and make that function correctly with Ember 2.8+
  * Using more modern testing standards and using `@ember/test-helpers`, rather than `ember-native-dom-helpers`
  * Writing our own custom setup and teardown test helpers
  * Updating from `smoke-and-mirrors` to standalone [vertical-collection](https://github.com/html-next/vertical-collection)
  * Fixing incompatibilities with newer glimmer private APIs
  
## The Future of Ember Inspector  

The future is very bright for Ember Inspector, and I just merged in some nice style updates today. There is also a PR open to support 
the DevTools dark theme, which has been a requested feature for a long time. The new component tree, which we teased in
[The Ember.js Times](https://the-emberjs-times.ongoodbits.com/2018/03/30/issue-40), is also rapidly approaching completion of its 
first iteration.
 
