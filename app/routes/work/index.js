import Route from '@ember/routing/route';
import { htmlSafe } from '@ember/string';

export default class Index extends Route {
  model() {
    return {
      clients: [
        {
          heading: 'SocialCode',
          imageURL: '/img/clients/socialcode.png',
          panelHeading: 'SocialCode',
          panelSubheading: 'Staff augmentation, code audit, feature development',
          panelInfo: htmlSafe(`
          <p>
            SocialCode has a unique "micro apps" setup, which we helped streamline, by moving common dependencies to a
            common addon, and ensuring all apps adhered to the same standards by enforcing the latest eslint-plugin-ember
            rules. We also migrated all the code to use the new modules syntax, and new testing syntax, and updated apps
            to the latest Ember version to make sure we were on the latest and greatest of everything.
          </p>

          <p>
            There was quite a lot of custom code hanging around, in the SocialCode apps, that could be replaced with some
            addons that did not exist when the apps were created. We refactored large chunks of code to use these addons,
            such as a refactor from a custom select to ember-power-select, and other similar refactors, to reduce the
            amount of in house code that needed to be maintained, and improve the stability of the apps going forward.
          </p>
          `)
        },
        {
          heading: 'Mariana Tek',
          imageURL: '/img/clients/mariana-tek.svg',
          panelHeading: 'Mariana Tek',
          panelSubheading: 'Staff augmentation for initial release',
          panelInfo: htmlSafe(`
          <p>
            We worked hand in hand with the Mariana Tek dev team to develop several required features for a major
            client release. This included an initial scan of the codebase, the addition of several ESLint rules from
            eslint-plugin-ember, and updates of various dependencies. We enforced best practices at every turn, and ensured the
            code looked very consistent, no matter who wrote it.
          </p>

          <p>
            We worked heavily on implementing the promotions page, which allowed clients to choose items to put on sale,
            add requirements for the sale to become active, such as having multiple items in their cart or a certain cart value,
            and allowing custom product variants to be used.
          </p>
          
          <p>
            We also did a lot of work on the time clock features. This included adding a clock in/out modal that would allow
            employees to clock in and out and add notes about their shifts, as well as a configuration page that showed a table
            of all the most recent shifts, utilizing ember-light-table, and allowed sorting by shift time and employee name.
            Admins were also able to manually edit or add shifts, if something needed to be tweaked from employee shifts.
          </p>
          
          <p>
            The rest of our work focused mainly on the permissions service and ensuring users could only access the parts
            of the app they were allowed to, based on their roles.
          </p>
          `)
        },
        {
          heading: 'Scout',
          imageURL: '/img/clients/scout-logo.png',
          panelHeading: 'Scout',
          panelSubheading: 'Code audit, app feature development',
          panelInfo: htmlSafe(`
          <p>
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
          </p>
          `)
        }
      ],

      metaTags: {
        title: 'Case Studies - Ship Shape',
        description: 'See a few examples of our work in Ember Consulting, and how we solve tough problems for our clients.',
        type: 'website',
        url: 'https://shipshape.io/work/'
      }
    };
  }
}
