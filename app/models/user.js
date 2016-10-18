import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  email: attr('string'),
  name: attr('string'),
  address: belongsTo('address'),
  favoritePalindrome: attr('string')
});
