import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  tagName: 'page',
  classNames: ['hero'],
  classNameBindings: ['heroClasses']
});
