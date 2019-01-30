/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Controller from '@ember/controller';

export default class Contact extends Controller {
  projectTypes = [
    {
      fieldName: 'oss',
      name: 'projectType',
      text: 'OSS'
    },
    {
      fieldName: 'training',
      name: 'projectType',
      text: 'Ember Training'
    },
    {
      fieldName: 'dev',
      name: 'projectType',
      text: 'Ember Development'
    }
  ];
}
