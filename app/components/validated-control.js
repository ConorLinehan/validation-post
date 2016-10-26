import Ember from 'ember';
import { animate, stop } from "liquid-fire";

const {
  computed,
  defineProperty
} = Ember;

export default Ember.Component.extend({
  shakeAnimation,
  tagName: 'p',
  classNames: ['control', 'has-icon', 'has-icon-right'],
  classNameBindings: ['isValidating:is-loading'],
  model: null,
  valuePath: '',
  validation: null,
  showValidations: false,
  isValidating: computed.readOnly('validation.isValidating'),

  showSuccess: computed.and('showValidations', 'validation.isValid'),
  showError: computed.and('showValidations', 'validation.isInvalid').readOnly(),
  errorMessage: computed('validation.messages.[]', 'showError', {
    get() {
      if (this.get('showError')) {
        return this.get('validation.messages.firstObject');
      } else {
        return '';
      }
    }
  }).readOnly(),

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

function shakeAnimation() {
  stop(this.oldElement);
  this.oldElement.css({display: 'none'});
  return animate(this.newElement,
    {
      translateX: ['-0.1em', '0.1em']
    },
    {
      loop: 3,
      duration: 75,
    }
  );
}
