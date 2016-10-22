import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';

const {
  getOwner,
  run
} = Ember;

const _wait = () =>{
  return new Ember.RSVP.Promise(resolve =>{
    run.later(() =>{
      resolve();
    }, 1e10);
  });
};

const setupObject = (context, obj, options) => {
  return obj.create(getOwner(context).ownerInjection(), options);
};

const {
  isVisible,
  fillable,
  triggerable
} = PageObject;

const page = PageObject.create({
  isShowingErrorMessage: isVisible('.help.is-danger'),
  fillInput: fillable('input'),
  focus: triggerable('focusin', 'p'),
});

moduleForComponent('validated-control', 'Integration | Component | validated control', {
  integration: true,

  beforeEach() {
    page.setContext(this);
  },

  afterEach() {
    page.removeContext();
  }
});

test('it shows validation errors', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  let Validations = buildValidations({
    name: validator('length', {min: 4})
  });

  let validationObject = setupObject(this ,Ember.Object.extend(Validations), {
    name: ''
  });

  this.set('model', validationObject);

  page.render(hbs`
    {{#validated-control
      model=model
      valuePath="name"
    }}
      {{input value=model.name}}
    {{/validated-control}}
  `);

  assert.notOk(page.isShowingErrorMessage, 'doesnt show error message intially');

  page.focus();
  page.fillInput('dog');
  assert.ok(page.isShowingErrorMessage, 'show\'s error message');
  page.fillInput('monkey');
  assert.notOk(page.isShowingErrorMessage, 'hides error message on valid input');
});
