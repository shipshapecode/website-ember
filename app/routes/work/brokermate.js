import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      metaTags: {
        title: 'Case Study - Brokermate',
        description: '',
        type: 'website',
        url: 'https://shipshape.io/work/brokermate/'
      }
    };
  }
});
