import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  saveModelTask: task(function *() {
    return yield this.get('model.newUser').save();
  }),
});
