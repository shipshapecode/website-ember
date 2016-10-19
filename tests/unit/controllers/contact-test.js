import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:contact', 'Unit | Controller | contact', {
  needs: ['service:fastboot', 'service:metrics', 'service:router-scroll']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
