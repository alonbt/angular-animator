'use strict';

angular.module('angularAnimator').run(function ($timeout, animatorClassManager) {
  angular.element.prototype.addAnimatorClassSequence = function () {
    animatorClassManager.runInSequence(this);
  };
});
