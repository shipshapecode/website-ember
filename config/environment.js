'use strict';

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'website',
    environment,
    rootURL: '/',
    locationType: 'router-scroll',
    historySupportMiddleware: true,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fastboot: {
      hostWhitelist: [/^localhost:\d+$/]
    }
  };

  ENV['ember-meta'] = {
    description: 'Ramblings about Ember.js, JavaScript, life, liberty, and the pursuit of happiness.',
    imgSrc: 'http://i.imgur.com/30OI4fv.png',
    siteName: 'Ship Shape',
    title: 'Blog - Ship Shape',
    twitterUsername: '@shipshapecode',
    url: 'https://shipshape.io/blog/'
  };

  ENV['ember-x-tabs'] = {
    includedThemes: ['line'],
    excludeBaseStyles: false,
    defaultTheme: 'line'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    // ENV.host = 'http://localhost:3000';
    // ENV.host = 'https://shipshape-api.herokuapp.com';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.host = 'https://shipshape-api.herokuapp.com';
  }

  return ENV;
};
