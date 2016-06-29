import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr('string'),
  repo: attr('string'),
  stars: attr('number')
});
