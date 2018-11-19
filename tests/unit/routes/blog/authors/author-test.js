import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | blog/authors/author', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:blog/authors/author');
    assert.ok(route);
  });
});
