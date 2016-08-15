/* eslint-disable */
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
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
      }
    },
    'ember-font-awesome': {
      useScss: true
    },
    fingerprint: {
      extensions: ['js', 'css', 'map']
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

  if (!process.env.EMBER_CLI_FASTBOOT) {
    app.import(app.bowerDirectory + '/gsap/src/uncompressed/TimelineLite.js');
    app.import(app.bowerDirectory + '/svg-injector/svg-injector.js');
  }

  return app.toTree();
};

/* eslint-enable */
