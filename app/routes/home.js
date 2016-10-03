import Ember from 'ember';
const { inject: { service }, Route } = Ember;

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
      description: 'Ship Shape is a Washington D.C. based Ember consulting agency. We leverage Ember.js, '
      + 'and all the latest Ember addons and technologies, to create truly ambitious applications.',
      type: 'website',
      url: 'https://shipshape.io/'
    });
  }
});
