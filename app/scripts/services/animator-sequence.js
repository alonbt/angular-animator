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

    var sequenceCountMap = {
      start: 0,
      between: 0
    };

    var timeoutMap = {};

    function clearSequenceMap() {
      sequenceCountMap.start = 0;
      sequenceCountMap.between = 0;
    }

    function sequenceFlow() {
      sequence.start();
      sequence.between(function () {
        sequence.end(clearSequenceMap);
      });
    }

    // In case second sequence start after START of first sequence
    var revertStartSequence = {
      start: function () {
        $timeout.cancel(timeoutMap.between);
        animatorClass.switchBetweenState();
      },
      between: clearSequenceMap
    };

    // In case second sequence start after BETWEEN of first sequence
    var revertBetweenSequence = {
      start: function () {
        $timeout.cancel(timeoutMap.end);
        animatorClass.switchBetweenState();
      },
      between: function (endCallback) {
        animatorClass.switchState();
        endCallback(clearSequenceMap);
      }
    };

    function isBetweenAlreadRunning() {
      return sequenceCountMap.between > 0;
    }

    var sequence = {
      start: function () {
        if (isBetweenAlreadRunning()) {
          revertBetweenSequence.start();
        } else if (sequenceCountMap.start > 0) {
          revertStartSequence.start();
        } else {
          animatorClass.addBetween();
        }
        sequenceCountMap.start++;
      },
      between: function (endCallback) {
        timeoutMap.between = $timeout(function () {
          if (isBetweenAlreadRunning()) {
            revertBetweenSequence.between(sequence.end);
          } else if (sequenceCountMap.start > 1) {
            revertStartSequence.between();
          } else {
            animatorClass.switchState();
            sequenceCountMap.between++;
            endCallback();
          }
        }, 0);
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

    return {
      init: function(_state, element, className) {
        animatorState.set(_state);
        initServices(element, className)

      },
      run: function(_state) {

        if (_state === animatorState.get()) {
          return;
        }

        animatorState.set(_state);
        sequenceFlow();
      }
    };
  });
