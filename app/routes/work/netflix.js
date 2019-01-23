import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      metaTags: {
        title: 'Case Study - Netflix',
        description: '',
        type: 'website',
        url: 'https://shipshape.io/work/netflix/'
      }
    };
  }
});
