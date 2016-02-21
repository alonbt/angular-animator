'use strict';

describe('Service: animatorClass', function () {

  var state;

  // load the service's module
  beforeEach(module('angularAnimator'));

  // instantiate service
  var animatorClass, element, className;
  beforeEach(inject(function (_animatorClass_, animatorStates) {
    state = animatorStates.IN;
    animatorClass = _animatorClass_;
  }));

  beforeEach(function () {
    className = 'my-class';
    element = angular.element('<div></div>');
    animatorClass.init(element, className);
  });

  it('should add and remove between-classes', function () {
    animatorClass.addBetweenClassesWithState(state);
    expect(element).toHaveClass(className + '-between');
    expect(element).toHaveClass(className + '-between-' + state);

    animatorClass.removeBetweenClassesWithState(state);
    expect(element).not.toHaveClass(className + '-between');
    expect(element).not.toHaveClass(className + '-between-' + state);
  });

  it('should add and remove state class', function () {
    animatorClass.addClassWithState(state);
    expect(element).toHaveClass(className + '-' + state);
  });

  it('should remove the opposite state class', inject(function (animatorStates) {
    animatorClass.addClassWithState(animatorStates.OUT);
    animatorClass.removeClassWithOppositeState(state);
    expect(element).not.toHaveClass(className + '-' + animatorStates.OUT);
  }));

});
