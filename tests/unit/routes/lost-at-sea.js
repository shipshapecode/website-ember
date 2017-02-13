import { moduleFor, test } from 'ember-qunit';

moduleFor('route:lost-at-sea', 'Unit | Route | lost at sea', {
  needs: ['service:fastboot', 'service:metrics', 'service:router-scroll']
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});
