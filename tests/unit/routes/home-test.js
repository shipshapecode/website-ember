import { moduleFor, test } from 'ember-qunit';

moduleFor('route:home', 'Unit | Route | home', {
  needs: ['service:router-scroll']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
