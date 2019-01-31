import EmberObject from '@ember/object';
import ContactValidations from '../validations/contact';
import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember-decorators/service';

export default class Contact extends Route {
  @service flashMessages;
  @service headData;

  model() {
    return class Contact extends EmberObject.extend(ContactValidations) {
    }.create(
      getOwner(this).ownerInjection(),
      {
        company: null,
        description: null,
        email: null,
        name: null,
        projectType: 'oss'
      }
    );
  }

  afterModel(model) {
    model.metaTags = {
      title: 'Contact Us - Ship Shape',
      description:
        'Let\'s create some amazing things together. We do Ember app development, Ember training, sponsored ' +
        'open source work, and anything and everything Ember. To get started on your Ember training or Ember consulting project, ' +
        'shoot us an email or fill out the contact form.',
      type: 'website',
      url: 'https://shipshape.io/contact/'
    };
  }
}
