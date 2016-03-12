/* global SVGInjector */

import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';
import Vivus from 'vivus';

export default Ember.Component.extend(InViewportMixin, {
  didInsertElement(){
    // Elements to inject
    const mySVGsToInject = document.querySelectorAll('img.svg-icon');

    // Trigger the injection
    new SVGInjector(mySVGsToInject, {}, () => {
      new Vivus('design-svg', {duration: 100, type: 'oneByOne'}, null);
      new Vivus('build-svg', {duration: 100, type: 'oneByOne'}, null);
      new Vivus('ship-svg', {duration: 100, type: 'oneByOne'}, null);
    });
  }
});
