import Ember from 'ember';
import layout from './template';
import Vivus from 'vivus';

export default Ember.Component.extend({
  layout,
  didInsertElement(){
    new Vivus('svg-logo', {
      duration: 100,
      file: 'img/ShipShapeHeader.svg',
      start: 'autostart',
      type: 'oneByOne'
    });
  }
});
