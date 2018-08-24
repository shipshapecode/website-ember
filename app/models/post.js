
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  // Markdown content
  content: attr('string'),
  // Markdown converted to html
  html: attr('string'),

  categories: attr(),
  date: attr('date'),
  image: attr('string'),
  imageMeta: attr(),
  slug: attr('string'),
  title: attr('string'),

  author: belongsTo('author')
});
