import Route from 'ember-route';
import service from 'ember-service/inject';

export default Route.extend({
  headData: service(),
  redirect() {
    const url = this.router.location.formatURL('/lost-at-sea');
    if (window && window.location && window.location.pathname !== url) {
      this.replaceWith('/lost-at-sea');
    }
  },
  afterModel() {
    return this.get('headData').setProperties({
      title: '404 - Ship Shape',
      description: 'Oops!',
      type: 'website',
      url: 'https://shipshape.io/lost-at-sea'
    });
  }
});
