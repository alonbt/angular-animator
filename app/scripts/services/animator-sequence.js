'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorSequence
 * @description
 * # animatorSequence
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorSequence', function (animatorDuration, animatorStatesMap, animatorClass, $timeout, animatorState, animatorClassName) {

    var state;

    function startSequence() {
      animatorClass.addStateBetween(state);
    }

    function betweenSequence(callback) {
      $timeout(function () {
        animatorClass.addState(state);
        animatorClass.removeOppositeState(state);
        callback();
      }, 0);
    }

    function endSequence() {
      $timeout(function () {
        animatorClass.removeStateBetween(state);
      }, animatorDuration.get());
    }

    function sequence() {
      startSequence();
      betweenSequence(function () {
        endSequence();
      });
    }

    function setState(_state) {
      state = _state;
    }

    return {
      init: function(_state, element, className) {
        setState(_state);
        animatorState.set(_state);
        animatorDuration.init(element);
        animatorClassName.init(className);
        animatorClass.init(element);
      },
      run: function(_state) {
        setState(_state);
        animatorState.set(_state);
        sequence();
      }
    };
  });
