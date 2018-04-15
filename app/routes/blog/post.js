import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import PostMetaMixin from 'prember-meta/mixins/post-meta';

export default Route.extend(PostMetaMixin, {
  markdownResolver: service(),

  model({ path }) {
    const withoutSlash = !path.endsWith('/') ? path : path.slice(0, -1);
    return this.markdownResolver.file('blog', withoutSlash);
  }
});
