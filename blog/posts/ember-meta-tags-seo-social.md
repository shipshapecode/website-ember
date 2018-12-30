---
authorId: rwwagner90
categories: 
  - blog
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

As I mentioned in my previous post on [Static Blogs with Prember and Markdown](https://shipshape.io/blog/static-blogs-with-prember-and-markdown/), 
these meta tags were hugely important to me, when deciding to move away from Ghost. This post, number two in the series on using Ember to
create a static blog, will cover my attempt at reaching parity with Ghost for meta tags.

<div class="text-center">
![Ship Shape Blog Social Media Meta Preview](/img/blog/unfurled.png)
</div>

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

There is a global config to define top level meta, like `title`, `description`, etc.  which lives in `config/environment.js`. 
The title will be used for both the ``<title>`` tag of your page, and for `og:title` and `twitter:title`. 
Similarly, the description will be used for `description`, `og:description`, and `twitter:description`. 
You probably are starting to see a pattern forming here 😃.

The global config will be merged with the local config, when you are on a specific post. This allows you to define
sane defaults, while also retaining the flexibility to override each value on a specific post, by defining it on the
`model`.

### Using the Mixins

Once you have defined your base values, there are two mixins exposed for use in your app's `blog/index` route, and each `blog/post`'s route.

The `blog-meta` mixin only needs the values from the global config, so it will work even without the model hook. You can
simply pull in the mixin, and mix it into your `blog/index` route.

```js
// routes/blog/index.js
import Route from '@ember/routing/route';
import BlogMetaMixin from 'ember-meta/mixins/blog-meta';

export default Route.extend(BlogMetaMixin, {
});
```

## Individual Post / Local Config
The `post-meta` mixin, however, relies heavily on your model values. Therefore, if you do not have a model hook, and 
your `afterModel` is passed an `undefined` model reference, an assertion will be thrown that you must have a model.


### Using with ember-cli-markdown-resolver

In this example, we are using [ember-cli-markdown-resolver](https://github.com/willviles/ember-cli-markdown-resolver)
and it will automatically set the front matter values from your markdown as properties on your model, under 
`model.attributes.title`, `model.attributes.description`, etc. when you grab the file. The post content itself will
live at `model.content`.

The values in my `.md` files look something like this:

```md
---
authorId: Robert Wagner
authorId: rwwagner90
categories: 
  - ember
  - ember.js
  - ember inspector
date: '2018-04-09'
slug: ember-inspector-the-journey-so-far
title: Ember Inspector - The Journey so Far
---
```

```js
// routes/blog/post.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import PostMetaMixin from 'ember-meta/mixins/post-meta';

export default Route.extend(PostMetaMixin, {
  markdownResolver: service(),

  model({ path }) {
    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);
    return this.markdownResolver.file('blog', withoutSlash);
  }
});
```

### Using with a Vanilla Model Hook

You do not have to use the markdown resolver, but your model must return values of the same format, i.e. an `author` 
name string, a `categories` array, a `slug` for the post, a title, etc. It must return the `content` of the post, as
the `content` property of your model object, and all the other various things as `attributes`. An example of the
same blog post from the markdown example, except using a POJO as the model, is below.

```js
// routes/blog/post.js
import Route from '@ember/routing/route';
import PostMetaMixin from 'ember-meta/mixins/post-meta';

export default Route.extend(PostMetaMixin, {
  model() {
    return {
      content: '<h1>Ember Inspector - The Journey so Far</h1> <p>This is a post body!</p>',
      attributes: {
        author: 'Robert Wagner',
        authorId: 'rwwagner90',
        categories: ['ember', 'ember.js', 'ember inspector'],
        date: '2018-04-09',
        slug: 'ember-inspector-the-journey-so-far',
        title: 'Ember Inspector - The Journey so Far'
      }
    };
  }
});
```

### Final Result

With this relatively simple setup, and the help of fastboot/prember, you should now have meta tags
rendering and be able to have fancy previews for your links, and better SEO overall! The final resulting meta should look 
something like this:

```html
<title>Ember Meta - Adding Meta Tags to Your Blog - Blog - Ship Shape</title>

<meta name="description" content="Have you noticed that most popular sites, these days, have a preview of their content magically pop up when you share 
their links on social media? 

<div class="text-center">
![Ship Shape Blog Social Media Meta Preview](/img/blog/unfurled.png)
</div>

As I mentioned in...">

<meta name="referrer" content="unsafe-url">

<link rel="canonical" href="https://shipshape.io/blog/ember-meta-tags-seo-social/">

<meta property="article:published_time" content="2018-04-15">

<meta property="article:tag" content="blog">
<meta property="article:tag" content="ember">
<meta property="article:tag" content="ember.js">
<meta property="article:tag" content="ember-meta">
<meta property="article:tag" content="fastboot">
<meta property="article:tag" content="meta">
<meta property="article:tag" content="opengraph">
<meta property="article:tag" content="prember">

<meta property="og:site_name" content="Ship Shape">

<meta property="og:title" content="Ember Meta - Adding Meta Tags to Your Blog">

<meta property="og:url" content="https://shipshape.io/blog/ember-meta-tags-seo-social/">

<meta property="og:description" content="Have you noticed that most popular sites, these days, have a preview of their content magically pop up when you share 
their links on social media? 

<div class="text-center">
![Ship Shape Blog Social Media Meta Preview](/img/blog/unfurled.png)
</div>

As I mentioned in...">

<meta property="og:type" content="article">

<meta property="og:image" content="http://i.imgur.com/KVqNjgO.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="256">
<meta property="og:image:height" content="256">

<meta name="twitter:card" content="summary">

<meta name="twitter:site" content="@shipshapecode">
<meta name="twitter:creator" content="@shipshapecode">

<meta name="twitter:image:src" content="http://i.imgur.com/KVqNjgO.png">

<meta name="twitter:title" content="Ember Meta - Adding Meta Tags to Your Blog">

<meta name="twitter:url" content="https://shipshape.io/blog/ember-meta-tags-seo-social/">

<meta name="twitter:description" content="Have you noticed that most popular sites, these days, have a preview of their content magically pop up when you share 
their links on social media? 

<div class="text-center">
![Ship Shape Blog Social Media Meta Preview](/img/blog/unfurled.png)
</div>

As I mentioned in...">

<meta name="twitter:label1" content="Written by">
<meta name="twitter:data1" content="Robert Wagner">

<meta name="twitter:label2" content="Filed under">
<meta name="twitter:data2" content="blog, ember, ember.js, ember-meta, fastboot, meta, opengraph, prember">
```


