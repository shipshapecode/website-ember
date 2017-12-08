import { find } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import stripWhitespace from '../../../helpers/strip-whitespace';

module('Integration | Component | contact footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{contact-footer}}`);

    assert.equal(stripWhitespace(find('*').textContent.trim()),
      'Set a course for success Ember.js consulting, development, and training for your project. Let\'s talk. CONTACT US');
  });
});