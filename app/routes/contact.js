import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  headData: service(),
  model() {
    return this.store.createRecord('contact');
  },
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Contact - Ship Shape',
      description: 'To get started on your Ember training or Ember consulting project, '
      + 'shoot us an email or fill out the contact form.',
      type: 'website',
      url: 'https://shipshape.io/contact'
    });
  },
  actions: {
    sendContactRequest(model) {
      if (model.get('validations.isValid')) {
        return model.save();
      }
    }
  }
});
