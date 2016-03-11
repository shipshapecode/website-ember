/* global TimelineLite */

import Ember from 'ember';
import layout from './template';
import TweenLite from 'tweenlite';


export default Ember.Component.extend({
  layout,
  didInsertElement(){
    Ember.run.scheduleOnce('afterRender', this, function(){
      const paths = this.$('#Layer_7 path');

      paths.each(function(i, e) {
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
      });

      const tl = new TimelineLite();

      tl.add([
        TweenLite.to(paths.eq(0), 1, {strokeDashoffset: 0, delay: 0.5}),
        TweenLite.to(paths.eq(1), 1, {strokeDashoffset: 0, delay: 0.5}),
        TweenLite.to(paths.eq(2), 1, {strokeDashoffset: 0, delay: 0.5}),
        TweenLite.to(paths.eq(3), 1, {strokeDashoffset: 0, delay: 0.5})
      ]);
    });
  }
});
