import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import stripWhitespace from '../../../helpers/strip-whitespace';

module('Integration | Component | technologies section', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{technologies-section}}`);

    assert.ok(stripWhitespace(stripWhitespace(find('*').textContent.trim())).includes('Technologies we use'));
  });
});
