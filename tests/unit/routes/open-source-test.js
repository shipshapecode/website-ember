import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | open source', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:open-source');
    assert.ok(route);
  });
});