import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  author: alias('post.attributes.author'),
  content: alias('post.content'),
  date: alias('post.attributes.date'),
  title: alias('post.attributes.title')
});
