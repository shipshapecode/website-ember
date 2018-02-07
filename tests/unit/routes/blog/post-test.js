import { moduleFor, test } from 'ember-qunit';

moduleFor('route:blog/post', 'Unit | Route | blog/post', {
  needs: [
    'service:fastboot', 'service:headData', 'service:markdownResolver',
    'service:router-scroll', 'service:scheduler'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
