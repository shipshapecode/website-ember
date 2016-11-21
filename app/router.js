import Ember from 'ember';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';
const { inject, Router: EmberRouter, run } = Ember;

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,
  fastboot: inject.service(),
  metrics: inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    if (!this.get('fastboot.isFastBoot')) {
      run.scheduleOnce('afterRender', this, () => {
        const page = document.location.pathname;
        const title = this.getWithDefault('currentRouteName', 'unknown');

        this.get('metrics').trackPage({ page, title });
      });
    }
  }
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('contact');
  this.route('ember-consulting');
  this.route('open-source');
  this.route('page-not-found', { path: '/*path' });
});

export default Router;
