import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | work/client', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:work/client');
    assert.ok(route);
  });
});
