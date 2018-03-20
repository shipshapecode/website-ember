import { CompatComponent as Component } from 'ember-glimmer-component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  tagName: '',

  author: alias('post.attributes.author'),
  authorId: alias('post.attributes.authorId'),
  content: alias('post.content'),
  date: alias('post.attributes.date'),
  slug: alias('post.attributes.slug'),
  title: alias('post.attributes.title')
});
