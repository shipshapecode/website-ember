import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      attributes: {
        title: 'Ship Shape - Ember.js Code That Won\'t Sink',
        description:
        'Ship Shape is a Washington D.C. based software consultancy specializing in all things Ember. ' +
        'We leverage Ember.js, and all the latest Ember addons and technologies, to create truly ambitious, ' +
        'state of the art applications that are future-proof and easily maintainable.',
        type: 'website',
        url: 'https://shipshape.io/'
      }
    };
  }
});
