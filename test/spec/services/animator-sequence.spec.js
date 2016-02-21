'use strict';

describe('Service: animatorSequence', function () {
  // load the service's module
  var element, animationTime, animatorClass, animatorStatesMap;
  var className;
  beforeEach(module('angularAnimator'));


  // instantiate service
  var animatorSequence;
  beforeEach(inject(function (_animatorSequence_) {
    animatorSequence = _animatorSequence_;
  }));

  beforeEach(inject(function(animatorDuration, _animatorStatesMap_, animatorState, _animatorClass_) {
    animatorStatesMap = _animatorStatesMap_
    animationTime = 1000;
    animatorClass = _animatorClass_;
    spyOn(animatorDuration, 'get').and.returnValue(animationTime);
    spyOn(animatorDuration, 'init');
    spyOn(animatorState, 'set');
    spyOn(animatorState, 'getInProgress').and.returnValue(undefined);
  }));

  it('should do something', function () {
    expect(!!animatorSequence).toBe(true);
  });

  describe('init with OUT', function () {

    beforeEach(function () {
      preInit();
      animatorSequence.init(animatorStatesMap.OUT, element, className);
    });

    it('should init animatorClass', inject(function () {
      expect(animatorClass.init).toHaveBeenCalledWith(element);
    }));

    it('should init animatorClassName', inject(function (animatorClassName) {
      expect(animatorClassName.init).toHaveBeenCalledWith(className);
    }));

    it('should set animatorState', inject(function (animatorState) {
      expect(animatorState.set).toHaveBeenCalledWith(animatorStatesMap.OUT);
    }));

    it('should init animatorDuration with element', inject(function (animatorDuration) {
      expect(animatorDuration.init).toHaveBeenCalledWith(element);
    }));

    describe('run IN sequence', function () {
      beforeEach(inject(function (animatorState) {
        animatorState.set.calls.reset();
        animatorSequence.run(animatorStatesMap.IN);
      }));

      it('should set animatorState', inject(function (animatorState) {
        expect(animatorState.set).toHaveBeenCalledWith(animatorStatesMap.IN);
      }));

      describe('start sequence', function () {

        it('should set state', inject(function (animatorState) {
          expect(animatorState.set).toHaveBeenCalledWith(animatorStatesMap.IN);
        }));

        it('should add start sequence classes ', function () {
          expect(animatorClass.addStateBetween).toHaveBeenCalledWith();
        });

        describe('when rerun OUT sequence', function () {
          beforeEach(inject(function (animatorState) {
            animatorClass.addStateBetween.calls.reset();
            animatorState.set.calls.reset();
            animatorSequence.run(animatorStatesMap.OUT);
          }));

        });

      });

      describe('between sequence', function () {
         beforeEach(inject(function ($timeout) {
           $timeout.flush(0);
         }));

        it('should add between sequence classes ', inject(function (animatorDuration) {
          expect(animatorClass.addState).toHaveBeenCalledWith();
          expect(animatorClass.removeOppositeState).toHaveBeenCalledWith();
          expect(animatorDuration.get).toHaveBeenCalledWith();
        }));
      });

      describe('end sequence', function () {
        beforeEach(inject(function ($timeout) {
          $timeout.flush(0);
          $timeout.flush(animationTime);
        }));

        it('should add end sequence classes', function () {
          expect(animatorClass.removeStateBetween).toHaveBeenCalledWith();
        });
      });
    });

    describe('rerun OUT when already OUT inProgress', function () {
      beforeEach(inject(function (animatorState) {
        animatorState.set.calls.reset();
        animatorState.getInProgress.and.returnValue(animatorStatesMap.OUT);
        animatorSequence.run(animatorStatesMap.OUT);
      }));

      it('should not set state', inject(function (animatorState) {
        expect(animatorState.set).not.toHaveBeenCalled();
      }));

      it('should not addStateBetween', inject(function () {
        expect(animatorClass.addStateBetween).not.toHaveBeenCalled();
      }));
    });

    describe('rerun IN when already OUT inProgress', function () {
      beforeEach(inject(function (animatorState) {
        animatorState.set.calls.reset();
        animatorClass.removeStateBetween.and.callFake(function () {
          expect(animatorState.set.calls.count()).toBe(0);
        });
        animatorState.getInProgress.and.returnValue(animatorStatesMap.OUT);
        animatorSequence.run(animatorStatesMap.IN);
      }));

      it('should set IN state', inject(function (animatorState) {
        expect(animatorState.set).toHaveBeenCalledWith(animatorStatesMap.IN);
      }));

      it('should removeStateBetween before new state has been set', inject(function () {
        expect(animatorClass.removeStateBetween).toHaveBeenCalled();
      }));
    });
  });

  it('should not init animatorClass before animatorClassName', inject(function (animatorClass, animatorClassName) {
    preInit();
    animatorClassName.init.and.callFake(function () {
      expect(animatorClass.init.calls.count()).toBe(0);
    });
    animatorSequence.init(animatorStatesMap.OUT, element, className);
  }));

  function preInit() {
    inject(function (animatorClass, animatorClassName) {
      element = angular.element('<div></div>');
      className = 'new-class-name';
      spyOnAnimatorClass(animatorClass);
      spyOn(animatorClassName, 'init');
    });
  }

  function spyOnAnimatorClass(animatorClass) {
    spyOn(animatorClass, 'init');
    spyOn(animatorClass, 'addStateBetween');
    spyOn(animatorClass, 'removeStateBetween');
    spyOn(animatorClass, 'addState');
    spyOn(animatorClass, 'removeOppositeState');
  }
});
