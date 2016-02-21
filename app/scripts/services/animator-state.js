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
    return {
      set: function (_state) {
        state = _state;
      },
      get: function () {
        return state;
      },
      getOpposite: function() {
        return state === animatorStatesMap.IN ? animatorStatesMap.OUT : animatorStatesMap.IN;
      }
    };
  });
