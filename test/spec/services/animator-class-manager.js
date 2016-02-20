'use strict';

describe('Service: animatorClassManager', function () {

  // load the service's module
  var element;
  beforeEach(module('angularAnimator'));


  // instantiate service
  var animatorClassManager;
  beforeEach(inject(function (_animatorClassManager_) {
    animatorClassManager = _animatorClassManager_;
  }));

  beforeEach(inject(function(animatorDuration) {
    animatorDuration.get = jasmine.createSpy('get');
  }));

  it('should do something', function () {
    expect(!!animatorClassManager).toBe(true);
  });

  ['animator', 'my-class'].forEach(function (className) {

    describe('when class name is: ' + className, function () {
      describe('when initInState', function () {
        it('should have animator-in class', function () {
          createElement(1000);
          initInState(className);
          expectToHaveClasses(className + '-in');
        });
      });

      describe('when runInSequence: ', function () {

        describe('when transition with 1 second', function () {
          beforeEach(function () {
            createElementWithDuration(1000, className);
          });

          describe('start', function () {

            it('should manage classes', function () {
              expectToHaveClasses([className + '-between', className + '-between-in', className + '-out']);
              expectNotToHaveClasses(className + '-in');
            });

          });

          describe('between', function () {

            beforeEach(inject(function($timeout) {
              $timeout.flush(0);
            }));

            it('should call animationDuration.get with element', inject(function (animatorDuration) {
              expect(animatorDuration.get).toHaveBeenCalledWith(element);
            }));

            it('should manage classes', function () {
              expectToHaveClasses([className + '-between', className + '-between-in', className + '-in']);
              expectNotToHaveClasses(className + '-out');
            });

            describe('end', function () {
              beforeEach(inject(function($timeout) {
                $timeout.flush(1000);
              }));

              it('should manage classes', function () {
                expectToHaveClasses(className + '-in');
                expectNotToHaveClasses([className + '-between-in', className + '-between', className + '-out']);
              });
            });

          });

        });

      });


    });


  });

  ['animator', 'my-class'].forEach(function (className) {
    describe('when class name is: ' + className, function () {
      describe('when initOutState', function () {
        it('should have animator-in class', function () {
          createElement(1000);
          initOutState(className);
          expectToHaveClasses(className + '-out');
        });
      });

      describe('when runOutSequence', function () {

        describe('when transition with 1 second', function () {
          beforeEach(function () {
            createElementForRemoveWithDuration(1000, className);
          });

          describe('start', function () {

            it('should manage classes', function () {
              expectToHaveClasses([className + '-between', className + '-between-out', className + '-in']);
              expectNotToHaveClasses(className + '-out');
            });

          });

          describe('between', function () {

            beforeEach(inject(function($timeout) {
              $timeout.flush(0);
            }));

            it('should manage classes', function () {
              expectToHaveClasses([className + '-between', className + '-between-out', className + '-out']);
              expectNotToHaveClasses(className + '-in');
            });

            describe('end', function () {
              beforeEach(inject(function($timeout) {
                $timeout.flush(1000);
              }));

              it('should manage classes', function () {
                expectNotToHaveClasses([className + '-in', className + '-between-in', className + '-between']);
                expectToHaveClasses(className + '-out');
              });
            });
          });
        });


      });


    });
  });

  function makeArray(strOrArr) {
    return typeof strOrArr === 'string' ? strOrArr.split() : strOrArr;
  }

  function expectToHaveClasses(classArray) {
    makeArray(classArray).forEach(function(className) {
      expect(element).toHaveClass(className);
    });
  }

  function expectNotToHaveClasses(classArray) {
    makeArray(classArray).forEach(function(className) {
      expect(element).not.toHaveClass(className);
    });
  }

  function createElement(duration) {
    inject(function (animatorDuration) {
      element = angular.element('<div></div>');
      animatorDuration.get.and.returnValue(duration);
    });
  }

  function createElementWithDuration(duration, className) {
    inject(function (animatorClassManager) {
      createElement(duration);
      initOutState(className);
      animatorClassManager.runInSequence(element);
    });
  }

  function createElementForRemoveWithDuration(duration, className) {
    inject(function (animatorClassManager) {
      createElement(duration);
      initInState(className);
      animatorClassManager.runOutSequence(element);
    });
  }

  function initInState(className) {
    if (className === 'animator') {
      animatorClassManager.initInState(element);
    } else {
      animatorClassManager.initInState(element, className);
    }
  }

  function initOutState(className) {
    if (className === 'animator') {
      animatorClassManager.initOutState(element);
    } else {
      animatorClassManager.initOutState(element, className);
    }
  }

});
