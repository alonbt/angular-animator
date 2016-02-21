'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorState
 * @description
 * # animatorState
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorState', function (animatorStatesMap) {
    var state = animatorStatesMap.OUT;
    var inProgress;

    function setInProgress(_inProgress) {
      inProgress = _inProgress;
    }

    return {
      set: function (_state, args) {
        var args = args || {};
        state = _state;
        if (args.inProgress) {
          setInProgress(state);
        }
      },
      get: function () {
        return state;
      },
      getInProgress: function () {
        return inProgress;
      },
      clearInProgress: function () {
        setInProgress();
      },
      getOpposite: function() {
        return state === animatorStatesMap.IN ? animatorStatesMap.OUT : animatorStatesMap.IN;
      }
    };
  });
