import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | work/acquia', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:work/acquia');
    assert.ok(route);
  });
});
