import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  description: validator('presence', true),
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  name: validator('presence', true)
});

export default Model.extend(Validations, {
  company: attr('string'),
  description: attr('string'),
  email: attr('string'),
  name: attr('string'),
  projectType: attr('string', { defaultValue: 'oss' })
});
