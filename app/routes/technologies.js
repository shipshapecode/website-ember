import Ember from 'ember';
const {Route} = Ember;

export default Route.extend({
  afterModel() {
    this.get('meta').update({
      title: 'Technologies',
      description: 'We fully leverage Ember, Ember-Data, Ember-CLI, and various other technologies, ' +
      'to create state of the art apps.',
      'og:title': 'Ship Shape - Technologies',
      'og:type': 'website',
      'og:image': 'http://shipshape.io/img/ShipShapeIcon.svg',
      'og:url': 'http://shipshape.io/technologies'
    });
  }
});
