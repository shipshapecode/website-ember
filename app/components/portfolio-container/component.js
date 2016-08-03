import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'div',
  classNameBindings: [':portfolio-container'],
  projectSorting: ['stars:desc'],
  projects: computed.sort('model', 'projectSorting')
});
