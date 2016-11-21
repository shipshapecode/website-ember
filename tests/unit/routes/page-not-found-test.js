import { moduleFor, test } from 'ember-qunit';

moduleFor('route:page-not-found', 'Unit | Route | page not found', {
  needs: ['service:fastboot', 'service:metrics', 'service:router-scroll']
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});
