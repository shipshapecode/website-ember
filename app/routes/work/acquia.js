import Route from '@ember/routing/route';

export default class Acquia extends Route {
  model() {
    return {
      metaTags: {
        title: 'Case Study - Acquia',
        description: 'Learn how we helped Acquia create an Experience Builder.',
        type: 'website',
        url: 'https://shipshape.io/work/acquia/'
      }
    };
  }
}
