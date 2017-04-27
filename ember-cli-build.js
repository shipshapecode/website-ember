/* eslint-disable */
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var environment = process.env.EMBER_ENV;
var shim = require('@html-next/flexi-layouts/lib/pod-templates-shim');

shim(EmberApp);

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
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
    SRI: {
      enabled: false
    },
  });

  if (!process.env.EMBER_CLI_FASTBOOT) {
    app.import('vendor/modernizr.min.js');
  }

  return app.toTree();
};
