import Route from '@ember/routing/route';

export default class Socialcode extends Route {
  model() {
    return {
      metaTags: {
        title: 'Case Study - SocialCode',
        description: 'Learn how we helped SocialCode organize multiple apps and addons into one core product.',
        type: 'website',
        url: 'https://shipshape.io/work/socialcode/'
      }
    };
  }
}
