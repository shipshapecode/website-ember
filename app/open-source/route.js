import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  headData: service(),
  model() {
    return this.store.findAll('github-repo');
  },
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Ship Shape - Open Source',
      description: 'We have created several Ember addons and collaborated extensively with the Ember community.',
      type: 'website',
      url: 'https://shipshape.io/portfolio'
    });
  }
});
