/* global SVGInjector, TimelineLite */

import Ember from 'ember';
import TweenLite from 'tweenlite';
const { Component } = Ember;

export default Component.extend({
  classNameBindings: [':hero'],
  didInsertElement() {
    // Elements to inject
    let mySVGsToInject = document.querySelectorAll('img.svg-logo');

    // Trigger the injection
    new SVGInjector(mySVGsToInject, {}, () => {
      let paths = this.$('#Strokes path');

      paths.each(function(i, e) {
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
      });

      let tl = new TimelineLite();

      tl.add([
        TweenLite.to(paths.eq(0), 2, { strokeDashoffset: 0, delay: 1.5 }),
        TweenLite.to(paths.eq(1), 2, { strokeDashoffset: 0, delay: 1.5 }),
        TweenLite.to(paths.eq(2), 1, { strokeDashoffset: 0, delay: 0.5 }),
        TweenLite.from('#Boat', 1, { x: 200, delay: 1.5 }),
        TweenLite.from('#Dot', 1, { y: -1000, delay: 1.0 })
      ]);
    });

  }
});
