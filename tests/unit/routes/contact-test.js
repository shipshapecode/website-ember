import { moduleFor, test } from 'ember-qunit';

moduleFor('route:contact', 'Unit | Route | contact', {
  needs: [
    'service:fastboot', 'service:flashMessages', 'service:headData',
    'service:metrics', 'service:router-scroll', 'service:scheduler'
  ]
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});
