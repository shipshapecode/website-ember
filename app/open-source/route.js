import Ember from 'ember';
import ResetScrollMixin from 'ember-scroll-operator/mixins/reset-scroll';
const { inject: { service }, Route } = Ember;

export default Route.extend(ResetScrollMixin, {
  headData: service(),
  model() {
    return this.store.findAll('github-repo');
  },
  afterModel() {
    return this.get('headData').setProperties({
      title: 'Ship Shape - Open Source',
      description: 'We have created several Ember addons and collaborated extensively with the Ember community.',
      type: 'website',
      url: 'http://shipshape.io/portfolio'
    });
  }
});
