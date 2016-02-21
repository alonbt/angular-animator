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


    function sequence() {
      startSequence();
      betweenSequence(function () {
        endSequence();
      });
    }

    function startSequence() {
      animatorClass.addStateBetween();
    }

    function stopStartSequence() {
      animatorClass.removeStateBetween();
    }

    function betweenSequence(callback) {
      $timeout(function () {
        animatorClass.addState();
        animatorClass.removeOppositeState();
        callback();
      }, 0);
    }

    function endSequence() {
      $timeout(function () {
        animatorClass.removeStateBetween();
      }, animatorDuration.get());
    }

    function initServices(element, className) {
      animatorDuration.init(element);
      animatorClassName.init(className);
      animatorClass.init(element);
    }

    return {
      init: function(_state, element, className) {
        animatorState.set(_state);
        initServices(element, className)

      },
      run: function(_state) {
        var inProgress = animatorState.getInProgress();
        if (inProgress && inProgress === _state) {
          return;
        }
        if (animatorState.getInProgress()) {
          stopStartSequence();
        }
        animatorState.set(_state);
        sequence();
      }
    };
  });
