import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  afterModel() {
    this.get('meta').update({
      title: 'Contact',
      description: 'Contact us for Ember.js consulting work!',
      'og:title': 'Ship Shape - Contact',
      'og:type': 'website',
      'og:image': 'http://shipshape.io/img/ShipShapeIcon.svg',
      'og:url': 'http://shipshape.io/contact'
    });
  }
});
