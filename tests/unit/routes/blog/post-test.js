import { moduleFor, test } from 'ember-qunit';

moduleFor('route:blog/post', 'Unit | Route | blog/post', {
  needs: [
    'service:adapter', 'service:fastboot', 'service:headData',
    'service:router-scroll'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
