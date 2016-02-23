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
      var previousDeffered;
      var defferedArray = [];

      function resolve(deffered) {
        if (!stop) {
          deffered.resolve();
        }
      }

      function createAsyncFunc(callback, time, deffered) {
        return function () {
          deffered.promise.then(callback);
          $timeout(function () {
            resolve(deffered);
          }, getTime(time));
          return deffered.promise;
        }
      }

      function createSyncFunc(callback, deffered) {
        return function () {
          deffered.promise.then(callback);
          resolve(deffered);
          return  deffered.promise;
        }
      }

      function createPromise (callback, time) {
        var deffered = $q.defer();
        defferedArray.push(previousDeffered);
        previousDeffered = deffered;
        return time ? createAsyncFunc(callback, time, deffered) : createSyncFunc(callback, deffered);
      }

      var deffered = $q.defer();
      previousDeffered = deffered;
      var promise = deffered.promise;


      this.step = function (callback, time) {
        callback = createPromise(callback, time);
        promise = promise.then(callback);
        return this;
      };

      this.run = function () {
        console.log(defferedArray.length);
        resolve(deffered);

        //while (defferedArray.length && !stop) {
        //  resolve(defferedArray.shift());
        //}

        return this;
      };

      this.next = function () {
        resolve(defferedArray.shift());
        return this;
      };

      this.stop = function () {
        stop = true;
      };
    }

    return AnimatorSequence;

  });


