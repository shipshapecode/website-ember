import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  headData: service(),
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Ship Shape - Contact',
      description: 'Contact us for Ember.js consulting work!',
      type: 'website',
      url: 'http://shipshape.io/contact'
    });
  }
});
