import Component from '@ember/component';
import { later } from '@ember/runloop';
import { computed, set } from '@ember/object';

export default Component.extend({
  transitionNext: false,
  transitionPrev: false,

  postsRemaining: computed('page', 'totalPosts', function() {
    const page = this.get('page');
    const totalPosts = this.get('totalPosts');

    return page * 10 < totalPosts;
  }),

  actions: {
    next() {
      set(this, 'transitionNext', true);

      later(() => {
        this.navigatePages(true);
        this._cleanClasses();
      }, 750);
    },

    previous() {
      set(this, 'transitionPrev', true);

      later(() => {
        this.navigatePages(false);
        this._cleanClasses();
      }, 750);
    }
  },

  _cleanClasses() {
    set(this, 'transitionNext', false);
    set(this, 'transitionPrev', false);
  }
});
