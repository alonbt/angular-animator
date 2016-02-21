'use strict';

describe('Service: animatorClass', function () {

  var animatorState, animatorClassName, animatorStatesMap;

  // load the service's module
  beforeEach(module('angularAnimator'));

  // instantiate service
  var animatorClass, element, className;
  beforeEach(inject(function (_animatorClass_, _animatorStatesMap_, _animatorState_, _animatorClassName_) {
    animatorState = _animatorState_;

    animatorStatesMap = _animatorStatesMap_;
    spyOnAnimatorState();

    animatorClassName = _animatorClassName_;
    spyOnAnimatorClassName();

    animatorClass = _animatorClass_;
  }));

  beforeEach(function () {
    className = 'my-class';
    element = angular.element('<div></div>');
    animatorClass.init(element, className);
  });

  it('should add class with state', function () {
    expect(element).toHaveClass('class-state');
  });

  describe('when add/remove between-classes', function () {
    it('should add and remove between-classes', function () {
      animatorClass.addStateBetween();
      expect(element).toHaveClass('class-between');
      expect(element).toHaveClass('class-between-state');

      animatorClass.removeStateBetween();
      expect(element).not.toHaveClass('class-between');
      expect(element).not.toHaveClass('class-between-state');
    });
  });

  describe('when add/remove state classes', function () {
    it('should add and remove state class', function () {
      animatorClass.addState();
      expect(element).toHaveClass('class-state');
    });

    it('should remove the opposite state class', function () {
      element.addClass('class-opposite-state');
      animatorClass.removeOppositeState();
      expect(element).not.toHaveClass('class-opposite-state');
    });
  });

  function spyOnAnimatorState() {
    spyOn(animatorState, 'get').and.returnValue(animatorStatesMap.OUT);
    spyOn(animatorState, 'getOpposite').and.returnValue(animatorStatesMap.IN);
  }

  function spyOnAnimatorClassName() {
    spyOn(animatorClassName, 'getBetween').and.returnValue('class-between');
    spyOn(animatorClassName, 'getBetweenState').and.returnValue('class-between-state');
    spyOn(animatorClassName, 'getState').and.returnValue('class-state');
    spyOn(animatorClassName, 'getOppositeState').and.returnValue('class-opposite-state');
  }


});
