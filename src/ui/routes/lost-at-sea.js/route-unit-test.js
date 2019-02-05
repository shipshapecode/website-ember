import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | lost at sea', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:lost-at-sea');
    assert.ok(route);
  });
});