import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | space-to-dash', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('inputValue', 'foo bar baz');

    await render(hbs`{{space-to-dash inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'foo-bar-baz');
  });
});
