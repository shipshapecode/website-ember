import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stripWhitespace from '../../../helpers/strip-whitespace';

moduleForComponent('technologies-section', 'Integration | Component | technologies section', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{technologies-section}}`);

  assert.ok(stripWhitespace(stripWhitespace(find('*').textContent.trim())).includes('Technologies we use'));
});
