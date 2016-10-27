import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  name: computed.alias('user.name'),
  addresses: computed.alias('user.addresses'),
  palindrome: computed.alias('user.favoritePalindrome'),
  email: computed.alias('user.email'),
  media: computed.alias('user.favoriteMedia')
});
