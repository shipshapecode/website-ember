import Route from '@ember/routing/route';
import { setProperties } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),
  markdownResolver: service(),

  model({ path }) {
    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);
    return this.markdownResolver.file('blog', withoutSlash);
  },

  afterModel(model) {
    const description = `${model.content.substring(0, 260)}...`;
    const { author, date, slug, tags, title } = model.attributes;

    return setProperties(this.headData, {
      title: `${title} - Blog - Ship Shape`,
      articleTitle: title,
      author,
      description,
      date,
      keywords: tags,
      tags: tags.split(', '),
      type: 'article',
      url: `https://shipshape.io/blog/${slug}/`
    });
  }
});
