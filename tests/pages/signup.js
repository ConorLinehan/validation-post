import {
  create,
  visitable,
  fillable,
  value,
  isVisible,
  is,
  clickable,
  triggerable
} from 'ember-cli-page-object';

import {
  clickTrigger,
  nativeMouseUp
} from 'validation-post/tests/helpers/ember-power-select';

const form = {
  name: {
    scope: '.name',
    fill: fillable('input'),
    value: value('input'),
    focus: triggerable('focusin'),
    isError: isVisible('span.is-danger')
  },

  address: {
    scope: '.address',
    value: value('select'),
    focus: triggerable('focusin'),
    select(index) {
      clickTrigger();
      nativeMouseUp(`.ember-power-select-option:eq(${index})`);
    },
    isError: isVisible('span.is-danger')
  },

  palindrome: {
    focus: triggerable('focusin'),
    scope: '.palindrome',
    fill: fillable('input'),
    value: value('input'),
    isError: isVisible('span.is-danger')
  },

  email: {
    scope: '.email',
    focus: triggerable('focusin'),
    fill: fillable('input'),
    value: value('input'),
    isError: isVisible('span.is-danger')
  },

  submit: {
    scope: '.submit',
    submit: clickable('button'),
    isDisabled: is('disabled', 'button')
  }
};

export { form };

export default create({
  visit: visitable('/')
});
