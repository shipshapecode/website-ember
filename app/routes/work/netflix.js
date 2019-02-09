import Route from '@ember/routing/route';

export default class Netflix extends Route {
  model() {
    return {
      metaTags: {
        title: 'Case Study - Netflix',
        description: 'Learn how we helped build finance tools for the world\'s number one streaming platform.',
        type: 'website',
        url: 'https://shipshape.io/work/netflix/'
      }
    };
  }
}
