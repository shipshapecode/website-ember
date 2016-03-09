import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return {
      strings: ['Meticulously crafted ambitious web applications']
    };
  }
});
