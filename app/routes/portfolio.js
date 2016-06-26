import Ember from 'ember';
import GitHub from 'npm:github-api';
const {A, Route, RSVP} = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('github-repo');
  }
});
