'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorClass
 * @description
 * # animatorClass
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorClass', function (animatorStatesMap, animatorState, animatorClassName) {

    var element;

    return {
      init: function (_element) {
        element = _element;
        this.addState();
      },
      addStateBetween: function () {
        element.addClass(animatorClassName.getBetween());
        element.addClass(animatorClassName.getBetweenState());
      },
      removeStateBetween: function () {
        element.removeClass(animatorClassName.getBetween());
        element.removeClass(animatorClassName.getBetweenState());
      },
      addState: function () {
        element.addClass(animatorClassName.getState());
      },
      removeOppositeState: function () {
        element.removeClass(animatorClassName.getOppositeState());
      }
    };
  });
