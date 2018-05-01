import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  markdownResolver: service(),

  model() {
    return this.markdownResolver.tree('blog').then((tree) => {
      return new RSVP.Promise((resolve) => {
        const sortedPosts = tree.files.sortBy('attributes.date').reverse();
        resolve(sortedPosts);
      });
    });
  }
});
