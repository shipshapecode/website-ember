import Ember from 'ember';
const {Route} = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('github-repo');
  },
  afterModel() {
    this.get('meta').update({
      title: 'Open Source',
      description: 'We have created several Ember addons and collaborated extensively with the Ember community.',
      'og:title': 'Ship Shape - Portfolio',
      'og:type': 'website',
      'og:image': 'http://shipshape.io/img/ShipShapeIcon.svg',
      'og:url': 'http://shipshape.io/portfolio'
    });
  }
});
