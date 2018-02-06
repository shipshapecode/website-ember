import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  model() {
    return get(this, 'markdownResolver').tree('blog').then((tree) => {
      return new RSVP.Promise((resolve) => {
        const sortedPosts = tree.files.sortBy('attributes.date').reverse();
        resolve(sortedPosts);
      });
    });
  }
});
