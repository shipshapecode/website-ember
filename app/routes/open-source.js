import { get, setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  model() {
    return this.store.findAll('github-repo');
  },

  afterModel() {
    return setProperties(get(this, 'headData'), {
      title: 'Ember Addons - Ship Shape - Open Source',
      description: 'We have created several Ember addons and collaborated extensively with the Ember community.'
      + 'If you need help with an Ember addon, or other open source Ember related effort, contact us!',
      type: 'website',
      url: 'https://shipshape.io/open-source'
    });
  }
});
