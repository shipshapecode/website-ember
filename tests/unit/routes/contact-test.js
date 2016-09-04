import { moduleFor, test } from 'ember-qunit';

moduleFor('route:contact', 'Unit | Route | contact', {
  needs: ['service:router-scroll']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
