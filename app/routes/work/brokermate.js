import Route from '@ember/routing/route';

export default class Brokermate extends Route {
  model() {
    return {
      metaTags: {
        title: 'Case Study - Brokermate',
        description: 'Learn how we helped Brokermate create custom site tours, to walk new users through their brokerage app.',
        type: 'website',
        url: 'https://shipshape.io/work/brokermate/'
      }
    };
  }
}
