import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  coverImage: attr('string'),
  coverMeta: attr(),
  facebook: attr('string'),
  image: attr('string'),
  location: attr('string'),
  name: attr('string'),
  twitter: attr('string'),
  website: attr('string'),

  posts: hasMany('content')
});
