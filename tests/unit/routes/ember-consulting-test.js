import { moduleFor, test } from 'ember-qunit';

moduleFor('route:ember-consulting', 'Unit | Route | ember consulting', {
  needs: ['service:fastboot', 'service:headData', 'service:metrics', 'service:router-scroll', 'service:scheduler']
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});
