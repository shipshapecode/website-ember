import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | blog/categories/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:blog/categories/index');
    assert.ok(route);
  });
});
