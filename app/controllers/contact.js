import Ember from 'ember';
import { not } from 'ember-computed-decorators';
const { Controller } = Ember;

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
  @not('model.validations.isValid') sendDisabled: null
});
