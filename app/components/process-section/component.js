import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement(){
    // Elements to inject
    const mySVGsToInject = document.querySelectorAll('img.svg-icon');

    // Trigger the injection
    new SVGInjector(mySVGsToInject, {}, () => {
    });

  }
});
