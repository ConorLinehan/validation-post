import {
  create,
  visitable,
  fillable,
  value,
  isVisible,
  hasClass,
  clickable,
  triggerable
} from 'ember-cli-page-object';

import {
  clickTrigger,
  nativeMouseUp
} from 'validation-post/tests/helpers/ember-power-select';

export const form = {
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

  media: {
    scope: '.favorite-media',
    focus: triggerable('focusin'),
    fill: fillable('input'),
    isError: isVisible('span.is-danger')
  },

  submit: {
    scope: '.submit',
    submit: clickable('.button'),
    isDisabled: hasClass('disabled', '.button'),
    click: clickable('.button')
  },

  fill({ name, email, addresses, media, palindrome}) {
    this.name.fill(name);
    this.email.fill(email);
    this.palindrome.fill(palindrome);
    this.media.fill(media);
    addresses.forEach(i =>{
      this.address.select(i);
    });
  }
};

export default create({
  visit: visitable('/'),
  form
});
