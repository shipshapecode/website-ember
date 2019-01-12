import Route from '@ember/routing/route';
import fetch from "fetch";

export default Route.extend({
  async model({ path }) {
    let authors = await fetch('/authors/authors.json');
    authors = await authors.json();
    authors = authors.data;

    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);
    let post = await fetch(`/posts/${withoutSlash}.json`);
    post = await post.json();
    post = post.data;
    post.author = await authors.find((author) => {
      return author.id === post.attributes.authorId;
    });

    return post;
  },


  afterModel(model) {
    const { categories, date, description, slug, title } = model.attributes;

    model.metaTags = {
      author: model.author.attributes.name,
      categories,
      date,
      description,
      slug,
      title
    };
  }
});
