import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  didInsertElement(){
    // Elements to inject
    const mySVGsToInject = document.querySelectorAll('img.svg-icon');

    // Trigger the injection
    new SVGInjector(mySVGsToInject, {}, () => {
    });

  }
});
