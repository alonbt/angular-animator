'use strict';

angular.module('angularAnimator').run(function ($timeout) {
  angular.element.prototype.addAnimatorClass = function () {
    var element = this;
    if(this.css('transition-duration')) {
      element.addClass('animator-between');
      element.addClass('animator-between-in');
      $timeout(function () {
        element.addClass('animator-in');
      }, 0);
    } else {
      element.addClass('animator-in');
    }
  };
});
