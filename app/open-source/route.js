import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Route.extend({
  headData: service(),
  model() {
    return this.store.findAll('github-repo');
  },
  afterModel() {
    this.get('headData').setProperties({
      title: 'Ship Shape - Open Source',
      description: 'We have created several Ember addons and collaborated extensively with the Ember community.',
      type: 'website',
      image: 'http://shipshape.io/img/ShipShapeIcon.svg',
      url: 'http://shipshape.io/portfolio'
    });
  }
});
