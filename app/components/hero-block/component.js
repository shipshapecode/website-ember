/* global TimelineLite */

import Ember from 'ember';
import layout from './template';
import TweenLite from 'tweenlite';


export default Ember.Component.extend({
  layout,
  didInsertElement(){
    Ember.run.scheduleOnce('afterRender', this, function() {
      const paths = this.$('#Layer_7 path');

      paths.each(function(i, e) {
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
      });


      const tl = new TimelineLite();

      tl.add([
        TweenLite.from('#Layer_3', 1, {x: 200, delay: 1.7}),
        TweenLite.to(paths.eq(0), 2, {strokeDashoffset: 0, delay: 0.5}),
        TweenLite.to(paths.eq(1), 2, {strokeDashoffset: 0, delay: 0.5}),
        TweenLite.to(paths.eq(2), 2, {strokeDashoffset: 0, delay: 0.5}),
        TweenLite.to(paths.eq(3), 2, {strokeDashoffset: 0, delay: 0.5})
      ]);
    });
  }
});
