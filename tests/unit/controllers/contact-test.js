import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:contact', 'Unit | Controller | contact', {
  needs: ['service:fastboot', 'service:metrics', 'service:router-scroll']
});

test('sendDisabled calculates correctly', function(assert) {
  let controller = this.subject();

  controller.set('model', { validations: { isValid: false } });

  assert.equal(controller.get('sendDisabled'), true, 'Disabled inititally');

  controller.set('model.validations.isValid', true);

  assert.equal(controller.get('sendDisabled'), false, 'Enabled when valid');
});
