import config from './config/environment';
import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import { get, getWithDefault } from '@ember/object';
import galite from 'ga-lite';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,
  fastboot: service(),

  init() {
    this._super(...arguments);
    if (!get(this, 'fastboot.isFastBoot') && config.environment === 'production') {
      galite('create', 'UA-84561982-1', 'auto');
    }
  },

  didTransition() {
    this._super(...arguments);
    if (config.environment === 'production') {
      this._trackPage();
    }
  },

  _trackPage() {
    if (!get(this, 'fastboot.isFastBoot')) {
      run.scheduleOnce('afterRender', this, () => {
        const page = document.location.pathname;
        const title = getWithDefault(this, 'currentRouteName', 'unknown');

        return galite('send', 'pageview', { page, title });
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
