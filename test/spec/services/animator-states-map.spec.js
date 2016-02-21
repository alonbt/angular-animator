'use strict';

describe('Service: animatorStatesMap', function () {

  // load the service's module
  beforeEach(module('angularAnimator'));

  // instantiate service
  var animatorStatesMap;
  beforeEach(inject(function (_animatorStatesMap_) {
    animatorStatesMap = _animatorStatesMap_;
  }));

  it('should have stats', function () {
    expect(animatorStatesMap.IN).toBe('in');
    expect(animatorStatesMap.OUT).toBe('out');
  });

});
