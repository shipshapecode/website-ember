import { get, setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  model() {
    return {
      strings: ['Meticulously crafted ambitious web applications']
    };
  },

  afterModel() {
    return setProperties(get(this, 'headData'), {
      title: 'Ship Shape - Ember.js Code That Won\'t Sink',
      description:
      'Ship Shape is a Washington D.C. based software consultancy specializing in all things Ember. ' +
      'We leverage Ember.js, and all the latest Ember addons and technologies, to create truly ambitious, ' +
      'state of the art applications that are future-proof and easily maintainable.',
      type: 'website',
      url: 'https://shipshape.io/'
    });
  }
});
