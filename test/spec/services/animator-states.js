'use strict';

describe('Service: animatorStates', function () {

  // load the service's module
  beforeEach(module('angularAnimator'));

  // instantiate service
  var animatorStates;
  beforeEach(inject(function (_animatorStates_) {
    animatorStates = _animatorStates_;
  }));

  it('should have stats', function () {
    expect(animatorStates.IN).toBe('in');
    expect(animatorStates.OUT).toBe('out');
  });

});
