import EmberRouterScroll from 'ember-router-scroll/locations/router-scroll';

export default EmberRouterScroll.extend({
  formatURL() {
    let url = this._super(...arguments);

    if (url.includes('#')) {
      return url.replace(/([^/])#(.*)/, '$1/#$2');
    } else {
      return url.replace(/\/?$/, '/');
    }
  }
});
