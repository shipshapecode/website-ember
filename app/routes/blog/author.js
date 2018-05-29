// import { A } from '@ember/array';
import Route from '@ember/routing/route';
// import RSVP from 'rsvp';
// import { setProperties } from '@ember/object';
// import { inject as service } from '@ember/service';

export default Route.extend({
  // headData: service(),
  // markdownResolver: service(),
  //
  // model({ author }) {
  //   return this.markdownResolver.tree('blog').then((tree) => {
  //     return new RSVP.Promise((resolve) => {
  //       const authorsPosts = A(tree.files.filterBy('attributes.authorId', author));
  //       resolve(authorsPosts.sortBy('attributes.date').reverse());
  //     });
  //   });
  // },
  //
  // afterModel(model) {
  //   const author = model.get('firstObject.attributes.authorId');
  //   return setProperties(this.headData, {
  //     title: `${author} - Blog - Ship Shape`,
  //     description: 'Ramblings about Ember.js, JavaScript, life, liberty, and the pursuit of happiness.',
  //     type: 'website',
  //     url: `https://shipshape.io/blog/author/${encodeURIComponent(author)}/`
  //   });
  // }
});
