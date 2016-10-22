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
});

export default Ember.Component.extend(Validations, {
  name: computed.alias('user.name')
});
