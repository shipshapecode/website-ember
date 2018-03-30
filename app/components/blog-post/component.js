import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: ['slug'],
  tagName: 'article',

  author: alias('post.attributes.author'),
  authorId: alias('post.attributes.authorId'),
  content: alias('post.content'),
  date: alias('post.attributes.date'),
  slug: alias('post.attributes.slug'),
  title: alias('post.attributes.title')
});
