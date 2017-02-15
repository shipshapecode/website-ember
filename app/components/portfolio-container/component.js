import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  tagName: 'page',
  classNameBindings: [':portfolio-container'],
  projects: computed.sort('model', 'projectSorting'),
  init() {
    this._super(...arguments);
    this.projectSorting = ['stars:desc'];
  }
});
