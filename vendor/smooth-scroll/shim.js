/* globals SmoothScroll */

define('smooth-scroll', [], function() {
  'use strict';

  if (typeof FastBoot === 'undefined') {
    return {
      default: SmoothScroll
    };
  }

  return { default: undefined };
});
