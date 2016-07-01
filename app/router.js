import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('contact');
  this.route('ember-consulting');
  this.route('open-source');
});

export default Router;
