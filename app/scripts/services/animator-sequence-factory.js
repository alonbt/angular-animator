'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorSequenceBuilder
 * @description
 * # animatorSequenceBuilder
 * Factory in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .factory('AnimatorSequence', function ($timeout, animatorDuration, $q) {

    function getTime(time) {
      return typeof time === 'function' ? time() : time;

    }

    function AnimatorSequence () {

      var stop = false;

      function createTimeoutFunction (callback, time) {
        return function () {

          var deffered2 = $q.defer();
          var promise2 = deffered2.promise;
          promise2.then(callback);
          $timeout(function () {
            !stop ? deffered2.resolve() : deffered2.reject();
          }, time);
          return deffered2.promise;
        }
      }

      var deffered = $q.defer();
      var promise = deffered.promise;
      this.step = function (callback, time) {
        if (time) {
          callback = time ? createTimeoutFunction(callback, getTime(time)) : callback;
        }
        promise = promise.then(callback);
        return this;
      };

      this.run = function () {
        if (!stop) {
          deffered.resolve();
        }
        return this;
      }

      this.stop = function () {
        stop = true;
      };
    }

    return AnimatorSequence;

  });


