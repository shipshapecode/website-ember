import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  headData: service(),
  model() {
    return {
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
    };
  },
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Ship Shape - Contact',
      description: 'Contact us for Ember.js consulting work!',
      type: 'website',
      url: 'https://shipshape.io/contact'
    });
  }
});
