import Route from '@ember/routing/route';
import { capitalize } from '@ember/string';
import { setProperties } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Category extends Route {
  @service headData;

  async model({ category }) {
    let posts = await this.modelFor('blog');

    return posts.filter((post) => {
      const dasherizedCategories = post.attributes.categories.map((category) => {
        return category.replace(/ /g, '-');
      });

      return dasherizedCategories.includes(category);
    });
  }

  async afterModel(model) {
    super.afterModel(...arguments);

    const numPosts = model ? model.length : 0;
    const category = this.paramsFor('blog.categories.category').category;
    const capitalizedCategory = capitalize(category);
    return setProperties(this.headData, {
      title: `${capitalizedCategory} - Blog Category - Ship Shape`,
      description: `See our ${numPosts} blog posts we've written about ${category}`,
      type: 'website',
      url: `https://shipshape.io/blog/categories/${category.replace(/ /g, '-')}/`
    });
  }

  setupController(controller) {
    super.setupController(...arguments);

    const category = this.paramsFor('blog.categories.category').category;
    const capitalizedCategory = capitalize(category);
    controller.set('category', capitalizedCategory);
  }
}
