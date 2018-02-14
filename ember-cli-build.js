'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const shim = require('@html-next/flexi-layouts/lib/pod-templates-shim');

shim(EmberApp);

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    'asset-cache': {
      include: [
        'assets/**/*',
        'favicons/**/*',
        'fonts/**/*',
        'img/**/*',
        'svgs/**/*'
      ],
      version: '15'
    },
    'ember-service-worker': {
      registrationStrategy: 'inline',
      versionStrategy: 'every-build'
    },
    'esw-cache-fallback': {
      patterns: [
        '/github-repos'
      ]
    },
    'esw-prember': {
      version: '15'
    },
    emberCliConcat: {
      js: {
        concat: process.env.EMBER_ENV === 'production',
        useAsync: process.env.EMBER_ENV === 'production'
      },
      css: {
        concat: false
      }
    },
    'ember-img-lazy': {
      lazyFastBoot: true,
      setSrcImmediately: true,
      observerConfig: {
        rootMargin: '100px 0px',
        threshold: 0.01
      }
    },
    'ember-prism': {
      'components': ['scss', 'javascript', 'handlebars', 'http', 'json'],
      'plugins': ['line-numbers', 'normalize-whitespace', 'show-language']
    },
    fingerprint: {
      extensions: ['js', 'css', 'map']
    },
    inlineContent: {
      app: 'inline/styles/app.css',
      blog: 'inline/styles/blog.css',
      contact: 'inline/styles/contact.css',
      'ember-consulting': 'inline/styles/ember-consulting.css',
      fonts: 'inline/styles/fonts.css',
      'google-analytics': {
        file: 'inline/ga.js',
        enabled: process.env.EMBER_ENV === 'production'
      },
      home: 'inline/styles/home.css',
      loadCSS: 'inline/loadCSS.js',
      'loading-indicator': {
        file: 'inline/loading-indicator.html',
        enabled: false
      },
      'open-source': 'inline/styles/open-source.css'
    },
    prember: {
      baseRoot: 'https://shipshape.io',
      urls: buildPremberUrls()
    },
    SRI: {
      enabled: false
    },
    treeShaking: {
      enabled: true,
      include: [
        'ember-validators/format.js',
        'ember-validators/presence.js'
      ]
    },
    vendorFiles: { 'jquery.js': null }
  });

  return app.toTree();
};

/**
 * Builds the prember urls for the blog and static pages
 * @returns {string[]} The urls for prember
 */
function buildPremberUrls() {
  // Build prember urls
  const urls = [
    '/',
    '/ember-consulting',
    '/open-source',
    '/contact',
    '/blog',
    '/blog/author/Robert%20Wagner'
  ];

  const { extname } = require('path');
  const walkSync = require('walk-sync');

  const paths = walkSync('app/blog');

  const mdFiles = paths.filter(path => extname(path) === '.md')
    .map((path) => {
      const stripMD = path.replace(/\.md/, '');
      return `/blog/${stripMD}`;
    });

  mdFiles.forEach((file) => {
    urls.push(file);
  });

  return urls;
}
