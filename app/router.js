import config from './config/environment';
import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,
  fastboot: service(),
  metrics: service(),

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
  this.route('lost-at-sea', { path: '/*path' });
});

export default Router;
