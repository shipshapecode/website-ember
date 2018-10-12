import Route from '@ember/routing/route';

export default Route.extend({
  model({ path }) {
    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);

    return this.store.findRecord('post', withoutSlash);
  },

  afterModel(model) {
    const { author, categories, date, description, slug, title } = model;

    model.metaTags = {
      author,
      categories,
      date,
      description,
      slug,
      title
    };
  }
});
