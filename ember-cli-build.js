'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const shim = require('@html-next/flexi-layouts/lib/pod-templates-shim');
const { readFileSync } = require('fs');
const { extname } = require('path');
const yamlFront = require('yaml-front-matter');
const walkSync = require('walk-sync');

shim(EmberApp);

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    gzip: {
      appendSuffix: false,
      extensions: ['js', 'css', 'svg'],
      keepUncompressed: false
    },
    imagemin: {
      enabled: true,
      plugins: [
        require('imagemin-jpegtran')({ progressive: true }),
        require('imagemin-optipng')(),
        require('imagemin-webp')(),
        require('imagemin-svgo')()
      ]
    },
    'asset-cache': {
      include: [
        'assets/**/*',
        'favicons/**/*',
        'fonts/**/*',
        'img/**/*'
      ],
      version: '68'
    },
    'ember-cli-markdown-to-json': [
      {
        attributes: [
          'categories',
          'date',
          'slug',
          'title'
        ],
        collections: [{
          src: 'blog/posts',
          output: 'posts.json'
        }],
        contentFolder: 'posts',
        contentTypes: ['description', 'html'],
        folder: 'blog/posts',
        references: ['author'],
        type: 'post'
      },
      {
        attributes: [
          'name',
          'image',
          'coverImage',
          'coverMeta',
          'bio',
          'website',
          'twitter',
          'facebook',
          'location'
        ],
        contentFolder: 'authors',
        collections: [{
          src: 'blog/authors',
          output: 'authors.json'
        }],
        folder: 'blog/authors',
        type: 'author'
      }
    ],
    'esw-cache-fallback': {
      patterns: [
        '/github-repos'
      ]
    },
    'esw-prember': {
      version: '68'
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
    'ember-prism': {
      'components': ['markup-templating', 'scss', 'javascript', 'handlebars', 'http', 'json'],
      'plugins': ['normalize-whitespace', 'show-language']
    },
    'ember-service-worker': {
      enabled: process.env.EMBER_ENV === 'production',
      registrationStrategy: 'inline',
      versionStrategy: 'every-build'
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
    rssFeed: require('./config/rss-feed'),
    SRI: {
      enabled: false
    }
  });

  return app.toTree();
};

/**
 * Builds the prember urls for the blog and static pages
 * @returns {string[]} The urls for prember
 */
function buildPremberUrls() {
  // Build prember urls
  const staticURLs = [
    '/',
    '/ember-consulting/',
    '/open-source/',
    '/contact/',
    '/blog/'
  ];

  const paths = walkSync('blog/posts');
  const postPaths = paths.filter(path => extname(path) === '.md');
  const authorURLs = _getAuthorURLs();
  const categoryURLs = _getCategoryURLs(postPaths);
  const postURLs = postPaths.map((path) => {
    const stripMD = path.replace(/\.md/, '');
    return `/blog/${stripMD}/`;
  });

  return [...staticURLs, ...authorURLs, ...categoryURLs, ...postURLs];
}

function _getAuthorURLs() {
  return walkSync('blog/authors')
    .map(file => file.replace(/\.md$/, ''))
    .map(id => `/blog/author/${id}/`);
}

function _getCategoryURLs(postPaths) {
  const postsFrontmatter = postPaths.map((path) => {
    return yamlFront.loadFront(readFileSync(`blog/posts/${path}`));
  });

  let categories = postsFrontmatter
    .map(post => post.categories)
    .reduce((a, b) => a.concat(b), [])
    .filter(x => !!x)
    .map(category => category.replace(' ', '-'));

  // Get only unique categories
  categories = [...new Set(categories)];

  return categories.map(category => `/blog/categories/${category}/`);
}
