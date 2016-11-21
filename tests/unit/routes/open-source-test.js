import { moduleFor, test } from 'ember-qunit';

moduleFor('route:open-source', 'Unit | Route | open source', {
  needs: ['service:fastboot', 'service:metrics', 'service:router-scroll']
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});
