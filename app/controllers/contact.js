import Controller from 'ember-controller';
import { not } from 'ember-computed';

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
  sendDisabled: not('model.validations.isValid')
});
