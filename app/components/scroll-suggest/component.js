import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  layoutService: service('device/layout'),

  isAtLeastDesktop: alias('layoutService.isAtLeastDesktop')
});
