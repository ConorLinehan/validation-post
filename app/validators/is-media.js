import BaseValidator from 'ember-cp-validations/validators/base';
import {
  isMovieTask, isSongTask, isBookTask, isTVShowTask
} from 'validation-post/utils/search-tasks';
import {
  task, timeout, taskGroup
 } from 'ember-concurrency';
import Ember from 'ember';

const {
  isBlank,
  inject: { service },
  RSVP: { race },
  computed
} = Ember;

const IsMedia = BaseValidator.extend({
  ajax: service(),

  isShowTask: task(function *(term) {
    if (isBlank(term)) {
      return false;
    }

    yield timeout(300);
    let movieTask = this.get('_isMovieTask').perform(term);
    let songTask = this.get('_isSongTask').perform(term);
    let showTask = this.get('_isTVShowTask').perform(term);
    let bookTask = this.get('_isBookTask').perform(term);

    let tasks = [movieTask, showTask, bookTask, songTask];

    while (tasks.length > 0) {
      let isPassed = yield race(tasks);
      if (isPassed) {
        return true;
      }
      tasks = tasks.filter(t => !t.get('isFinished'));
    }
    return false;
  }).restartable(),

  queryGroup: taskGroup().enqueue().maxConcurrency(2),

  _isMovieTask: isMovieTask.group('queryGroup'),
  _isTVShowTask: isTVShowTask.group('queryGroup'),
  _isBookTask: isBookTask.group('queryGroup'),
  _isSongTask: isSongTask.group('queryGroup'),

  _cancelQueryTasks() {
    this.get('_isMovieTask').cancelAll();
    this.get('_isTVShowTask').cancelAll();
    this.get('_isBookTask').cancelAll();
    this.get('_isSongTask').cancelAll();
  },

  isValidating: computed.readOnly('isShowTask.isRunning'),

  validate(value) {
    // Cancel Running Query tasks
    this._cancelQueryTasks();

    return this.get('isShowTask').perform(value)
    .then(isShow =>{
      if (!isShow) {
        return "Must be a valid piece of entertainment";
      } else {
        return true;
      }
    })
    .catch((e) =>{
      if (e.name !== 'TaskCancelation') {
        return 'Error Validating';
      }
    });
  }
});

IsMedia.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * [
   * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
   * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
   * ]
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default IsMedia;
