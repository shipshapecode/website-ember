'use strict';

module.exports = {
  javascript: {
    pattern: 'assets/app-*.js',
    limit: '500KB',
    compression: 'gzip'
  },
  css: {
    pattern: 'assets/*.css',
    limit: '50KB',
    compression: 'gzip'
  },
  svgs: {
    pattern: 'assets/svgs/**.svg',
    limit: '500KB',
    compression: 'gzip'
  }
};
