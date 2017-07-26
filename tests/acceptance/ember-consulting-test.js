import { test } from 'qunit';
import moduleForAcceptance from 'website/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | ember consulting');

test('visiting /ember-consulting', function(assert) {
  visit('/ember-consulting');

  percySnapshot(assert);

  andThen(function() {
    assert.equal(currentURL(), '/ember-consulting');
  });
});
