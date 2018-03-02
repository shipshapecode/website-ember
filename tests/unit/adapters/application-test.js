import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | application', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  skip('it exists', function(assert) {
    const adapter = this.owner.lookup('adapter:application');
    assert.ok(adapter);
  });
});
