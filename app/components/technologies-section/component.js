import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';
import AnimatableMixin from 'ember-animatable';

export default Ember.Component.extend(AnimatableMixin, InViewportMixin, {
  didEnterViewport() {
    this.animate('bounceIn');
  }
});
