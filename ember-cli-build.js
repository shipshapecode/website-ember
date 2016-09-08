/* eslint-disable */
/* global require, module */

// PostCSS Plugins
var autoprefixer = require('autoprefixer');
var postCssSimpleVars = require('postcss-simple-vars');
var postCssNested = require('postcss-nested');

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

// Flexi shim
var shim = require('flexi/lib/pod-templates-shim');
shim(EmberApp);

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    cssModules: {
      plugins: [
        autoprefixer('last 2 versions'),
        postCssNested(),
        postCssSimpleVars()
      ]
    },
    'ember-animatable': {
      include: ['bounceIn']
    },
    fingerprint: {
      extensions: ['js', 'css', 'map']
    },
    inlineContent: {
      contact: './app/styles/inline/contact.css',
      'ember-consulting': './app/styles/inline/ember-consulting.css',
      fonts: './app/styles/inline/fonts.css',
      home: './app/styles/inline/home.css',
      'open-source': './app/styles/inline/open-source.css'
    }
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
