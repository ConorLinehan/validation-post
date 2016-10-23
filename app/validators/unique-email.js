import BaseValidator from 'ember-cp-validations/validators/base';
import { task, timeout } from 'ember-concurrency';
import {
  regularExpressions
} from 'ember-validators/format';
import Ember from 'ember';

const {
  inject: { service },
  computed
} = Ember;

const {
  email: emailRegex
} = regularExpressions;

const DEBOUNCE_TIME = Ember.testing ? 10 : 300;

function isValidEmail(email) {
  return emailRegex.test(email);
}

const UniqueEmail = BaseValidator.extend({
  store: service(),

  isValidating: computed.readOnly('uniqueEmailTask.isRunning'),

  uniqueEmailTask: task(function *(email) {
    yield timeout(DEBOUNCE_TIME);
    let users = yield this.get('store').query('user', { email: email });
    if (users.get('length') > 0) {
      return false;
    } else {
      return true;
    }
  }).restartable(),

  validate(email) {

    if (!isValidEmail(email)) {
      return 'Not a Valid Email';
    }

    return this.get('uniqueEmailTask').perform(email)
    .then(isUnique =>{
      if (isUnique) {
        return true;
      } else {
        return `${email} is already in use`;
      }
    })
    .catch(e =>{
      if (e.name !== "TaskCancelation") {
        return 'There was an error checking email for uniqueness';
      }
    });
  }
});

UniqueEmail.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * [
   * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
   * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
   * ]
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default UniqueEmail;
