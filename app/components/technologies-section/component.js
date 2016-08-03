import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';
import AnimatableMixin from 'ember-animatable';
const { Component } = Ember;

export default Component.extend(AnimatableMixin, InViewportMixin, {
  didEnterViewport() {
    this.animate('bounceIn');
  }
});
