import { get, setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),

  redirect() {
    const url = this.router.location.formatURL('/lost-at-sea');
    if (window && window.location && window.location.pathname !== url) {
      this.replaceWith('/lost-at-sea');
    }
  },

  afterModel() {
    return setProperties(get(this, 'headData'), {
      title: '404 - Ship Shape',
      description: 'Oops!',
      type: 'website',
      url: 'https://shipshape.io/lost-at-sea'
    });
  }
});
