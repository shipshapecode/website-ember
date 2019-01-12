import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  classNameBindings: ['slug'],
  tagName: 'article',

  author: alias('post.author'),
  date: alias('post.attributes.date'),
  slug: alias('post.attributes.slug'),
  title: alias('post.attributes.title'),

  init() {
    this._super(...arguments);
    this.content = htmlSafe(this.post.attributes.html);
  },

  didRender() {
    this._super(...arguments);

    let nodeList = this.element.querySelectorAll('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      // console.log(nodeList);
      nodeList.forEach((code) => {
        code.parentNode.classList.add('line-numbers');
      });
    }

    Prism.highlightAll();
  }
});
