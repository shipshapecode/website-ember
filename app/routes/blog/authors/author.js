import Route from '@ember/routing/route';
import { setProperties } from '@ember/object';
import { inject as service } from "@ember/service";
import fetch from 'fetch';

export default class Author extends Route {
  @service headData;

  async model({ authorId }) {
    const posts = await this.modelFor('blog');

    return posts.filter((post) => {
      return post.authorId === authorId;
    });
  }

  async afterModel(model) {
    super.afterModel(...arguments);

    const authorId = this.paramsFor('blog.authors.author').author;
    let author = await fetch(`/authors/${authorId}.json`);
    author = await author.json();
    author = author.data;
    model.author = author;

    const authorName = author.attributes.name;
    return setProperties(this.headData, {
      title: `Posts by ${authorName} - Blog - Ship Shape`,
      description: `${authorName} has written ${model.length} posts for Ship Shape.`,
      type: 'website',
      url: `https://shipshape.io/blog/authors/${encodeURIComponent(authorId)}/`
    });
  }

  async setupController(controller, model) {
    super.setupController(...arguments);

    controller.set('author', model.author);
  }
}
