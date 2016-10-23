import Ember from 'ember';

const {
  computed,
  defineProperty
} = Ember;

export default Ember.Component.extend({
  tagName: 'p',
  classNames: ['control'],
  classNameBindings: ['isValidating:is-loading'],
  model: null,
  valuePath: '',
  validation: null,
  showValidations: false,
  isValidating: computed.readOnly('validation.isValidating'),

  showError: computed.and('showValidations', 'validation.isInvalid').readOnly(),

  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');

    defineProperty(this, 'validation', computed.readOnly(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', computed.alias(`model.${valuePath}`));
  },

  focusIn() {
    this._super(...arguments);
    this.set('showValidations', true);
  }
});
