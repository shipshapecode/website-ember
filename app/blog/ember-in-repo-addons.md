---
author: Robert Wagner
date: 2016-07-19
slug: ember-in-repo-addons
tags: ember, ember.js, in-repo addons
title: Ember In-Repo Addons
---

### What is an in-repo addon and why should you use it?

An in-repo addon lives in your app's `lib` folder and is a lightweight alternative to a traditional addon. It is not published to npm and is extremely lightweight, only containing an `index.js` and a `package.json`.

An in-repo addon can be used for several reasons.

1. [Project specific addons](#project-specific-addons)
1. [Organizing code](#organizing-code)
1. [Quick addon prototyping](#quick-addon-prototyping)
1. [Managing vendor code](#managing-vendor-code)

#### <h5 id="project-specific-addons">Project Specific Addons</h5>

You may find that you have sections of your app that are good candidates for being addons, but they are not something you can make public, so rather than creating a traditional addon, you could make it an in-repo addon.

#### <h5 id="organizing-code">Organizing Code</h5>

In repo addons are created in the `lib` folder and are a good way to organize your code by various features or sections of your app. An example of this would be creating a `navigation` addon and putting all of your navigation related components and such inside that addon. This helps to keep related code all in the same place.

#### <h5 id="quick-addon-prototyping">Quick Addon Prototyping</h5>

If you have a quick idea for an addon, and want to iterate on it directly in your current Ember app, you can do this with an in-repo addon. Then, if you decide you want to make it a full fledged addon, you is easy to copy your work over.

#### <h5 id="managing-vendor-code">Managing Vendor Code</h5>

You can take advantage of all available addon hooks. The `included` hook allows you to specify what vendor libraries should be pulled in and added.


Most of this info was taken from [this video](https://www.youtube.com/watch?v=VYrMs1Zzpqs), as I could not really find any official documentation on in-repo addons. For more details, I highly recommend watching the video. Thanks a ton to Jake Bixby for the talk!
