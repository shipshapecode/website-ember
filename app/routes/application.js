import { A } from '@ember/array';
import Route from '@ember/routing/route';
import SmoothScroll from 'smooth-scroll';
import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Route.extend({
  fastboot: service(),
  model() {
    return {
      links: A([
        {
          linkTo: 'home',
          text: 'Home',
          type: 'linkTo'
        },
        {
          linkTo: 'ember-consulting',
          text: 'Ember Consulting',
          type: 'linkTo'
        },
        {
          linkTo: 'open-source',
          text: 'Open Source',
          type: 'linkTo'
        },
        {
          linkTo: 'contact',
          text: 'Contact',
          type: 'linkTo'
        },
        {
          linkTo: 'blog',
          text: 'Blog',
          type: 'linkTo'
        }
      ])
    };
  },

  setupController() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, function() {
      if (!get(this, 'fastboot.isFastBoot')) {
        const scroll = new SmoothScroll();

        const smoothScrollWithoutHash = function(selector, settings) {
          /**
           * If smooth scroll element clicked, animate scroll
           */
          const clickHandler = function(event) {
            const toggle = event.target.closest(selector);
            if (!toggle || toggle.tagName.toLowerCase() !== 'a') {
              return;
            }
            const anchor = document.querySelector(toggle.hash);
            if (!anchor) {
              return;
            }

            event.preventDefault(); // Prevent default click event
            scroll.animateScroll(anchor, toggle, settings || {}); // Animate scroll
          };

          window.addEventListener('click', clickHandler, false);
        };

        smoothScrollWithoutHash('a[href*="#"]');
      }
    });
  }
});
