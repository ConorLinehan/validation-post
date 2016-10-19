import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { form } from 'validation-post/tests/pages/signup';
import PageObject from 'ember-cli-page-object';
import Ember from 'ember';

const page = PageObject.create(form);

moduleForComponent('signup-form', 'Integration | Component | signup form', {
  integration: true,

  beforeEach() {
    page.setContext(this);
  },

  afterEach() {
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

  assert.notOk(page.name.isError, 'error is not shown intially');

  page.name.fill('John Doe');

  page.notOk(page.name.isError, 'error is not shown on valid name');

  page.name.fill('');

  page.ok(page.name.isError, 'error is shown on invalid name');
});
