'use strict';

describe('Service: animatorClass', function () {

  // load the service's module
  beforeEach(module('angularAnimator'));

  // instantiate service
  var animatorClass;
  beforeEach(inject(function (_animatorClass_) {
    animatorClass = _animatorClass_;
  }));

  it('should do something', function () {
    expect(!!animatorClass).toBe(true);
  });

});
