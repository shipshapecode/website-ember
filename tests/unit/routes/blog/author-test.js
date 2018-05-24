import { moduleFor, test } from 'ember-qunit';

moduleFor('route:blog/author', 'Unit | Route | blog/author', {
  needs: [
    'service:fastboot', 'service:headData', 'service:router-scroll', 'service:scheduler'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
