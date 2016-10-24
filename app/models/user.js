import DS from 'ember-data';

const {
  attr,
  hasMany
} = DS;

export default DS.Model.extend({
  email: attr('string'),
  name: attr('string'),
  addresses: hasMany('address'),
  favoritePalindrome: attr('string'),
  favoriteMedia: attr('string')
});
