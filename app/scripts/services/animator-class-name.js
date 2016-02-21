'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorClassName
 * @description
 * # animatorClassName
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorClassName', function (animatorState) {
    var className;
    return {
      init: function (_className) {
        className = _className || 'animator';
      },
      getBetween: function() {
        return className + '-between';
      },
      getBetweenState: function () {
        return this.getBetween() + '-' + animatorState.get();
      },
      getBetweenOppositeState: function () {
        return this.getBetween() + '-' + animatorState.getOpposite();
      },
      getState: function () {
        return className + '-' + animatorState.get();
      },
      getOppositeState: function () {
        return className + '-' + animatorState.getOpposite();
      }
    };
  });
