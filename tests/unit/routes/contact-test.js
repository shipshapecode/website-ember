import { moduleFor, test } from 'ember-qunit';

moduleFor('route:contact', 'Unit | Route | contact', {
  needs: [
    'service:ajax', 'service:fastboot', 'service:flashMessages',
    'service:headData', 'service:metrics', 'service:router-scroll'
  ]
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});
