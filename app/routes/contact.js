import EmberObject, { get, setProperties } from '@ember/object';
import ContactValidations from '../validations/contact';
import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default Route.extend({
  flashMessages: service(),
  headData: service(),

  model() {
    return EmberObject.extend(ContactValidations).create(
      getOwner(this).ownerInjection(),
      {
        company: null,
        description: null,
        email: null,
        name: null,
        projectType: 'oss'
      }
    );
  },

  afterModel() {
    return setProperties(this.headData, {
      title: 'Contact Us - Ship Shape',
      description:
      'Let\'s create some amazing things together. We do Ember app development, Ember training, sponsored ' +
      'open source work, and anything and everything Ember. To get started on your Ember training or Ember consulting project, ' +
      'shoot us an email or fill out the contact form.',
      type: 'website',
      url: 'https://shipshape.io/contact/'
    });
  },

  actions: {
    sendContactRequest(contact) {
      if (get(contact, 'validations.isValid')) {
        const data = contact.getProperties('name', 'company', 'email', 'projectType', 'description');
        data['form-name'] = 'ss-contact-form';
        const body = this._encode(data);

        return fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        })
          .then(this._successMessage.bind(this))
          .catch(this._errorMessage.bind(this));
      } else {
        get(contact, 'validations.errors').forEach((error) => {
          this.flashMessages.danger(error.message);
        });
      }
    }
  },

  _successMessage() {
    this.flashMessages.success('Thanks for contacting us! We\'ll be in touch shortly.');
  },

  _errorMessage() {
    this.flashMessages.danger('Something went wrong :(. Please refresh and try again.');
  },

  /**
   * Util function to encode data for netify forms
   * @param data
   * @returns {string}
   * @private
   */
  _encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }
});
