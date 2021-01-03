import Component from '@ember/component';
import { computed } from '@ember/object';

export default class BlogPostMenu extends Component {
  @computed('page', 'posts.[]')
  get paginatedPosts() {
    const page = this.page;
    const posts = this.posts;

    if (posts) {
      const start = (page - 1) * 10;
      const end = start + 10;


      return posts.slice(start, end);
    }

    return [];
  }
}
