import Controller from '@ember/controller';
import { alias } from '@ember-decorators/object/computed';
import { inject as service } from '@ember-decorators/service';

export default class Application extends Controller {
  @service fastboot;

  @alias('model.links')
  links;
}
