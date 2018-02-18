import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { setProperties } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),
  markdownResolver: service(),

  model() {
    return this.markdownResolver.tree('blog').then((tree) => {
      return new RSVP.Promise((resolve) => {
        const sortedPosts = tree.files.sortBy('attributes.date').reverse();
        resolve(sortedPosts);
      });
    });
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Blog - Ship Shape',
      description: 'Ramblings about Ember.js, JavaScript, life, liberty, and the pursuit of happiness.',
      type: 'website',
      url: 'https://shipshape.io/blog/'
    });
  }
});
