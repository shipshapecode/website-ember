'use strict';

let siteURL = 'https://shipshape.io';

module.exports = {
  feed: {
    title: 'Ship Shape Blog',

    description: 'A blog on Ember.js, JavaScript, and anything and everything related to the web.',

    site_url: siteURL,

    // Icon of your site
    image_url: `${siteURL}/img/logo.png`,

    managingEditor: 'ahoy@shipshape.io (Robert Wagner)',

    webMaster: 'ahoy@shipshape.io (Robert Wagner)',

    copyright: '2018 Ship Shape Consulting LLC'
  },

  //Glob style patterns (https://github.com/isaacs/node-glob#glob-primer)
  articles: './app/blog/*.md',

  /** Actual URL of individual blog post */
  urlForPost(postMeta) {
    return `${siteURL}/blog/${postMeta.slug}/`;
  }
};
