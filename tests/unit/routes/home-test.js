import { moduleFor, test } from 'ember-qunit';

moduleFor('route:home', 'Unit | Route | home', {
  needs: ['service:fastboot', 'service:headData', 'service:metrics', 'service:router-scroll']
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});
