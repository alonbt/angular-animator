'use strict';

describe('Service: animatorState', function () {

  // load the service's module
  beforeEach(module('angularAnimator'));

  // instantiate service
  var animatorState, animatorStatesMap;
  beforeEach(inject(function (_animatorState_, _animatorStatesMap_) {
    animatorState = _animatorState_;
    animatorStatesMap = _animatorStatesMap_;
  }));

  it('should do something', function () {
    expect(!!animatorState).toBe(true);
  });

  it('should have get OUT state by default', function () {
    expect(animatorState.get()).toBe(animatorStatesMap.OUT);
  });

  it('should have get OUT state by default', function () {
    expect(animatorState.getInProgress()).toBe(undefined);
  });

  describe('when set IN', function () {

    beforeEach(function () {
      animatorState.set(animatorStatesMap.IN);
    });

    it('should get state', function () {
      expect(animatorState.get()).toBe(animatorStatesMap.IN);
    });

    it('should get opposite state', function () {
      expect(animatorState.getOpposite()).toBe(animatorStatesMap.OUT);
    });
  });

  describe('when setInProgress', function () {
    beforeEach(function () {
      animatorState.set(animatorStatesMap.IN, {inProgress: true});
    });

    it('should get inProgress', function () {
      expect(animatorState.getInProgress()).toBe(animatorStatesMap.IN);
    });

    describe('when clearInProgress', function () {

      beforeEach(function () {
        animatorState.clearInProgress();
      });

      it('should get inProgress', function () {
        expect(animatorState.getInProgress()).toBe(undefined);
      });
    });
  });

});
