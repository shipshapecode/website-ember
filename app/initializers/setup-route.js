import Route from '@ember/routing/route';
export function initialize(/* application */) {
  if (typeof FastBoot === 'undefined') {
    Route.reopen({
      activate() {
        const classes = this.genClasses();

        if (classes !== 'application') {
          document.body.classList.add(classes);
        }
      },
      deactivate() {
        document.body.classList.remove(this.genClasses());
      },
      genClasses() {
        const classes = this.routeName.split('.');

        if (this.classNames) {
          for (const name of this.classNames) {
            classes.push(name);
          }
        }

        return classes.join(' ');
      }
    });
  }
}

export default {
  initialize
};
