import config from './config/environment';
import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import { get, getWithDefault } from '@ember/object';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,
  fastboot: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    if (!get(this, 'fastboot.isFastBoot')) {
      run.scheduleOnce('afterRender', this, () => {
        const page = document.location.pathname;
        const title = getWithDefault(this, 'currentRouteName', 'unknown');

        if (typeof galite === 'undefined') {
          return;
        }
        return galite('send', 'pageview', { page, title });
      });
    }
  }
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('blog', function() {
    this.route('authors', function() {
      this.route('author', { path: '/:author/' });
    });
    this.route('categories', function() {
      this.route('category', { path: '/:category/' });
    });
    this.route('post', { path: '/*path/' });
  });
  this.route('contact');
  this.route('ember-consulting');
  this.route('open-source');
  this.route('team');
  this.route('work', function() {
    this.route('brokermate');
    this.route('netflix');
    this.route('acquia');
    this.route('socialcode');
  });
  this.route('lost-at-sea', { path: '/*path' });
});

export default Router;
