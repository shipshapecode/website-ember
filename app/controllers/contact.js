/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Controller from '@ember/controller';

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
  ]
});
