import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  paginatedPosts: computed('page', 'posts.[]', function() {
    const page = this.get('page');
    const posts = this.get('posts');

    const start = (page - 1) * 10;
    const end = start + 10;

    if (posts && posts.sortBy) {
      const blogPostsSortedByDate = posts.sortBy('attributes.date').reverse();

      return blogPostsSortedByDate.slice(start, end);
    }
  })
});
