import Controller from '@ember/controller';
import { alias, not } from '@ember/object/computed';

export default Controller.extend({
  projectTypes: [
    {
      fieldName: 'oss',
      name: 'project-type',
      text: 'OSS'
    },
    {
      fieldName: 'training',
      name: 'project-type',
      text: 'Ember Training'
    },
    {
      fieldName: 'dev',
      name: 'project-type',
      text: 'Ember Development'
    }
  ],

  contact: alias('model'),
  sendDisabled: not('model.validations.isValid')
});
