import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:palindrome', 'Unit | Validator | palindrome', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
