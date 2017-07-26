import { test } from 'qunit';
import moduleForAcceptance from 'website/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | home');

test('visiting /', function(assert) {
  visit('/');

  percySnapshot(assert);

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
