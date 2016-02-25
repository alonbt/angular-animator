'use strict';

angular.module('angularAnimator').run(function ($timeout, animatorSequenceManager) {
  angular.element.prototype.addAnimatorClassSequence = function () {
    animatorSequenceManager.runInSequence(this);
  };
});
