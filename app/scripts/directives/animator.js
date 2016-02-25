'use strict';

/**
 * @ngdoc directive
 * @name angularAnimatorApp.directive:animator
 * @description
 * # animator
 */
angular.module('angularAnimator')
  .directive('animator', function (animatorSequenceManager, animatorStatesMap) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        animatorSequenceManager.init(animatorStatesMap.OUT, element, 'my-class');
        scope.$watch(attrs.animator, function (newValue, oldValue) {
          if (!newValue && !oldValue) {
            return;
          }
          animatorSequenceManager.run(newValue ? animatorStatesMap.IN : animatorStatesMap.OUT, element);
        });
      }
    };
  });
