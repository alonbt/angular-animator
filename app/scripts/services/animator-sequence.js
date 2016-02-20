'use strict';

/**
 * @ngdoc service
 * @name angularAnimatorApp.animatorSequence
 * @description
 * # animatorSequence
 * Service in the angularAnimatorApp.
 */
angular.module('angularAnimator')
  .service('animatorSequence', function (animatorDuration, $timeout) {

    var element, currentState, className;

    var states = {
      IN: 'in',
      OUT: 'out'
    };

    var DEFAULT_NAME = 'animator';

    function removeBetweenClasses() {
      element.removeClass(className + '-between');
      element.removeClass(className + '-between-' + currentState);
    }

    function addBetweenClasses() {
      element.addClass(className + '-between');
      element.addClass(className + '-between-' + currentState);
    }

    function addClassWithState() {
      element.addClass(className + '-' + currentState);
    }

    function removeClassWithOppositeState() {
      element.removeClass(className + '-' + getOppositeState(currentState));
    }

    function getOppositeState(state) {
      return state === states.IN ? states.OUT : states.IN;
    }


    function startSequence() {
      addBetweenClasses();
    }

    function betweenSequence(callback) {
      $timeout(function () {
        addClassWithState();
        removeClassWithOppositeState();
        callback();
      }, 0);
    }

    function endSequence() {
      $timeout(function () {
        removeBetweenClasses();
      }, animatorDuration.get(element));
    }

    function sequence() {
      startSequence();
      betweenSequence(function () {
        endSequence();
      });
    }

    function setParams(isInState, _element, _className) {
      setState(isInState);
      setClassName(_className);
      setElement(_element);
    }

    function setClassName(_className) {
      className = _className ? _className : DEFAULT_NAME;
    }

    function setState(isInState) {
      currentState = isInState ? states.IN : states.OUT;
    }

    function setElement(_element) {
      element = _element;
    }

    return {
      initState: function(isInState, _element, _className) {
        setParams(isInState, _element, _className);
        addClassWithState();
      },
      run: function(isInState) {
        setState(isInState);
        sequence();
      }
    };
  });
