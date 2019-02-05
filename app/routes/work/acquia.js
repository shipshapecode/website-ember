import Route from '@ember/routing/route';

export default class Acquia extends Route {
  model() {
    return {
      metaTags: {
        title: 'Case Study - Acquia',
        description: '',
        type: 'website',
        url: 'https://shipshape.io/work/acquia/'
      }
    };
  }
}
