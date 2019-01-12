import EmberRouterScroll from 'ember-router-scroll/locations/router-scroll';

export default EmberRouterScroll.extend({
  formatURL() {
    let url = this._super(...arguments);

    if (url.includes('#')) {
      return url.replace(/([^/])#(.*)/, '$1/#$2');
    } else if (url.includes('?')) {
      const replacementPattern = url.includes('/?') ? '$1$2' : '$1/$2';
      return url.replace(/([^?]+)(\?.*)?/g, replacementPattern);
    } else {
      return url.replace(/\/?$/, '/');
    }
  }
});
