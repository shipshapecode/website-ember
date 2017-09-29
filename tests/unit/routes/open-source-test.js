import { moduleFor, test } from 'ember-qunit';

moduleFor('route:open-source', 'Unit | Route | open source', {
  needs: ['service:fastboot', 'service:headData', 'service:router-scroll', 'service:scheduler']
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});
