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

    function AnimatorSequence () {

      var deferArray = [];
      var nextDeferred;
      var stop = false;

      var defer = $q.defer();
      var promise = defer.promise;

      function getTime(time) {
        return typeof time === 'function' ? time() : time;
      }

      function delay(time) {
        return function () {
          var defer = $q.defer();
          $timeout(function() {
            defer.resolve();
          }, time);
          return defer.promise;
        }
      }

      function getDelayPromise (time) {
        return promise.then(delay(getTime(time)));
      }

      function getCallbackPromise (callback) {
        return promise.then(function () {
          if (!stop) {
            callback();
          }
          return getNextPromise();
        });
      }

      function getNextPromise() {
        return nextDeferred ? nextDeferred.promise : undefined;
      }

      function createStepPromise(callback, time) {
        deferArray.push(defer);
        if (time) {
          promise = getDelayPromise(time);
        }
        promise = getCallbackPromise(callback);
        defer = $q.defer();
      }

      this.step = function (callback, time) {
        createStepPromise(callback, time);
        return this;
      };

      this.run = function () {
        while (deferArray.length) {
          this.next();
        }
        return this;
      };

      this.next = function () {
        if (deferArray.length) {
          var currentlyDeffered = deferArray.shift();
          nextDeferred = deferArray[0];
          currentlyDeffered.resolve();
        }
        return this;
      };

      this.stop = function () {
        stop = true;
      };
    };

    return AnimatorSequence;

  });


