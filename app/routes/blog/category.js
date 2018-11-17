import Route from '@ember/routing/route';
import { setProperties } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  async model({ category }) {
    const posts = await this.store.findAll('post', { reload: true });
    return posts.filter((post) => {
      return post.get('categories').includes(category);
    });
  },

  async afterModel(model) {
    const author = await model.get('firstObject.author');
    const authorId = author.id;
    const authorName = author.name;
    return setProperties(this.headData, {
      title: `Posts by ${authorName} - Blog - Ship Shape`,
      description: `${authorName} has written ${model.length} posts for Ship Shape.`,
      type: 'website',
      url: `https://shipshape.io/blog/author/${encodeURIComponent(authorId)}/`
    });
  }
});
