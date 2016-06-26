import Ember from 'ember';
const {A, Route, RSVP} = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('github-repo');
  }
});
