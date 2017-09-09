/* eslint-env node */
'use strict';

const fastbootTransform = require('fastboot-transform');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const shim = require('@html-next/flexi-layouts/lib/pod-templates-shim');

shim(EmberApp);

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'map']
    },
    inlineContent: {
      app: './app/styles/inline/app.css',
      contact: './app/styles/inline/contact.css',
      'ember-consulting': './app/styles/inline/ember-consulting.css',
      fonts: './app/styles/inline/fonts.css',
      home: './app/styles/inline/home.css',
      loadCSS: './app/inline/loadCSS.js',
      'loading-indicator': './app/templates/inline/loading-indicator.html',
      'open-source': './app/styles/inline/open-source.css'
    },
    nodeAssets: {
      'smooth-scroll': {
        vendor: {
          srcDir: 'dist/js',
          destDir: 'smooth-scroll',
          include: ['smooth-scroll.js'],
          processTree(input) {
            return fastbootTransform(input);
          }
        }
      }
    },
    SRI: {
      enabled: false
    },
    vendorFiles: { 'jquery.js': null }
  });

  app.import('vendor/smooth-scroll/smooth-scroll.js');

  app.import('vendor/smooth-scroll/shim.js', {
    type: 'vendor',
    exports: {
      'smooth-scroll': ['default']
    }
  });

  return app.toTree();
};
