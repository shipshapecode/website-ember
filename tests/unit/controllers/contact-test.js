import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:contact', 'Unit | Controller | contact', {
  needs: ['service:fastboot', 'service:router-scroll', 'service:scheduler']
});

test('sendDisabled calculates correctly', function(assert) {
  const controller = this.subject();

  controller.set('model', { validations: { isValid: false } });

  assert.equal(controller.get('sendDisabled'), true, 'Disabled inititally');

  controller.set('model.validations.isValid', true);

  assert.equal(controller.get('sendDisabled'), false, 'Enabled when valid');
});
