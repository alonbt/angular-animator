'use strict';

describe('Service: animatorSequence', function () {
  // load the service's module
  var element, IN, OUT;
  beforeEach(module('angularAnimator'));


  // instantiate service
  var animatorSequence;
  beforeEach(inject(function (_animatorSequence_) {
    animatorSequence = _animatorSequence_;
  }));

  beforeEach(inject(function(animatorDuration, animatorStatesMap, animatorState) {
    IN = animatorStatesMap.IN;
    OUT = animatorStatesMap.OUT;
    spyOn(animatorDuration, 'get');
    spyOn(animatorDuration, 'init');
    spyOn(animatorState, 'set');
  }));

  it('should do something', function () {
    expect(!!animatorSequence).toBe(true);
  });

  describe('init with OUT', function () {

    var className;
    beforeEach(inject(function (animatorClass, animatorClassName) {
      element = angular.element('<div></div>');
      className = 'new-class-name';
      spyOnAnimatorClass(animatorClass);
      spyOn(animatorClassName, 'init');
      animatorSequence.init(OUT, element, className);
    }));

    it('should init animatorClass', inject(function (animatorClass) {
      expect(animatorClass.init).toHaveBeenCalledWith(element);
    }));

    it('should init animatorClassName', inject(function (animatorClassName) {
      expect(animatorClassName.init).toHaveBeenCalledWith(className);
    }));

    it('should set animatorState', inject(function (animatorState) {
      expect(animatorState.set).toHaveBeenCalledWith(OUT);
    }));

    it('should init animatorDuration with element', inject(function (animatorDuration) {
      expect(animatorDuration.init).toHaveBeenCalledWith(element);
    }));

    describe('run IN sequence', function () {
      beforeEach(inject(function (animatorState) {
        animatorState.set.calls.reset();
        animatorSequence.run(IN);
      }));

      it('should set animatorState', inject(function (animatorState) {
        expect(animatorState.set).toHaveBeenCalledWith(IN);
      }));

      it('should add classes according to sequence', inject(function (animatorClass, $timeout, animatorDuration) {
        var animationDuration = 1000;
        animatorDuration.get.and.returnValue(animationDuration);
        expect(animatorClass.addStateBetween).toHaveBeenCalledWith(IN);

        $timeout.flush(0);
        expect(animatorClass.addState).toHaveBeenCalledWith(IN);
        expect(animatorClass.removeOppositeState).toHaveBeenCalledWith(IN);
        expect(animatorDuration.get).toHaveBeenCalledWith();

        $timeout.flush(animationDuration);
        expect(animatorClass.removeStateBetween).toHaveBeenCalledWith(IN);

      }));
    });
  });

  function spyOnAnimatorClass(animatorClass) {
    spyOn(animatorClass, 'init');
    spyOn(animatorClass, 'addStateBetween');
    spyOn(animatorClass, 'removeStateBetween');
    spyOn(animatorClass, 'addState');
    spyOn(animatorClass, 'removeOppositeState');
  }
});
