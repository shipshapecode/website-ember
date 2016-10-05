/* eslint-disable */
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var environment = process.env.EMBER_ENV;
var shim = require('flexi/lib/pod-templates-shim');

shim(EmberApp);

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-animatable': {
      include: ['bounceIn']
    },
    emberCliConcat: {
      enabled: true,
      outputDir: 'assets',
      outputFileName: 'app',
      useSelfClosingTags: false,
      wrapScriptsInFunction: false,
      js: {
        concat: true,
        contentFor: 'concat-js',
        footer: null,
        header: null,
        preserveOriginal: true
      },
      css: {
        concat: true,
        contentFor: 'concat-css',
        footer: null,
        header: null,
        preserveOriginal: true
      },
    },
    fingerprint: {
      extensions: ['js', 'css', 'map']
    },
    inlineContent: {
      contact: './app/styles/inline/contact.css',
      'ember-consulting': './app/styles/inline/ember-consulting.css',
      fonts: './app/styles/inline/fonts.css',
      home: './app/styles/inline/home.css',
      'loading-indicator': './app/templates/inline/loading-indicator.html',
      'open-source': './app/styles/inline/open-source.css'
    },
    SRI: {
      enabled: false
    },
  });


  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
