import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: ['slug'],
  tagName: 'article',

  author: alias('post.attributes.author'),
  content: alias('post.content'),
  date: alias('post.attributes.date'),
  slug: alias('post.attributes.slug'),
  title: alias('post.attributes.title'),

  didRender(){
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
