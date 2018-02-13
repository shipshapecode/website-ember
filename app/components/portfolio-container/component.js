import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'page',
  classNames: ['portfolio-container'],
  projects: computed.sort('model', 'projectSorting'),
  init() {
    this._super(...arguments);
    this.projectSorting = ['stars:desc'];
  }
});
