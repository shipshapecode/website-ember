import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [
      {
        description: 'Guide your users through a tour of your app',
        name: 'shepherd',
        stars: 5934
      },
      {
        description: 'An Ember addon for the site tour library Shepherd',
        name: 'ember-shepherd',
        stars: 133
      },
      {
        description: 'Ember HTMLBars helpers for basic arithmetic',
        name: 'ember-math-helpers',
        stars: 81
      },
      {
        description: 'An Ember addon that wraps the Flatpickr date picker',
        name: 'ember-flatpickr',
        stars: 78
      }
    ];
  },

  afterModel(model) {
    model.metaTags = {
      title: 'Ember Addons and Open Source - Ship Shape',
      description:
        'We collaborate extensively with the Ember community on all facets of Ember. ' +
        'From documentation, to Ember CLI, and Ember itself. ' +
        'We have written several Ember addons of our own, and we are maintainers for the html-next ' +
        'addons, including flexi and vertical-collection.',
      type: 'website',
      url: 'https://shipshape.io/open-source/'
    };
  }
});
