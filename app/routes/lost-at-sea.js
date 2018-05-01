import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      attributes: {
        title: '404 - Ship Shape',
        description: 'Oops!',
        type: 'website',
        url: 'https://shipshape.io/lost-at-sea/'
      }
    };
  },

  redirect() {
    const url = this.router.location.formatURL('/lost-at-sea');
    if (window && window.location && window.location.pathname !== url) {
      this.replaceWith('/lost-at-sea/');
    }
  }
});
