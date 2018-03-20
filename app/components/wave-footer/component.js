import { CompatComponent as Component } from 'ember-glimmer-component';

export default Component.extend({
  year: new Date().getFullYear()
});
