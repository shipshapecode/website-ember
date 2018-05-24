import { moduleForComponent, skip } from 'ember-qunit';
import { find } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('author-row', 'Integration | Component | author row', {
  integration: true
});

skip('it renders', function(assert) {
  this.render(hbs`{{author-row}}`);

  assert.equal(find('*').textContent.trim(), 'Read more posts by this author.');
});
