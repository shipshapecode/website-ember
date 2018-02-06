import { moduleFor, test } from 'ember-qunit';

moduleFor('route:blog/post', 'Unit | Route | blog/post', {
  needs: ['service:fastboot', 'service:markdownResolver']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
