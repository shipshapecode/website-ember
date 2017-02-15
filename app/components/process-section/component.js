import Component from 'ember-component';
import InViewportMixin from 'ember-in-viewport';
import Vivus from 'vivus';

export default Component.extend(InViewportMixin, {
  didInsertElement() {
    new Vivus('design-svg', { duration: 100, type: 'oneByOne' }, null);
    new Vivus('build-svg', { duration: 100, type: 'oneByOne' }, null);
    new Vivus('ship-svg', { duration: 100, type: 'oneByOne' }, null);
  }
});
