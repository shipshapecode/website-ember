import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Route.extend({
  markdownResolver: inject(),

  model({ path }) {
    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);
    return get(this, 'markdownResolver').file('blog', withoutSlash);
  }
});
