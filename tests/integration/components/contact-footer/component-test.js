import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stripWhitespace from '../../../helpers/strip-whitespace';

moduleForComponent('contact-footer', 'Integration | Component | contact footer', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{contact-footer}}`);

  assert.equal(stripWhitespace(this.$().text().trim()),
  'Set a course for success Ember.js consulting, development, and training for your project. Let\'s talk. CONTACT US');
});
