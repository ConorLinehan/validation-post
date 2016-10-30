import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import { animate } from 'liquid-fire';
import {
  oneSecond,
  oneHundredms,
  twentyFivems
} from 'validation-post/utils/common-times';

const {
  computed,
  isBlank
} = Ember;

export default Ember.Component.extend({
  stateAnimation,

  classNames: ['task-button', 'button', 'is-primary'],
  classNameBindings: [
    'taskInstance.isRunning:is-loading',
    'isError:is-danger',
    'isSuccess:is-success',
    'isDisabled:disabled:'
  ],

  click() {
    this.get('_click').perform();
  },

  state: computed('taskInstance', 'taskInstance.isRunning', {
    get() {
      let task = this.get('taskInstance');
      if(isBlank(task)) {
        return 'normal';
      } else {
        if (task.get('isRunning')) {
          return 'normal';
        }
        return (task.get('error')) ? 'error' : 'success';
      }
    }
  }).readOnly(),

  isError: computed.equal('state', 'error'),
  isNormal: computed.equal('state', 'normal'),
  isSuccess: computed.equal('state', 'success'),
  isLoading: computed.readOnly('taskInstance.isRunning'),
  isDisabled: computed.bool('taskInstance'),

  _click: task(function *() {
    if (this.get('taskInstance.isRunning') || this.get('isSuccess') || this.get('isError')) {
      return;
    }

    let taskInstance = this.get('action')();
    this.set('taskInstance', taskInstance);
    try {
      yield taskInstance;
    } catch (e) {
    } finally {
      yield timeout(oneSecond);
      this.set('taskInstance', null);
    }

  })
});

function stateAnimation() {
  this.oldElement.css({display: 'none'});

  let state = this.newValue;

  if (state === 'normal') {
    return animate(this.newElement, {
      translateX: ['0', '-.5em']
    });
  } else if (state ==='error') {
    return animate(this.newElement, {
      rotateZ: ['-10deg', '10deg']
    }, {
      loop: 3,
      duration: oneHundredms
    }).then(() =>{
      return animate(this.newElement, {
        rotateZ: '0deg'
      }, { duration: twentyFivems });
    });
  } else {
    return animate(this.newElement, {
      scale: [1.2, 0],
      translateY: '1px'
    }, { duration:oneHundredms });
  }
}
