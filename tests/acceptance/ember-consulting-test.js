import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | ember consulting', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /ember-consulting', async function(assert) {
    await visit('/ember-consulting');

    assert.equal(currentURL(), '/ember-consulting');
  });
});
