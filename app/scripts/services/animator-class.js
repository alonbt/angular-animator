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

    function addState() {
      element.addClass(animatorClassName.getState());
    }

    return {
      init: function (_element) {
        element = _element;
        addState();
      },
      addBetween: function () {
        element.addClass(animatorClassName.getBetween());
        element.addClass(animatorClassName.getBetweenState());
      },
      removeBetween: function () {
        element.removeClass(animatorClassName.getBetween());
        element.removeClass(animatorClassName.getBetweenState());
      },
      switchBetweenState: function () {
        element.addClass(animatorClassName.getBetweenState());
        element.removeClass(animatorClassName.getBetweenOppositeState());
      },
      switchState: function () {
        addState();
        element.removeClass(animatorClassName.getOppositeState());
      }
    };
  });
