import Route from '@ember/routing/route';
import fetch from 'fetch';

export default Route.extend({
  model() {
    return fetch('https://shipshape-api.herokuapp.com/github-repos').then((response) => {
      return response.json();
    });
  },

  afterModel(model) {
    model.attributes = {
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
