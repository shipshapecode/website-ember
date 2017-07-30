import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
export default Controller.extend({
  fastboot: service(),

  links: alias('model.links')
});
