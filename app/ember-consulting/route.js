import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  afterModel() {
    this.get('meta').update({
      title: 'Ember Consulting',
      description: 'We have worked on several ambitious, full scale apps for various companies. '
      + 'Contact us for Ember.js consulting work!',
      'og:title': 'Ship Shape - Ember Consulting',
      'og:type': 'website',
      'og:image': 'http://shipshape.io/img/ShipShapeIcon.svg',
      'og:url': 'http://shipshape.io/ember-consulting'
    });
  }
});
