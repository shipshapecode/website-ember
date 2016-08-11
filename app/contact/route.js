import Ember from 'ember';
import ResetScrollMixin from 'ember-scroll-operator/mixins/reset-scroll';
const { inject: { service }, Route } = Ember;

export default Route.extend(ResetScrollMixin, {
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
      url: 'http://shipshape.io/contact'
    });
  }
});
