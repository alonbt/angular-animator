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
      animatorClass.addBetween();
      expect(element).toHaveClass('class-between');
      expect(element).toHaveClass('class-between-state');

      animatorClass.removeBetween();
      expect(element).not.toHaveClass('class-between');
      expect(element).not.toHaveClass('class-between-state');
    });
  });

  describe('when switch state', function () {

    it('should add the state and remove the opposite state', function () {
      element.addClass('class-opposite-state');
      animatorClass.switchState();
      expect(element).toHaveClass('class-state');
      expect(element).not.toHaveClass('class-opposite-state');

    });
  });

  describe('switch between state', function () {
    it('should add the state and remove the opposite between state', function () {
      element.addClass('class-between-opposite-state');
      animatorClass.switchBetweenState();
      expect(element).toHaveClass('class-between-state');
      expect(element).not.toHaveClass('class-between-opposite-state');

    });
  });

  function spyOnAnimatorState() {
    spyOn(animatorState, 'get').and.returnValue(animatorStatesMap.OUT);
    spyOn(animatorState, 'getOpposite').and.returnValue(animatorStatesMap.IN);
  }

  function spyOnAnimatorClassName() {
    spyOn(animatorClassName, 'getBetween').and.returnValue('class-between');
    spyOn(animatorClassName, 'getBetweenState').and.returnValue('class-between-state');
    spyOn(animatorClassName, 'getBetweenOppositeState').and.returnValue('class-between-opposite-state');
    spyOn(animatorClassName, 'getState').and.returnValue('class-state');
    spyOn(animatorClassName, 'getOppositeState').and.returnValue('class-opposite-state');
  }


});
