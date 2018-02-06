import Route from '@ember/routing/route';
export function initialize(/* application */) {
  if (typeof FastBoot === 'undefined') {
    Route.reopen({
      activate() {
        const classes = this.genClasses();

        if (!classes.includes('application')) {
          document.body.classList.add(...classes);
        }
      },
      deactivate() {
        const classes = this.genClasses();
        document.body.classList.remove(...classes);
      },
      genClasses() {
        const classes = this.routeName.split('.');

        if (this.classNames) {
          for (const name of this.classNames) {
            classes.push(name);
          }
        }

        return classes;
      }
    });
  }
}

export default {
  initialize
};
