import Component from '@ember/component';
import { later } from '@ember/runloop';
import { set } from '@ember/object';
import { action, computed } from '@ember/object';

export default class Pagination extends Component {
  transitionNext = false;
  transitionPrev = false;

  @computed('page', 'totalPosts')
  get postsRemaining() {
    const page = this.get('page');
    const totalPosts = this.get('totalPosts');

    return page * 10 < totalPosts;
  }

  @action
  next() {
    set(this, 'transitionNext', true);

    later(() => {
      this.navigatePages(true);
      this._cleanClasses();
    }, 750);
  }

  @action
  previous() {
    set(this, 'transitionPrev', true);

    later(() => {
      this.navigatePages(false);
      this._cleanClasses();
    }, 750);
  }

  _cleanClasses() {
    set(this, 'transitionNext', false);
    set(this, 'transitionPrev', false);
  }
}
