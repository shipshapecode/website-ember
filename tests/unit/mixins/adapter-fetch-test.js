import EmberObject from '@ember/object';
import AdapterFetchMixin from 'website/mixins/adapter-fetch';
import { module, test } from 'qunit';

module('Unit | Mixin | adapter fetch');

// Replace this with your real tests.
test('it works', function(assert) {
  let AdapterFetchObject = EmberObject.extend(AdapterFetchMixin);
  let subject = AdapterFetchObject.create();
  assert.ok(subject);
});
