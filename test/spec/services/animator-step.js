'use strict';

describe('Service: animatorStep', function () {

  // load the service's module
  beforeEach(module('angularAnimator'));

  // instantiate service
  var animatorStep, animatorClass;
  beforeEach(inject(function (_animatorStep_, _animatorClass_) {
    animatorStep = _animatorStep_;
    animatorClass = _animatorClass_;

  }));

  it('addBetween on prepare method', function () {
    expectServiceMethodToCallAnimatorClass('prepare', 'addBetween');
  });

  it('switchState on start method', function () {
    expectServiceMethodToCallAnimatorClass('start', 'switchState');
  });

  it('removeBetween on end method', function () {
    expectServiceMethodToCallAnimatorClass('end', 'removeBetween');
  });

  it('switchState and switchStateBetween on revertStart method', function () {
    expectServiceMethodToCallAnimatorClass('revertStart', ['switchState', 'switchBetweenState']);
  });

    //expectServiceMethodToCallAnimatorClass('revertStart', 'switchBetweenState');
  function expectServiceMethodToCallAnimatorClass(transitionMethod, classMethods) {
    classMethods = typeof classMethods ===  'object' ? classMethods : [classMethods];
    spyOnClassMethods(classMethods);
    animatorStep[transitionMethod]();
    expectClassMethodsToHaveBeenCalled(classMethods);
  }

  function spyOnClassMethods(classMethods) {
    classMethods.forEach(function(classMethod) {
      spyOn(animatorClass, classMethod);
    });
  }

  function expectClassMethodsToHaveBeenCalled(classMethods) {
    classMethods.forEach(function(classMethod) {
      expect(animatorClass[classMethod]).toHaveBeenCalled();
    });
  }

});
