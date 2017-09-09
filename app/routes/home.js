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
      description: 'Ship Shape is an Ember consulting agency. We leverage Ember.js, and all the '
      + 'latest Ember addons and technologies, to create truly ambitious applications.',
      type: 'website',
      url: 'https://shipshape.io/'
    });
  }
});
