import { moduleFor, test } from 'ember-qunit';

moduleFor('route:page-not-found', 'Unit | Route | page not found', {
  needs: ['service:fastboot', 'service:metrics', 'service:router-scroll']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
