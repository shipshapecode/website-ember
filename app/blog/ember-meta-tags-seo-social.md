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

### Simplifying Meta with ember-meta
