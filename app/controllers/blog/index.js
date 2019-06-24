import Controller from '@ember/controller';
import { set } from '@ember/object';
import { action } from "@ember/object";
import { sort } from "@ember/object/computed";

export default class Index extends Controller {
  queryParams = ['page'];
  page = 1;

  // eslint-disable-next-line
  dateSort = ['attributes.date:desc'];

  @sort('model', 'dateSort')
  blogPostsSortedByDate;

  /**
   * Move to next or previous pages
   * @param {boolean} next When true, go next, when false, go to previous
   */
  @action
  navigatePages(next = true) {
    if (next) {
      set(this, 'page', this.page + 1);
    } else {
      if (this.page > 0) {
        set(this, 'page', this.page - 1);
      }
    }
  }
}
