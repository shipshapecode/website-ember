import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | contact', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /contact', async function(assert) {
    await visit('/contact');

    assert.equal(currentURL(), '/contact');
  });
});
