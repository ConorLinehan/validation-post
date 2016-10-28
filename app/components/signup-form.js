import Ember from 'ember';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  computed
} = Ember;

const Validations = buildValidations({
  name: [
    validator('presence', true, {
      message: 'Name must be present'
    }),
    validator('format', {
      regex: /^[a-zA-Z  ']+$/,
      message: 'Name can only contain letters'
    })
  ],
  addresses: validator('length', {
    is: 2,
    message: 'You can only select 2 addresses'
  }),
  palindrome: validator('palindrome', {
    message: 'Must be a valid palindrome'
  }),
  email: validator('unique-email'),
  media: validator('is-media')
});

export default Ember.Component.extend(Validations, {
  name: computed.alias('user.name'),
  addresses: computed.alias('user.addresses'),
  palindrome: computed.alias('user.favoritePalindrome'),
  email: computed.alias('user.email'),
  media: computed.alias('user.favoriteMedia')
});
