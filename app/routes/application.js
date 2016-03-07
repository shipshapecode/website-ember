import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      links: Ember.A([
        {
          linkTo: 'home',
          selected: true,
          text: 'Home'
        },
        {
          linkTo: 'technologies',
          selected: false,
          text: 'Technologies'
        },
        {
          linkTo: 'team',
          selected: false,
          text: 'Team'
        },
        {
          linkTo: 'portfolio',
          selected: false,
          text: 'Portfolio'
        },
        {
          linkTo: 'contact',
          selected: false,
          text: 'Contact'
        }
      ])
    };
  }
});
