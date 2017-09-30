import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  company: attr('string'),
  description: attr('string'),
  email: attr('string'),
  name: attr('string'),
  projectType: attr('string', { defaultValue: 'oss' })
});
