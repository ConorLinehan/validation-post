import {
  create,
  visitable,
  fillable,
  value,
  isVisible,
  selectable,
  is,
  clickable
} from 'ember-cli-page-object';

const form = {
  name: {
    scope: '.name',
    fill: fillable('input'),
    value: value('input'),
    isError: isVisible('span.is-danger')
  },

  email: {
    scope: '.email',
    fill: fillable('input'),
    value: value('input'),
    isError: isVisible('span.is-danger')
  },

  address: {
    scope: '.address',
    value: value('select'),
    select: selectable('select'),
    isError: isVisible('span.is-danger')
  },

  palindrome: {
    scope: '.palindrome',
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