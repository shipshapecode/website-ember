import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'page',
  classNameBindings: [':portfolio-container'],
  projects: computed.sort('model', 'projectSorting'),
  init() {
    this._super(...arguments);
    this.projectSorting = ['stars:desc'];
  }
});
