---
author: Robert Wagner
date: 2017-04-29
slug: aiming-for-targets-with-ember
tags: ember, ember.js, targets, ember-targets, uglify, babili
title: Aiming for Targets with Ember
---

After reading Robert Jackson's [post on targets](http://rwjblue.com/2017/04/21/ember-cli-targets/), I was excited to take them for a spin and see what sort of file size savings I could get.

### First Attempt

I took an initial baseline of my assets size by running `ember build -e production` and the results were:

```bash
Built project successfully. Stored in "dist/".
File sizes:
 - dist/assets/app-ed3f163b630b0d2b570173c1e8d18615.js: 1.07 MB (299.73 KB gzipped)
 - dist/assets/vendor-6af16040c81f20f4b2234c42a8a4beac.css: 32.22 KB (2.65 KB gzipped)
 - dist/assets/vendor-f949761a7a5cd48a7c7292cfc09bf418.js: 922.59 KB (247.49 KB gzipped)
 - dist/assets/website-2fa46a5c7afe642b487ec9731fa1c2c4.js: 171.25 KB (52.61 KB gzipped)
 - dist/assets/website-7e684cc7e7a3d12928c6c1dc97f02b42.css: 27.84 KB (6.07 KB gzipped)
 - dist/fastboot/app-a7f5e95e830a8cd3026397b7478e66f9.js: 1.05 MB (292.99 KB gzipped)
 - dist/fastboot/vendor-9a59137d0718ea394fe7fa22e3e4409b.js: 899.92 KB (240.6 KB gzipped)
 - dist/fastboot/website-39873fd8c3d07f7efe66d03642f86cd6.js: 171.69 KB (52.81 KB gzipped)
 - dist/sw-registration.js: 551 B (266 B gzipped)
 - dist/sw.js: 2.06 KB (875 B gzipped)
```

I then set my config.targets.js to:

```js
module.exports = {  
  browsers: [
    'last 1 Chrome versions',
    'last 1 Firefox versions',
    'last 1 Safari versions',
    'last 1 Edge versions'
  ]
};
```

And ran:

```bash
npm uninstall --save-dev ember-cli-uglify  
npm install --save-dev ember-cli-babili 
yarn install --force
```

Running `ember build -e production` again yielded these results:

```bash
Built project successfully. Stored in "dist/".
File sizes:
 - dist/assets/app-616942e0c66a58ef1f048307897b071a.js: 1.06 MB (298.8 KB gzipped)
 - dist/assets/vendor-2cd06143ca9e30bb637a5a32267a9583.js: 919.02 KB (246.55 KB gzipped)
 - dist/assets/vendor-6af16040c81f20f4b2234c42a8a4beac.css: 32.22 KB (2.65 KB gzipped)
 - dist/assets/website-7e684cc7e7a3d12928c6c1dc97f02b42.css: 27.84 KB (6.07 KB gzipped)
 - dist/assets/website-b5111d48332706d0babd610d389fe899.js: 171.09 KB (52.58 KB gzipped)
 - dist/fastboot/app-798284e87b295c8c24cfb12bf74d0b7e.js: 1.05 MB (292.81 KB gzipped)
 - dist/fastboot/vendor-7dafe7963c85c437ed6a99bbfd985661.js: 898.88 KB (240.44 KB gzipped)
 - dist/fastboot/website-a3ee5f835348a2a02bbd31e311fe7302.js: 171.53 KB (52.78 KB gzipped)
 - dist/sw-registration.js: 551 B (266 B gzipped)
 - dist/sw.js: 2.06 KB (874 B gzipped)
```

This was less than ideal, as you'll probably notice that most of the dist sizes actually increased! I then decided I should probably go through my addons and give them the same treatment, to see if we could get some of this magic working.

### Applying to addons

I updated all my addons to the latest ember-cli 2.13 beta, and made sure they were running ember-cli-babel 6.0+, to ensure compatibility with targets.

I started with [ember-3d-nav](https://github.com/shipshapecode/ember-3d-nav) and wanted to try a build after updating it in my app, to see if anything got any smaller.

Unfortunately, the results were roughly the same as what I had seen already, either no change or an increase in file size.

```bash
Built project successfully. Stored in "dist/".
File sizes:
 - dist/assets/app-496f5c4b1a5b45066122a724c08f4886.js: 1.07 MB (298.9 KB gzipped)
 - dist/assets/vendor-becf14be4d6ee60b88817a04f91f61db.css: 55.69 KB (3.8 KB gzipped)
 - dist/assets/vendor-d4390c62c90b23f399913337814fee53.js: 919.92 KB (246.64 KB gzipped)
 - dist/assets/website-7e684cc7e7a3d12928c6c1dc97f02b42.css: 27.84 KB (6.07 KB gzipped)
 - dist/assets/website-b5111d48332706d0babd610d389fe899.js: 171.09 KB (52.58 KB gzipped)
 - dist/fastboot/app-263ff1cb824e1c1538218a53ba3134b7.js: 1.05 MB (292.9 KB gzipped)
 - dist/fastboot/vendor-0147b053cf29440df736418b613b4b9e.js: 899.64 KB (240.52 KB gzipped)
 - dist/fastboot/website-a3ee5f835348a2a02bbd31e311fe7302.js: 171.53 KB (52.78 KB gzipped)
 - dist/sw-registration.js: 551 B (266 B gzipped)
 - dist/sw.js: 2.06 KB (877 B gzipped)
```

I spoke with Robert Jackson about these results, and he confirmed that babili is just not as good as uglify at minification, so the file sizes may increase slightly, but should be roughly the same as with uglify.

## tl;dr

Targets are cool, and I am going to use them. Hopefully most people will, but there are some cases where file sizes are a bit larger, and it may not be for everyone.
