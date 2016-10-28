import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({

  model() {
    return RSVP.hash({
      addresses: this.get('store').findAll('address'),
      newUser: this.get('store').createRecord('user')
    });
  },
});
