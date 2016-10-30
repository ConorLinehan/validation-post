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
