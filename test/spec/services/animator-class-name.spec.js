'use strict';

describe('Service: animatorClassName', function () {

  var className = 'some-class-name';

  // load the service's module
  beforeEach(module('angularAnimator'));

  // instantiate service
  var animatorClassName;
  beforeEach(inject(function (_animatorClassName_, animatorState) {
    animatorClassName = _animatorClassName_;
    spyOn(animatorState, 'get').and.returnValue('some-state');
    spyOn(animatorState, 'getOpposite').and.returnValue('opposite-state');
  }));

  describe('init with className', function () {
    beforeEach(function () {
      animatorClassName.init(className);
    });

    it('get between class name', function () {
      expect(animatorClassName.getBetween()).toBe('some-class-name-between');
    });

    it('get between state class name', function () {
      expect(animatorClassName.getBetweenState()).toBe('some-class-name-between-some-state');
    });

    it('get class name', function () {
      expect(animatorClassName.getState()).toBe('some-class-name-some-state');
    });

    it('get opposite class name', function () {
      expect(animatorClassName.getOppositeState()).toBe('some-class-name-opposite-state');
    });

    it('get opposite between class name', function () {
      expect(animatorClassName.getBetweenOppositeState()).toBe('some-class-name-between-opposite-state');
    });

  });

  describe('init without className', function () {
    beforeEach(function () {
      animatorClassName.init();
    });

    it('add animator class by default name', function () {
      expect(animatorClassName.getBetween()).toBe('animator-between');
    });

  });

});
