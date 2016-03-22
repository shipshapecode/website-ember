import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      links: Ember.A([
        {
          linkTo: 'home',
          text: 'Home',
          type: 'linkTo'
        },
        {
          linkTo: 'technologies',
          text: 'Technologies',
          type: 'linkTo'
        },
        {
          linkTo: 'blog',
          text: 'Blog',
          type: 'linkTo'
        },
        {
          linkTo: 'portfolio',
          text: 'Portfolio',
          type: 'linkTo'
        },
        {
          linkTo: 'contact',
          text: 'Contact',
          type: 'linkTo'
        }
      ])
    };
  }
});
