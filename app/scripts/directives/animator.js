'use strict';

/**
 * @ngdoc directive
 * @name angularAnimatorApp.directive:animator
 * @description
 * # animator
 */
angular.module('angularAnimator')
  .directive('animator', function (animatorSequence, animatorStatesMap) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        animatorSequence.init(animatorStatesMap.OUT, element, 'my-class');
        scope.$watch(attrs.animator, function (newValue, oldValue) {
          if (!newValue && !oldValue) {
            return;
          }
          animatorSequence.run(newValue ? animatorStatesMap.IN : animatorStatesMap.OUT, element);
        });
      }
    };
  });
