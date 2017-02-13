import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  headData: service(),
  model() {
    return this.store.findAll('github-repo');
  },
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Ember Addons - Ship Shape - Open Source',
      description: 'We have created several Ember addons and collaborated extensively with the Ember community.'
      + 'If you need help with an Ember addon, or other open source Ember related effort, contact us!',
      type: 'website',
      url: 'https://shipshape.io/portfolio'
    });
  }
});
