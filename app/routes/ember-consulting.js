import Ember from 'ember';
const { inject: { service }, Route, String: { htmlSafe } } = Ember;

export default Route.extend({
  headData: service(),
  model() {
    return [
      {
        heading: 'Scout',
        imageURL: 'img/scout-logo.png',
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
        imageURL: 'img/WW.png',
        panelHeading: 'Williamson Wagner',
        panelSubheading: 'Logo design, web design, and website',
        panelInfo: htmlSafe(
          `<p>
            We worked on every facet of Williamson Wagner's brand.
            From logo designs, to shirt designs, to web design and
            full development of williamsonwagner.com.
          </p>`
        )
      }
    ];
  },
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Ember Consulting - Ship Shape - Ember Development',
      description: 'Ember consulting is our specialty at Ship Shape.'
      + 'We have worked on several ambitious, full scale apps for various clients. '
      + 'Contact us for Ember consulting work today!',
      type: 'website',
      url: 'https://shipshape.io/ember-consulting'
    });
  }
});
