import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  headData: service(),
  model() {
    // return this.store.findAll('github-repo');

    // Use static data for now, since EmberFire gives Fastboot Errors
    return [
      {
        'name': 'Ember 3D Nav',
        'repo': 'ember-3d-nav',
        'stars': 10
      },
      {
        'name': 'Ember Drop',
        'repo': 'ember-drop',
        'stars': 4
      },
      {
        'name': 'Ember Flatpickr',
        'repo': 'ember-flatpickr',
        'stars': 16
      },
      {
        'name': 'Ember Math Helpers',
        'repo': 'ember-math-helpers',
        'stars': 17
      },
      {
        'name': 'Ember Newton Cradle Loader',
        'repo': 'ember-newton-cradle-loader',
        'stars': 0
      },
      {
        'name': 'Ember Shepherd',
        'repo': 'ember-shepherd',
        'stars': 66
      },
      {
        'name': 'Ember Typewriter',
        'repo': 'ember-typewriter',
        'stars': 0
      },
      {
        'name': 'Ember Vivus',
        'repo': 'ember-vivus',
        'stars': 0
      },
      {
        'name': 'Ember X-Editable',
        'repo': 'ember-x-editable',
        'stars': 13
      }
    ];
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
