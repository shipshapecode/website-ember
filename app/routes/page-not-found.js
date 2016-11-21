import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  redirect() {
    const url = this.router.location.formatURL('/page-not-found');
    if (window && window.location && window.location.pathname !== url) {
      this.replaceWith('/');
    }
  }
});
