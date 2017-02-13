import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  redirect() {
    const url = this.router.location.formatURL('/lost-at-sea');
    if (window && window.location && window.location.pathname !== url) {
      this.replaceWith('/lost-at-sea');
    }
  }
});
