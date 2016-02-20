'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorClassManager
 * @description
 * # animatorClassManager
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorClassManager', function (animatorDuration, $timeout) {

    var element, currentState, className;

    var states = {
      IN: 'in',
      OUT: 'out'
    };

    var DEFAULT_NAME = 'animator';

    function removeBetweenClass(betweenType) {
      element.removeClass(className + '-between');
      element.removeClass(className + '-between-' + betweenType);
    }

    function getOppositeState(state) {
      return state === states.IN ? states.OUT : states.IN;
    }

    function startSequenceTo() {
      element.addClass(className + '-between');
      element.addClass(className + '-between-' + currentState);
    }

    function betweenSequenceTo(callback) {
      $timeout(function () {
        element.addClass(className + '-' + currentState);
        element.removeClass(className + '-' + getOppositeState(currentState));
        callback();
      }, 0);
    }

    function endSequenceTo() {
      $timeout(function () {
        removeBetweenClass(currentState);
      }, animatorDuration.get(element));
    }

    function setParams(_element, state) {
      element = _element;
      currentState = state;
    }

    function setClassName(_className) {
      className = _className ? _className : DEFAULT_NAME;
    }

    return {
      initInState: function(element, _className) {
        setClassName(_className);
        element.addClass(className + '-' + states.IN);
      },
      initOutState: function(element, _className) {
        setClassName(_className);
        element.addClass(className + '-' + states.OUT);
      },
      runInSequence: function(element) {
        setParams(element, states.IN);
        startSequenceTo();
        betweenSequenceTo(function () {
          endSequenceTo();
        });
      },
      runOutSequence: function(element) {
        setParams(element, states.OUT);
        startSequenceTo();
        betweenSequenceTo(function () {
          endSequenceTo();
        });
      }
    };
  });
