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

    var sequenceAlreadyRunning = {
      start: false,
      between: false
    };

    var timeoutMap = {};

    function sequenceFlow() {
      sequence.start();
      if (sequenceAlreadyRunning.start) {
        sequence.betweenTimeout(function () {
          sequence.between(function () {
            sequence.end();
          });
        });
      }
    }

    var sequence = {
      start: function () {
        if (sequenceAlreadyRunning.between) {
          SecondSequenceFromBetween.start();
        } else if (sequenceAlreadyRunning.start) {
          SecondSequenceFromStart.start();
        } else {
          firstSequence.start();
        }
      },
      betweenTimeout: function (betweenCallback) {
        timeoutMap.between = $timeout(function () {
          betweenCallback()
        }, 0);
      },
      between: function (endCallback) {
        if (sequenceAlreadyRunning.between) {
          SecondSequenceFromBetween.between(firstSequence.end);
        } else {
          firstSequence.between(endCallback)
        }
      },
      end: function () {
        firstSequence.end(clearSequenceMap);
      }
    };

    // In case second sequence start after START of first sequence
    var SecondSequenceFromStart = {
      start: function () {
        $timeout.cancel(timeoutMap.between);
        animatorClass.switchBetweenState();
        sequenceAlreadyRunning.start = false;
      }
    };

    // In case second sequence start after BETWEEN of first sequence
    var SecondSequenceFromBetween = {
      start: function () {
        $timeout.cancel(timeoutMap.end);
        animatorClass.switchBetweenState();
      },
      between: function (endCallback) {
        animatorClass.switchState();
        endCallback(clearSequenceMap);
      }
    };

    var firstSequence = {
      start: function () {
        animatorClass.addBetween();
        sequenceAlreadyRunning.start = true;
      },
      between: function (endCallback) {
        animatorClass.switchState();
        sequenceAlreadyRunning.between = true;
        endCallback();
      },
      end: function (postEndcallback) {
        timeoutMap.end = $timeout(function () {
          animatorClass.removeBetween();
          postEndcallback();
        }, animatorDuration.get());
      }
    };

    function initServices(element, className) {
      animatorDuration.init(element);
      animatorClassName.init(className);
      animatorClass.init(element);
    }

    function clearSequenceMap() {
      sequenceAlreadyRunning.start = false;
      sequenceAlreadyRunning.between = false;
    }

    function isStateChange(_state) {
      return _state !== animatorState.get();
    }

    return {
      init: function(_state, element, className) {
        animatorState.set(_state);
        initServices(element, className)

      },
      run: function(_state) {

        if (!isStateChange(_state)) {
          return;
        }

        animatorState.set(_state);
        sequenceFlow();
      }
    };
  });
