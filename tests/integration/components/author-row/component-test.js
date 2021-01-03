import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | author row', function(hooks) {
  setupRenderingTest(hooks);

  skip('it renders', function(assert) {
    this.render(hbs`{{author-row}}`);

    assert.equal(find('*').textContent.trim(), 'Read more posts by this author.');
  });
});
