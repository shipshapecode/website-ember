import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggleNavMenu() {
      const navLinks = this.element.querySelector('.nav-links');

      if (navLinks.classList.contains('hidden')) {
        navLinks.classList.remove('hidden');
      } else {
        navLinks.classList.add('hidden');
      }
    }
  }
});
