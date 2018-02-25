import { get, setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default Route.extend({
  headData: service(),

  model() {
    return fetch('https://shipshape-api.herokuapp.com/github-repos').then((response) => {
      return response.json();
    });
  },

  afterModel() {
    return setProperties(get(this, 'headData'), {
      title: 'Ember Addons and Open Source - Ship Shape',
      description:
      'We collaborate extensively with the Ember community on all facets of Ember. ' +
      'From documentation, to Ember CLI, and Ember itself. ' +
      'We have written several Ember addons of our own, and we are maintainers for the html-next ' +
      'addons, including flexi and vertical-collection.',
      type: 'website',
      url: 'https://shipshape.io/open-source/'
    });
  }
});
