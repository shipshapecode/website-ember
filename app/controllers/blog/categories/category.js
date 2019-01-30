import Controller from '@ember/controller';
import { sort } from "@ember-decorators/object/computed";

export default class Category extends Controller {
  // eslint-disable-next-line
  dateSort = ['date:desc'];

  @sort('model', 'dateSort')
  blogPostsSortedByDate;
}
