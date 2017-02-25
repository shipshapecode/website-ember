import Route from 'ember-route';
import service from 'ember-service/inject';
import repos from '../data/repos';

export default Route.extend({
  headData: service(),
  model() {
    return repos;
  },
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Ember Addons - Ship Shape - Open Source',
      description: 'We have created several Ember addons and collaborated extensively with the Ember community.'
      + 'If you need help with an Ember addon, or other open source Ember related effort, contact us!',
      type: 'website',
      url: 'https://shipshape.io/open-source'
    });
  }
});
