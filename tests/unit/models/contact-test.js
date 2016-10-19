import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
const { run } = Ember;

moduleForModel('contact', 'Unit | Model | contact', {
  // Specify the other units that are required for this test.
  needs: ['validator:format', 'validator:presence']
});

test('model validations are correct', function(assert) {
  let model = this.subject();

  assert.equal(model.get('validations.isValid'), false, 'Model is invalid');

  run(() =>{
    model.set('description', 'Test description');
    model.set('email', 'foo@bar.com');
    model.set('name', 'John Smith');

    assert.equal(model.get('validations.isValid'), true, 'Model is valid');
  });
});
