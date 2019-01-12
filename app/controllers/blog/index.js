import Controller from '@ember/controller';
import { set } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  queryParams: ['page'],
  page: 1,

  // eslint-disable-next-line
  dateSort: ['attributes.date:desc'],
  blogPostsSortedByDate: sort('model', 'dateSort'),

  actions: {
    /**
     * Move to next or previous pages
     * @param {boolean} next When true, go next, when false, go to previous
     */
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
});
