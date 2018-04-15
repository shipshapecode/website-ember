---
author: Robert Wagner
authorId: rwwagner90
categories: 
  - blog
  - ember
  - ember.js
  - ember-meta
  - fastboot
  - meta
  - opengraph
  - prember
date: '2018-04-15'
slug: ember-meta-tags-seo-social
title: Ember Meta - Adding Meta Tags to Your Blog
---
Have you noticed that most popular sites, these days, have a preview of their content magically pop up when you share 
their links on social media? 

<centered>
![Ship Shape Blog Social Media Meta Preview](/img/blog/unfurled.png)
</centered>

As I mentioned in my previous post on [Static Blogs with Prember and Markdown](https://shipshape.io/blog/static-blogs-with-prember-and-markdown/), 
these meta tags were hugely important to me, when deciding to move away from Ghost. This post, number two in the series on using Ember to
create a static blog, will cover my attempt at reaching parity with Ghost for meta tags.

There are several meta types, from opengraph, to Twitter tags, to standard meta and links. These tags provide several benefits, 
including more structured data for SEO and nice looking previews of your content when you post links on social media.

### Adding Meta with ember-cli-head

I originally took the brute force approach, and just added new meta, every time I found it, using
[ember-cli-head](https://github.com/ronco/ember-cli-head). I would set the various meta values in 
the `afterModel` hook of my `blog/index` and `blog/post` routes. This did work, but I felt I could
make it a bit more generic and share it with the Ember community, so that, if you were following the
prescribed front matter format in your markdown, you would just get most of the meta for free.

### Simplifying Meta with ember-meta

In an attempt to make this easy for everyone, to have a blog with mostly automatic meta, I created 
[ember-meta](https://github.com/shipshapecode/ember-meta). It takes some common values like, titles,
descriptions, authors, etc. and generates opengraph and twitter meta tags, canonical urls from slugs, 
and most of the things that I found that Ghost was giving me out of the box.

It can be used with or without markdown, and supports just normal POJOs, as well as ember-cli-markdown-resolver,
or any sort of model that gives you the prescribed data format.

### Global Config

```javascript
// config/environment.js
ENV['ember-meta'] = {
  description: 'Ramblings about Ember.js, JavaScript, life, liberty, and the pursuit of happiness.',
  imgSrc: 'http://i.imgur.com/KVqNjgO.png',
  siteName: 'Ship Shape',
  title: 'Blog - Ship Shape',
  twitterUsername: '@shipshapecode',
  url: 'https://shipshape.io/blog/'
};
```

The title will be used for both the ``<title>`` tag of your page, and for `og:title` and `twitter:title`. 
Similarly, the description will be used for `description`, `og:description`, and `twitter:description`. 
You probably are starting to see a pattern forming here 😃.


