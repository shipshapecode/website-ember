import Route from '@ember/routing/route';
import { setProperties } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  async model({ author }) {
    const posts = await this.store.findAll('post', { reload: true });
    return posts.filter((post) => {
      return post.get('author.id') === author;
    });
  },

  async afterModel(model) {
    const authorId = this.paramsFor('blog.authors.author').author;
    const author = await this.store.findRecord('author', authorId);
    const authorName = author.name;
    return setProperties(this.headData, {
      title: `Posts by ${authorName} - Blog - Ship Shape`,
      description: `${authorName} has written ${model.length} posts for Ship Shape.`,
      type: 'website',
      url: `https://shipshape.io/blog/authors/${encodeURIComponent(authorId)}/`
    });
  },

  async setupController(controller) {
    this._super(...arguments);

    const authorId = this.paramsFor('blog.authors.author').author;
    const author = await this.store.findRecord('author', authorId);
    controller.set('author', author);
  }
});
