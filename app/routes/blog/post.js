import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  adapter: service(),

  model({ path }) {
    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);

    return this.adapter.fetch({ url: `content/${withoutSlash}.json` }).json()
      .then(({ data }) => {
        return {
          attributes: data.attributes,
          content: data.attributes.html
        };
      });
  }
});
