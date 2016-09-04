import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  redirect() {
    let url = this.router.location.formatURL('/page-not-found');
    if (window.location.pathname !== url) {
      this.replaceWith('/');
    }
  }
});
