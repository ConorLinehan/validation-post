import BaseValidator from 'ember-cp-validations/validators/base';
import Ember from 'ember';

const {
  isBlank
} = Ember;

function palindrome(str) {
  if (isBlank(str)) {
    return false;
  }
  var re = /[^A-Za-z0-9]/g;
  str = str.toLowerCase().replace(re, '');
  var len = str.length;
  for (var i = 0; i < len/2; i++) {
   if (str[i] !== str[len - 1 - i]) {
       return false;
   }
  }
  return true;
}

const Palindrome = BaseValidator.extend({
  validate(value, { message }) {
    if (palindrome(value)) {
      return true;
    } else {
      return message;
    }
  },
});

export default Palindrome;
