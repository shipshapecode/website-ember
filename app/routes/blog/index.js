import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  adapter: service(),

  model() {
    return this.adapter.fetch({ url: 'content/blog.json' }).json()
      .then(({ data }) => {
        return data;
      });
  }
});
