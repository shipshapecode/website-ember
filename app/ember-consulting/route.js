import Ember from 'ember';
import ResetScrollMixin from 'ember-scroll-operator/mixins/reset-scroll';
const { inject: { service }, Route } = Ember;

export default Route.extend(ResetScrollMixin, {
  headData: service(),
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Ship Shape - Ember Consulting',
      description: 'We have worked on several ambitious, full scale apps for various companies. '
      + 'Contact us for Ember.js consulting work!',
      type: 'website',
      url: 'http://shipshape.io/ember-consulting'
    });
  }
});
