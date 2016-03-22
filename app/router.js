import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('technologies');
  this.route('portfolio');
  this.route('contact');
  this.foute('blog', 'http://blog.shipshape.io');
  this.route('team');
});

export default Router;
