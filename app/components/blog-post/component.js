import Component from '@ember/component';
import { className, tagName } from '@ember-decorators/component';
import { alias } from '@ember-decorators/object/computed';
import { htmlSafe } from '@ember/template';

@tagName('article')
export default class BlogPost extends Component {
  @alias('post.author')
  author;

  @alias('post.attributes.date')
  date;

  @alias('post.attributes.nextSlug')
  nextSlug;

  @alias('post.attributes.nextTitle')
  nextTitle;

  @alias('post.attributes.previousSlug')
  previousSlug;

  @alias('post.attributes.previousTitle')
  previousTitle;

  @alias('post.attributes.slug')
  @className
  slug;

  @alias('post.attributes.title')
  title;

  init() {
    super.init(...arguments);
    this.content = htmlSafe(this.post.attributes.html);
  }

  didRender() {
    super.didRender(...arguments);

    let nodeList = this.element.querySelectorAll('pre:not(.no-line-numbers) > code');

    if (nodeList) {
      // console.log(nodeList);
      nodeList.forEach((code) => {
        code.parentNode.classList.add('line-numbers');
      });
    }

    Prism.highlightAll();
  }
}
