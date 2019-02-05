import Route from '@ember/routing/route';

export default class Brokermate extends Route {
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
}
