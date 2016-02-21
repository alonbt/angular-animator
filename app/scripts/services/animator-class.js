'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorClass
 * @description
 * # animatorClass
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorClass', function (animatorStates) {
    var element, className;

    function getOppositeState(state) {
      return state === animatorStates.IN ? animatorStates.OUT : animatorStates.IN;
    }

    return {
      init: function (_element, _className) {
        element = _element;
        className = _className;
      },
      addBetweenClassesWithState: function (state) {
        element.addClass(className + '-between');
        element.addClass(className + '-between-' + state);
      },
      removeBetweenClassesWithState: function (state) {
        element.removeClass(className + '-between');
        element.removeClass(className + '-between-' + state);
      },
      addClassWithState: function (state) {
        element.addClass(className + '-' + state);
      },
      removeClassWithOppositeState: function (state) {
        element.removeClass(className + '-' + getOppositeState(state));
      }
    };
  });
