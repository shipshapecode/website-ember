import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  description: validator('presence', true),
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  name: validator('presence', true),
  projectType: validator('presence', true)
});
