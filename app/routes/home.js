import Ember from 'ember';
const {Route} = Ember;

export default Route.extend({
  model(){
    return {
      strings: ['Meticulously crafted ambitious web applications']
    };
  },
  afterModel() {
    this.get('meta').update({
      title: 'Home',
      description: 'Ship Shape is a Washington D.C. based Ember consultancy. We leverage Ember.js, ' +
      'and all the latest technologies, to create truly ambitious applications.',
      'og:title': 'Ship Shape - Home',
      'og:type': 'website',
      'og:image': 'http://shipshape.io/img/ShipShapeIcon.svg',
      'og:url': 'http://shipshape.io/'
    });
  }
});
