import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class Application extends Route {
  @service fastboot;

  model() {
    return {
      links: A([
        {
          linkTo: 'home',
          text: 'Home',
          type: 'linkTo'
        },
        {
          linkTo: 'work',
          text: 'Case Studies',
          type: 'linkTo'
        },
        {
          linkTo: 'ember-consulting',
          text: 'Ember Consulting',
          type: 'linkTo'
        },
        {
          linkTo: 'open-source',
          text: 'Open Source',
          type: 'linkTo'
        },
        {
          linkTo: 'contact',
          text: 'Contact',
          type: 'linkTo'
        },
        {
          linkTo: 'blog',
          matchParentRoute: true,
          text: 'Blog',
          type: 'linkTo'
        }
      ])
    };
  }
}
