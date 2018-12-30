import Route from '@ember/routing/route';
import { capitalize } from '@ember/string';
import { setProperties } from '@ember/object';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default Route.extend({
  headData: service(),

  async model({ category }) {
    let posts = await fetch('/posts/posts.json');
    posts = await posts.json();
    posts = posts.data;

    return posts.filter((post) => {
      const dasherizedCategories = post.attributes.categories.map((category) => {
        return category.replace(/ /g, '-');
      });

      return dasherizedCategories.includes(category);
    });
  },

  async afterModel(model) {
    this._super(...arguments);

    const category = this.paramsFor('blog.categories.category').category;
    const capitalizedCategory = capitalize(category);
    return setProperties(this.headData, {
      title: `${capitalizedCategory} - Blog Category - Ship Shape`,
      description: `See our ${model.length} blog posts we've written about ${category}`,
      type: 'website',
      url: `https://shipshape.io/blog/categories/${category.replace(/ /g, '-')}/`
    });
  },

  setupController(controller) {
    this._super(...arguments);

    const category = this.paramsFor('blog.categories.category').category;
    const capitalizedCategory = capitalize(category);
    controller.set('category', capitalizedCategory);
  }
});
