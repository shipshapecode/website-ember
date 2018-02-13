import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  description: attr('string'),
  name: attr('string'),
  stars: attr('number')
});
