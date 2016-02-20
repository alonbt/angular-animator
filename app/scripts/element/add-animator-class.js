'use strict';

angular.module('angularAnimator').run(function ($timeout, animatorSequence) {
  angular.element.prototype.addAnimatorClassSequence = function () {
    animatorSequence.runInSequence(this);
  };
});
