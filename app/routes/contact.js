import Ember from 'ember';
const {Route} = Ember;

export default Route.extend({
  afterModel() {
    this.get('meta').update({
      title: 'Contact',
      description: 'Contact us for Ember.js consulting work!'
    });
  }
});
