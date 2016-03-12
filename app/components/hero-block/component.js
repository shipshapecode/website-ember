/* global SVGInjector, TimelineLite */

import Ember from 'ember';
import TweenLite from 'tweenlite';

export default Ember.Component.extend({
  didInsertElement(){
    // Elements to inject
    const mySVGsToInject = document.querySelectorAll('img.svg-logo');

    // Trigger the injection
    new SVGInjector(mySVGsToInject, {}, () => {
      const paths = this.$('#Strokes path');

      paths.each(function(i, e) {
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
      });


      const tl = new TimelineLite();

      tl.add([
        TweenLite.to(paths.eq(0), 2, {strokeDashoffset: 0, delay: 1.5}),
        TweenLite.to(paths.eq(1), 2, {strokeDashoffset: 0, delay: 1.5}),
        TweenLite.to(paths.eq(2), 1, {strokeDashoffset: 0, delay: 0.5}),
        TweenLite.from('#Boat', 1, {x: 200, delay: 1.5}),
        TweenLite.from('#Dot', 1, {y: -1000, delay: 1.0})
      ]);
    });

  }
});
