import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  markdownResolver: service(),

  model({ path }) {
    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);
    return this.markdownResolver.file('blog', withoutSlash);
  },

  afterModel(model) {
    const title = model.attributes.title;
    model.attributes.title = `${title} - Blog - Ship Shape`;
    model.attributes.articleTitle = title;
    model.attributes.type = 'article';
  }
});
