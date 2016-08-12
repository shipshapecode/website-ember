import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  headData: service(),
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Ship Shape - Ember Consulting',
      description: 'We have worked on several ambitious, full scale apps for various companies. '
      + 'Contact us for Ember.js consulting work!',
      type: 'website',
      url: 'https://shipshape.io/ember-consulting'
    });
  }
});
