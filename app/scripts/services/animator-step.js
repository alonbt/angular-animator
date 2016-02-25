'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorStep
 * @description
 * # animatorStep
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorStep', function (animatorClass) {
    return {
      prepare: function () {
        animatorClass.addBetween();
      },
      start: function () {
        animatorClass.switchState();
      },
      end: function () {
        animatorClass.removeBetween();
      },
      revertStart: function () {
        animatorClass.switchState();
        animatorClass.switchBetweenState();
      }
    }
  });
