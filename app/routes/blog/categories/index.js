import Route from '@ember/routing/route';

export default class Index extends Route {
  async model() {
    return ['ember.js', 'ember-data'];
  }
}
