import {
  validatePresence,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  description: validatePresence(true),
  email: [
    validatePresence(true),
    validateFormat({ type: 'email' })
  ],
  name: validatePresence(true)
};
