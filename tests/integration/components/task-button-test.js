import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { task, timeout } from 'ember-concurrency';
import Ember from 'ember';
import PageObject from 'ember-cli-page-object';

const {
  RSVP
} = Ember;

const {
  hasClass
} = PageObject;

const page = PageObject.create({
  isDisabled: hasClass('disabled'),
  isSuccess: hasClass('is-success'),
  isError: hasClass('is-danger'),
  isLoading: hasClass('is-loading'),
});

moduleForComponent('task-button', 'Integration | Component | task button', {
  integration: true,

  beforeEach() {
    page.setContext(this);
  },

  afterEach() {
    page.removeContext();
  }
});

test('it shows state - success', function(assert) {
  this.set('successTask', task(function *() {
    yield timeout(100);
    yield RSVP.resolve();
  }));
  page.render(hbs`{{task-button action=(perform successTask)}}`);
  page.click();

  assert.ok(page.isLoading, 'shows loading state');
  assert.ok(page.isDisabled, 'disables');

  return timeout(105)
  .then(() =>{
    assert.ok(page.isSuccess, 'show\'s success state');
    return timeout(105)
    .then(() =>{
      assert.notOk(page.isSuccess, 'resets back to normal');
    });
  });
});

test('it shows state - error', function(assert) {
  this.set('errorTask', task(function *() {
    yield timeout(100);
    throw new Error();
  }));

  page.render(hbs`{{task-button action=(perform errorTask)}}`);
  page.click();

  return timeout(110)
  .then(() =>{
    assert.ok(page.isError, 'show\'s error state');
    return timeout(105)
    .then(() =>{
      assert.notOk(page.isError, 'resets');
    });
  });
});

test('it disables button', function(assert) {
  this.set('task', task(function *() {
    yield timeout(100);
  }));

  page.render(hbs`{{task-button action=(perform task)}}`);
  page.click();
  page.click();
  page.click();
  assert.equal(this.get('task.concurrency'), 1);
});
