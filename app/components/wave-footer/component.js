import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  layoutService: service('device/layout'),

  year: new Date().getFullYear()
});
