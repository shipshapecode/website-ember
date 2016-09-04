import Ember from 'ember';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';
const { Router: EmberRouter } = Ember;

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('contact');
  this.route('ember-consulting');
  this.route('open-source');
  this.route('page-not-found', { path: '/*path' });
});

export default Router;
