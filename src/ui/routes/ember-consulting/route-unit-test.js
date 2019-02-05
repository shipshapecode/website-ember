import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | ember consulting', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:ember-consulting');
    assert.ok(route);
  });
});