import { moduleFor, test } from 'ember-qunit';

moduleFor('route:home', 'Unit | Route | home', {
  needs: ['service:fastboot', 'service:headData', 'service:router-scroll', 'service:scheduler']
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});
