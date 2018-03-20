import { CompatComponent as Component } from 'ember-glimmer-component';
import { map, sort } from '@ember/object/computed';

export default Component.extend({
  tagName: '',

  projects: sort('unsortedProjects', 'projectSorting'),

  unsortedProjects: map('model.data', function(repo) {
    const { description, name, stars } = repo.attributes;

    return {
      description,
      name,
      stars
    };
  }),

  init() {
    this._super(...arguments);
    this.projectSorting = ['stars:desc'];
  }
});
