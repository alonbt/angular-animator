'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorDuration
 * @description
 * # animatorDuration
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorDuration', function () {

    var element;

    function getTimeFromProperty(property) {
      var propertyValue = element.css(property);
      return propertyValue ? parseTimeString(propertyValue) : 0;
    }

    function parseTimeString(timeString) {
      return Number(timeString.slice(0,-1)) * 1000;
    }

    function getDurationAndDelayFromType(propertyType) {
      var duration = getTimeFromProperty(propertyType + '-duration');
      var delay = getTimeFromProperty(propertyType  + '-delay');
      return duration + delay;
    }

    function isTransition() {
      return !!getTimeFromProperty('transition-duration');
    }

    function isAnimation() {
      return !!getTimeFromProperty('animation-duration');
    }

    function isAnimationDurationLonger() {
      return getDurationAndDelayFromType('animation') > getDurationAndDelayFromType('transition');
    }

    function getPropertyType() {
      var propertyType = isTransition() ? 'transition' : 'animation';
      if (isTransition() && isAnimation() && isAnimationDurationLonger()) {
        propertyType = 'animation';
      }
      return (isTransition() || isAnimation()) ? propertyType : undefined;
    }

    function getDuration() {
      return getDurationAndDelayFromType(getPropertyType());
    }

    return {
      init: function (_element) {
        element = _element;
      },
      get: function () {
        return getDuration();
      }
    };
  });
