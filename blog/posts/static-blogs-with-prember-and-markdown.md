---
authorId: rwwagner90
categories: 
  - blog
  - ember.js
  - fastboot
  - ghost
  - markdown
  - prember
  - prerender
  - static
date: '2018-04-04'
slug: static-blogs-with-prember-and-markdown
title: Static Blogs with Prember and Markdown
---

It has been a long time goal of mine to move my blog off of [Ghost](https://ghost.org/) and host it myself here.
I loved using Ghost and could never bring myself to make the switch, but finally decided to take the plunge.

I originally got the inspiration for using Prember from Chris Manson ([@mansona](https://github.com/mansona)) from 
[Stone Circle](https://stonecircle.io/), who was actively working on improving several of the Ember learning sites,
like the official Ember guides and getting them to run as static sites with Prember. Having been looking for a way to
use markdown to statically render my blog, I was intrigued by this possibility, and set out to implement it for the
Ship Shape blog.

I needed a few things to make this seamless. Let's break down the steps.

1. [Markdown Support](#markdown-support)
1. [Displaying Formatted Markdown and Code Syntax Highlighting](#formatting)
1. [Prember Route Generation](#prember-route-generation)

<h3 id="markdown-support">Markdown Support</h3>

I knew Chris had been working on [broccoli-static-site-json](https://github.com/stonecircle/broccoli-static-site-json), and his
own out of the box Ghost replacement [ember-casper-template](https://github.com/stonecircle/ember-casper-template), which I intend
to explore further, and potentially switch to, but wanted to document my initial approach first.

I ended up using [ember-cli-markdown-resolver](https://github.com/willviles/ember-cli-markdown-resolver) to pull in my markdown,
from my `app/blog` folder. The installation was a simple `ember install`.

```bash
ember install ember-cli-markdown-resolver
```

I then had to simply tell it the folder my markdown was in.

```js
// config/environment.js

ENV['ember-cli-markdown-resolver'] = {
  folders: {
    blog: 'app/blog'
  }
};
```

Then I needed routes for both the `blog index`, to show the links to the posts, and a `post` route to display the posts
themselves.

```bash
ember g route blog/index
ember g route blog/post
```

I then configured these routes in `router.js`.

```js
// router.js

this.route('blog', function() {
  this.route('post', { path: '/*path/' });
});
```

I then had to set up `model` hook to load the list of posts in the index.

```js
// routes/blog/index.js

import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  markdownResolver: service(),

  model() {
    return this.markdownResolver.tree('blog').then((tree) => {
      return new RSVP.Promise((resolve) => {
        const sortedPosts = tree.files.sortBy('attributes.date').reverse();
        resolve(sortedPosts);
      });
    });
  }
});
```

Once we had the list of posts, we needed to make sure each post route would load the content for that
individual post.

```js
// routes/blog/post.js

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  markdownResolver: service(),

  model({ path }) {
    // We had to handle removing the slash that we need for pulling static html from most servers
    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);
    return this.markdownResolver.file('blog', withoutSlash);
  }
});
```

You might notice, we have some extra logic to remove slashes from the path. We want to enforce routes having a trailing
slash because most static servers like having the slash to pull the index.html for each route automatically. Without the slash
you will get a redirect to the slash most times. This is a common thing we need to handle in several places.

<h3 id="formatting">Displaying Formatted Markdown and Code Syntax Highlighting</h3>

With this simple setup, we are now pulling in the data from the markdown, but we need a way to display this in a meaningful way.
For this we will be using [ember-cli-showdown](https://github.com/gcollazo/ember-cli-showdown) and 
[ember-prism](https://github.com/shipshapecode/ember-prism).

```bash
ember install ember-cli-showdown
ember install ember-prism
```

I use the markdown front matter to define a slug for the posts, which is the same as the name of the markdown file, so we can link to it.
I also supply titles, authors, and any other data that makes sense. For example the front matter for this post is:

```md
---
authorId: Robert Wagner
authorId: rwwagner90
date: 2018-04-04
slug: static-blogs-with-prember-and-markdown
tags: ember, fastboot, static, prember, prerender, blog, ghost, markdown
title: Static Blogs with Prember and Markdown
---
```

To display the list of blog posts we will simply each through the `model` provided in the blog index route.

```handlebars
// templates/blog/index.hbs or a component for the menu etc

{{#each posts as |post|}}
   <box fit class="blog-post">
     {{link-to post.attributes.title 'blog.post' post.attributes.slug class="title"}}

     <div class="attribution">
       By {{post.attributes.author}} {{moment-format post.attributes.date 'LL'}}
     </div>
   </box>
{{/each}}
```

In the blog post route, we simply want to pass the content to showdown. I personally do some displaying of the author, and author image,
the date of the post, etc. but the only requirement is to pass the markdown to showdown.

```handlebars
{{markdown-to-html content}}
```

We should now have the markdown for the post displayed! `ember-prism` should be automatically doing syntax highlighting of code blocks
placed in markdown, but it may require some additional language config. You will also likely want to copy over some styles to make things
look nice. The markup will be unstyled from showdown, but you can borrow styles from your favorite markdown rendering site, like Ghost,
GitHub, etc.

<h3 id="prember-route-generation">Prember Route Generation</h3>

The final step is to install Prember and make sure it knows about these routes we have created. 

```bash
ember install prember
```

I have a simple function I use to generate the route paths to pass to Prember from our markdown.

```js
function buildPremberUrls() {
  // Build prember urls
  const urls = [
    '/',
    '/ember-consulting/',
    '/open-source/',
    '/contact/',
    '/blog/',
    '/blog/author/rwwagner90/'
  ];

  const { extname } = require('path');
  const walkSync = require('walk-sync');

  const paths = walkSync('app/blog');

  const mdFiles = paths.filter(path => extname(path) === '.md')
    .map((path) => {
      const stripMD = path.replace(/\.md/, '');
      return `/blog/${stripMD}/`;
    });

  mdFiles.forEach((file) => {
    urls.push(file);
  });

  return urls;
}
```

This defines our routes that we are always sure will remain the same, and then looks at our markdown files to generate the other
routes. This ensures, when we add new markdown files, the new routes are automatically pulled into Prember. Prember only runs in 
production or when you run `PREMBER=true ember s`. You may need to also install `prember-middleware` and `ember-cli-fastboot`, but
please refer to the most up to date instructions in the [Prember README](https://github.com/ef4/prember).

### Next Steps

This was just the initial implementation, but I will follow up with further posts to improve upon this functionality, by doing
things like:

  - [Offline support with service workers](https://shipshape.io/blog/offline-first-prember-and-service-workers/)
  - [Forcing trailing slashes in routes](https://shipshape.io/blog/forcing-trailing-slashes-in-routes/)
  - Maintaining scroll position with `ember-router-scroll`
  - [Defining meta and tags similar to Ghost](https://shipshape.io/blog/ember-meta-tags-seo-social/)
  - Further SEO and structured data tweaks
  
Thanks for reading! I hope this helps, and stay tuned for the followup posts!







