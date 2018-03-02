import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | github repo', function(hooks) {
  setupTest(hooks);

  skip('it exists', function(assert) {
    const model = run(() => this.owner.lookup('service:store').createRecord('github-repo'));
    // let store = this.store();
    assert.ok(!!model);
  });
});
