import Component from 'ember-component';
import InViewportMixin from 'ember-in-viewport';
import Vivus from 'vivus';

export default Component.extend(InViewportMixin, {
  didInsertElement() {
    new Vivus('design-svg', { duration: 100, type: 'delayed' }, function(obj) {
      obj.el.classList.add('finished');
    });
    new Vivus('build-svg', { duration: 100, type: 'delayed' }, function(obj) {
      obj.el.classList.add('finished');
    });
    new Vivus('ship-svg', { duration: 100, type: 'delayed' }, function(obj) {
      obj.el.classList.add('finished');
    });
  }
});
