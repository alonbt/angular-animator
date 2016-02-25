'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorSequenceManager
 * @description
 * # animatorSequence
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorSequenceManager', function (animatorDuration, animatorStatesMap, animatorClass, $timeout, animatorState, animatorClassName) {

    var sequenceAlreadyRunning = {
      start: false,
      between: false
    };

    var timeoutMap = {};

    function sequenceFlow() {
      uglySequence.start();
      uglySequence.betweenTimeout(function () {
        uglySequence.between(function () {
          uglySequence.end();
        });
      });

      //mainSequence.start(mainSequenceConfig.start).between(mainSequenceConfig.between).end(mainSequenceConfig.end);

    }

    var something = 0;
    function doSomething() {
      console.log(something);
      something++;
    }


    var mainSequenceConfig = {
      start: function () {
        if (sequenceAlreadyRunning.between) {
          SecondSequenceFromBetween.start();
        } else if (sequenceAlreadyRunning.start) {
          SecondSequenceFromStart.start();
        } else {
          firstSequence.start();
        }
      },
      between: function () {
        /* ITS HERE THE BUG !*/
        if (sequenceAlreadyRunning.start) {
          if (sequenceAlreadyRunning.between) {
            SecondSequenceFromBetween.between(firstSequence.end);
          } else {
            firstSequence.between()
          }
        }
      },
      end: function () {
        firstSequence.end();
        clearSequenceMap();
      }
    };

    var uglySequence = {
      start: function () {
        if (sequenceAlreadyRunning.between) {
          SecondSequenceFromBetween.start();
        } else if (sequenceAlreadyRunning.start) {
          SecondSequenceFromStart.start();
        } else {
          uglyFirstSequence.start();
        }
      },
      betweenTimeout: function (betweenCallback) {
        timeoutMap.between = $timeout(function () {
          betweenCallback()
        }, 0);
      },
      between: function (endCallback) {
        /* ITS HERE THE BUG !*/
        if (sequenceAlreadyRunning.start) {
            if (sequenceAlreadyRunning.between) {
            SecondSequenceFromBetween.between(uglyFirstSequence.end);
          } else {
            uglyFirstSequence.between(endCallback)
          }
        }

      },
      end: function () {
        uglyFirstSequence.end(clearSequenceMap);
      }
    };

    // In case second sequence start after START of first sequence
    var SecondSequenceFromStart = {
      start: function () {
        $timeout.cancel(timeoutMap.between);
        animatorClass.switchBetweenState();
        sequenceAlreadyRunning.start = false;
      }
    };

    // In case second sequence start after BETWEEN of first sequence
    var SecondSequenceFromBetween = {
      start: function () {
        $timeout.cancel(timeoutMap.end);
        animatorClass.switchBetweenState();
      },
      between: function (endCallback) {
        animatorClass.switchState();
        endCallback(clearSequenceMap);
      }
    };

    var firstSequenceConfig = {
      start: function () {
        animatorClass.addBetween();
        sequenceAlreadyRunning.start = true;
      },
      between: function () {
        animatorClass.switchState();
        sequenceAlreadyRunning.between = true;
        uglyFirstSequence.end();
      },
      end: function () {
        timeoutMap.end = $timeout(function () {
          animatorClass.removeBetween();
          clearSequenceMap();
        }, animatorDuration.get());
      }
    };

    var uglyFirstSequence = {
      start: function () {
        animatorClass.addBetween();
        sequenceAlreadyRunning.start = true;
      },
      between: function () {
        animatorClass.switchState();
        sequenceAlreadyRunning.between = true;
        uglyFirstSequence.end();
      },
      end: function () {
        timeoutMap.end = $timeout(function () {
          animatorClass.removeBetween();
          clearSequenceMap();
        }, animatorDuration.get());
      }
    };

    function initServices(element, className) {
      animatorDuration.init(element);
      animatorClassName.init(className);
      animatorClass.init(element);
    }

    function clearSequenceMap() {
      sequenceAlreadyRunning.start = false;
      sequenceAlreadyRunning.between = false;
    }

    function isStateChange(_state) {
      return _state !== animatorState.get();
    }


    var SequenceBuilder = function () {
      var endCallback, postEndCallback;
      return {
        start: function(startCallback) {
          startCallback();
          return {
            between: function (betweenCallback) {
              timeoutMap.between = $timeout(function () {
                betweenCallback();
                timeoutMap.end = $timeout(function () {
                  endCallback();
                  //postEndCallback();
                },animatorDuration.get());
              }, 0);
              return {
                end: function (_endCallback) {
                  endCallback = _endCallback;
                  return {
                    postEnd: function (_postEndCallback) {
                      postEndCallback = _postEndCallback;
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    var mainSequence = new SequenceBuilder();
    var firstSequence = new SequenceBuilder();

    return {
      init: function(_state, element, className) {
        animatorState.set(_state);
        initServices(element, className)

      },
      run: function(_state) {

        if (!isStateChange(_state)) {
          return;
        }

        animatorState.set(_state);
        sequenceFlow();
      }
    };
  });
