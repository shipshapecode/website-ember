import Route from '@ember/routing/route';

export default class Index extends Route {
  async model() {
    return await this.modelFor('blog');
  }

  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.set('page', 1);
    }
  }
}
