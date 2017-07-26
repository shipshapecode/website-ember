import { test } from 'qunit';
import moduleForAcceptance from 'website/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | contact');

test('visiting /contact', function(assert) {
  visit('/contact');

  percySnapshot(assert);

  andThen(function() {
    assert.equal(currentURL(), '/contact');
  });
});
