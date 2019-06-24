/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { get } from '@ember/object';
import fetch from 'fetch';

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

  @action
  sendContactRequest(contact) {
    if (get(contact, 'validations.isValid')) {
      const data = contact.getProperties('name', 'company', 'email', 'projectType', 'description');
      data['form-name'] = 'contact-us';
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

  _successMessage() {
    this.flashMessages.success('Thanks for contacting us! We\'ll be in touch shortly.');
  }

  _errorMessage() {
    this.flashMessages.danger('Something went wrong :(. Please refresh and try again.');
  }

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
}
