/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const shim = require('@html-next/flexi-layouts/lib/pod-templates-shim');

shim(EmberApp);

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'map']
    },
    inlineContent: {
      app: 'inline/styles/app.css',
      contact: 'inline/styles/contact.css',
      'ember-consulting': 'inline/styles/ember-consulting.css',
      fonts: 'inline/styles/fonts.css',
      home: 'inline/styles/home.css',
      loadCSS: 'inline/loadCSS.js',
      'loading-indicator': {
        file: 'inline/loading-indicator.html',
        enabled: false
      },
      'open-source': 'inline/styles/open-source.css'
    },
    SRI: {
      enabled: false
    },
    vendorFiles: { 'jquery.js': null }
  });

  app.import('node_modules/ga-lite/dist/ga-lite.js', {
    using: [{ transformation: 'amd', as: 'ga-lite' }]
  });

  return app.toTree();
};
