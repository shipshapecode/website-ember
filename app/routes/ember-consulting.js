import { get, setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),
  model() {
    return [
      {
        heading: 'Mentrs',
        imageURL: 'img/clients/mentrs-logo.png',
        panelHeading: 'Mentrs',
        panelSubheading: 'MVP app development and staff training',
        panelInfo: htmlSafe(
          `<p>
            We worked on the Mentrs MVP from the ground up,
            starting with running 'ember new', and adding all the addons, 
            ESLint plugins, template lintings, and doing all the initial 
            work required to create an Ember app, rooted in the latest Ember standards.
          </p>

          <p>
            Features we implemented included everything from login and sign up, 
            to class creation, and Stripe integration for paying to enroll in classes.
          </p>`
        )
      },
      {
        heading: 'Scout',
        imageURL: 'img/clients/scout-logo.png',
        panelHeading: 'Scout',
        panelSubheading: 'Code audit, app feature development',
        panelInfo: htmlSafe(
          `<p>
            We did several months of work with Scout,
            starting with updating to the latest versions of
            Ember and Ember CLI, adding Ember Suave, and adhering
            to the new set of ESLint rules.
          </p>

          <p>
            We worked extensively on the appointment scheduling
            aspects of the app, creating full screen overlays,
            using Ember Flatpickr, Ember Paper and Ember Power Select,
            to allow a customer or staff member to create or edit an
            appointment.
          </p>`
        )
      },
      {
        heading: 'Williamson Wagner',
        imageURL: 'img/clients/WW.png',
        panelHeading: 'Williamson Wagner',
        panelSubheading: 'Logo design, web design, and website',
        panelInfo: htmlSafe(
          `<p>
            We worked on every facet of Williamson Wagner's brand.
            From logo designs, to shirt designs, to web design and
            full development of williamsonwagner.com.
          </p>`
        )
      },
      {
        heading: 'greenlight.guru',
        imageURL: 'img/clients/greenlight-logo.png',
        panelHeading: 'greenlight.guru',
        panelSubheading: '1.10 - 1.13 update and deprecation fixes, grunt to ember-cli',
        panelInfo: htmlSafe(
          `<p>
            We first updated the greenlight.guru app to Ember 1.12, fixing deprecations as we went.
            After 1.12 was complete, we undertook the task of migrating a grunt based build to ember-cli.
            We finally updated the app to Ember 1.13 and fixed all the deprecations.
          </p>`
        )
      }
    ];
  },
  afterModel() {
    return setProperties(get(this, 'headData'), {
      title: 'Ember Consulting - Ship Shape',
      description: 'Ember consulting is our specialty at Ship Shape. We have worked on several ambitious, '
      + 'full scale Ember apps. Contact us for Ember consulting work today!',
      type: 'website',
      url: 'https://shipshape.io/ember-consulting'
    });
  }
});
