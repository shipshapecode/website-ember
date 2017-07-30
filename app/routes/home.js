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
    return this.get('headData').setProperties({
      title: 'Ship Shape - Ember Consulting',
      description: 'Ship Shape is an Ember consulting agency. We leverage Ember.js, and all the '
      + 'latest Ember addons and technologies, to create truly ambitious applications.',
      type: 'website',
      url: 'https://shipshape.io/'
    });
  }
});
