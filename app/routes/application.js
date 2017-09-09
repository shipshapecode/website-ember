import { A } from '@ember/array';
import Route from '@ember/routing/route';
import SmoothScroll from 'smooth-scroll';
import { scheduleOnce } from '@ember/runloop';

export default Route.extend({
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
          href: 'http://blog.shipshape.io',
          text: 'Blog',
          type: 'href'
        }
      ])
    };
  },

  setupController() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, function() {
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
    });
  }
});
