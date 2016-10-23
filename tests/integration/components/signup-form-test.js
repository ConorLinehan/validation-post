import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { form } from 'validation-post/tests/pages/signup';
import PageObject from 'ember-cli-page-object';
import Ember from 'ember';
import { startMirage } from 'validation-post/initializers/ember-cli-mirage';
import wait from 'ember-test-helpers/wait';

const page = PageObject.create(form);

moduleForComponent('signup-form', 'Integration | Component | signup form', {
  integration: true,

  beforeEach() {
    this.server = startMirage();
    page.setContext(this);
  },

  afterEach() {
    this.server.shutdown();
    page.removeContext();
  }
});

test('it can submit form', function(assert) {
  // CP Validation
  this.set('addresses', [
    Ember.Object.create({name: 'Cork'}),
    Ember.Object.create({name: 'Dublin'}),
    Ember.Object.create({name: 'Limerick'}),
  ]);

  this.set('user', Ember.Object.create({
    // Fields
  }));

  let submitSpy;

  page.render(hbs`{{signup-form
    selectionAddresses=addresses
  }}`);

  assert.ok(page.submit.isDisabled, 'form is intially disabled');

  page.fillInCorrectly();

  assert.notOk(page.submit.isDisabled, 'form is not disabled if validations have been met');

  page.form.submit();
  assert.ok(submitSpy.calledOnce);
});


test('it validates name', function(assert) {
  this.set('user', Ember.Object.create({
    name: ''
  }));

  page.render(hbs`{{signup-form
    user=user
  }}`);

  page.name.focus();

  page.name.fill('John Doe');
  assert.notOk(page.name.isError, 'error is not shown on valid name');

  page.name.fill('');
  assert.ok(page.name.isError, 'error is shown on empty name');

  page.name.fill('❌');
  assert.ok(page.name.isError, 'shows error on invalid characters');
});

test('it validates address', function(assert) {
  this.set('addresses', [
    Ember.Object.create({ name: 'Cork' }),
    Ember.Object.create({ name: 'Dublin'}),
    Ember.Object.create({ name: 'Limerick'})
  ]);

  this.set('user', Ember.Object.create({
    addresses: []
  }));

  page.render(hbs`{{signup-form
      user=user
      selectionAddresses=addresses
  }}`);

  page.address.focus();
  page.address.select(0);
  assert.ok(page.address.isError, 'shows error');
  page.address.select(1);
  assert.notOk(page.address.isError, 'no error for valid address');
  page.address.select(2);
  assert.ok(page.address.isError, 'shows error');
});

test('it validates palindrome', function(assert) {
  this.set('user', Ember.Object.create({
    favoritePalindrome: ''
  }));

  page.render(hbs`{{signup-form
    user=user
  }}`);

  page.palindrome.focus();
  page.palindrome.fill('Not a palindrome');
  assert.ok(page.palindrome.isError, 'shows error');
  page.palindrome.fill('Navan');
  assert.notOk(page.palindrome.isError);
});

test('it validates email', function(assert) {
  this.server.create('user', {
    email: 'inuse@test.com'
  });

  this.set('user', Ember.Object.create({
    email: ''
  }));

  page.render(hbs`{{signup-form
    user=user
  }}`);

  page.email.focus();

  page.email.fill('not an email');
  assert.ok(page.email.isError, 'shows error for invalid email');

  page.email.fill('inuse@test.com');
  return wait()
  .then(() =>{
    assert.ok(page.email.isError, 'shows error for email in use');

    page.email.fill('valid@test.com');
    return wait()
    .then(() =>{
      assert.notOk(page.email.isError, 'doesn\'t show error for valid email');      
    });
  });
});
