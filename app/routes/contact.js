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
      title: 'Contact - Ship Shape - Ember Consulting',
      description: 'To get started on your Ember training or Ember consulting project, '
      + 'shoot us an email or fill out the contact form.',
      type: 'website',
      url: 'https://shipshape.io/contact'
    });
  }
});
