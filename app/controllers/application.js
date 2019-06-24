import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class Application extends Controller {
  @service fastboot;

  @alias('model.links')
  links;
}
