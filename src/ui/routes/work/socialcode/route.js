import Route from '@ember/routing/route';

export default class Socialcode extends Route {
  model() {
    return {
      metaTags: {
        title: 'Case Study - SocialCode',
        description: '',
        type: 'website',
        url: 'https://shipshape.io/work/socialcode/'
      }
    };
  }
}
