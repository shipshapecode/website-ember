import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'page',
  classNameBindings: [':portfolio-container'],
  projectSorting: ['stars:desc'],
  projects: computed.sort('model', 'projectSorting')
});
