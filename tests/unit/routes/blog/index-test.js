import { moduleFor, test } from 'ember-qunit';

moduleFor('route:blog/index', 'Unit | Route | blog/index', {
  needs: [
    'service:fastboot', 'service:markdownResolver',
    'service:router-scroll', 'service:scheduler'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
