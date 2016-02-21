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
    spyOn(animatorState, 'get');
    spyOn(animatorState, 'getInProgress').and.returnValue(undefined);
    spyOn(animatorState, 'clearInProgress');
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
        run(animatorStatesMap.IN);
      }));

      it('should set animatorState', inject(function (animatorState) {
        expect(animatorState.set).toHaveBeenCalledWith(animatorStatesMap.IN);
      }));

      it('should not clearInProgress', inject(function (animatorState) {
        expect(animatorState.clearInProgress).not.toHaveBeenCalled();
      }));

      describe('start sequence', function () {

        it('should add start sequence classes ', function () {
          expect(animatorClass.addBetween).toHaveBeenCalledWith();
        });

        it('should not call switchBetweenState', function () {
          expect(animatorClass.switchBetweenState).not.toHaveBeenCalled();
        });

        describe('when rerun OUT sequence', function () {
          beforeEach(inject(function (animatorState) {
            animatorClass.addBetween.calls.reset();
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
          expect(animatorClass.switchState).toHaveBeenCalledWith();
          expect(animatorDuration.get).toHaveBeenCalledWith();
        }));
      });

      describe('end sequence', function () {
        beforeEach(inject(function ($timeout) {
          $timeout.flush(0);
          $timeout.flush(animationTime);
        }));

        it('should add end sequence classes', function () {
          expect(animatorClass.removeBetween).toHaveBeenCalledWith();
        });

      });
    });

    describe('rerun OUT when already OUT inProgress', function () {
      beforeEach(inject(function (animatorState) {
        //animatorState.getInProgress.and.returnValue(animatorStatesMap.OUT);
        run(animatorStatesMap.OUT);
        animatorState.set.calls.reset();
        animatorClass.addBetween.calls.reset();
        setState(animatorStatesMap.OUT);
        animatorSequence.run(animatorStatesMap.OUT);
      }));

      it('should not set state', inject(function (animatorState) {
        expect(animatorState.set).not.toHaveBeenCalled();
      }));

      it('should not addBetween', inject(function () {
        expect(animatorClass.addBetween).not.toHaveBeenCalled();
      }));

    });

    describe('rerun IN when already OUT inProgress', function () {
      beforeEach(inject(function (animatorState) {
        animatorState.set.calls.reset();

        run(animatorStatesMap.OUT);
        animatorClass.switchBetweenState.calls.reset();
        animatorClass.addBetween.calls.reset();
        run(animatorStatesMap.IN);
      }));

      it('should removeBetween before new state has been set', inject(function () {
        expect(animatorClass.addBetween).not.toHaveBeenCalled();
      }));

      it('should removeBetween before new state has been set', inject(function () {
        expect(animatorClass.switchBetweenState).toHaveBeenCalled();
      }));

      it('should not run animatorClass.switchState', inject(function () {
        animatorClass.switchState.calls.reset();
        flushToBetweenSequense();
        expect(animatorClass.switchState).not.toHaveBeenCalled();
        flushToEndSequence();
        expect(animatorClass.removeBetween).not.toHaveBeenCalledWith();

      }));

      describe('when animation ends', function () {
        beforeEach(function () {
          flushToBetweenSequense();
          flushToEndSequence();
        });

        it('should addBetween when running again', function () {
          animatorClass.addBetween.calls.reset();
          run(animatorStatesMap.OUT);
          expect(animatorClass.addBetween).toHaveBeenCalledWith();
        });
      });
    });

    describe('rerun OUT when already IN inProgress after first timeout', function () {
      beforeEach(inject(function ($timeout, animatorState) {
        run(animatorStatesMap.IN);
        flushToBetweenSequense();
        //animatorClass.addBetween.calls.reset();
        animatorClass.addBetween.calls.reset();
        run(animatorStatesMap.OUT);
      }));


      it('should not call removeBetween', inject(function () {
        animatorClass.removeBetween.calls.reset();
        flushToEndSequence();
        expect(animatorClass.removeBetween).not.toHaveBeenCalled();
      }));

      it('should call switchBetweenState', inject(function () {
        expect(animatorClass.switchBetweenState).toHaveBeenCalledWith();
      }));

      it('should call switchState', inject(function () {
        animatorClass.switchState.calls.reset();
        flushToBetweenSequense();
        expect(animatorClass.switchState).toHaveBeenCalledWith();
      }));

      describe('when second run finished', function () {
        beforeEach(function () {
          flushToBetweenSequense();
          flushToEndSequence();
        });

        it('should call switchState', inject(function () {
          expect(animatorClass.removeBetween).toHaveBeenCalledWith();
        }));

        it('should addBetween when running again', function () {
          animatorClass.addBetween.calls.reset();
          run(animatorStatesMap.IN);
          expect(animatorClass.addBetween).toHaveBeenCalledWith();
        });

      });

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

  function setState(state) {
    inject(function (animatorState) {
      animatorState.get.and.returnValue(state);
    })
  }

  function run(state) {
    setState(state === animatorStatesMap.IN ? animatorStatesMap.OUT : animatorStatesMap.IN);
    animatorSequence.run(state);
  }

  function flushToBetweenSequense() {
    inject(function ($timeout) {
      $timeout.flush(0);
    });
  }

  function flushToEndSequence() {
    inject(function ($timeout) {
      $timeout.flush(animationTime);
    });
  }

  function spyOnAnimatorClass(animatorClass) {
    spyOn(animatorClass, 'init');
    spyOn(animatorClass, 'addBetween');
    spyOn(animatorClass, 'removeBetween');
    spyOn(animatorClass, 'switchState');
    spyOn(animatorClass, 'switchBetweenState');
  }
});
