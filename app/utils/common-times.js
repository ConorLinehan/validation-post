import Ember from 'ember';

export const oneHundredms = Ember.testing ? 10 : 100;
export const threeHundredms = oneHundredms * 3;
export const oneSecond = oneHundredms * 10;
export const twentyFivems = oneHundredms / 4;
