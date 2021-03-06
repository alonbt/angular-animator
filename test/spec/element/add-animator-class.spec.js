'use strict';

describe('Angular.element: Extend', function () {

  // load the controller's module
  var element;

  beforeEach(function () {
    module('angularAnimator');
  });

  describe('when element.addAnimatorClassSequence', function () {

    it('should call animatorSequenceManager', inject(function (animatorSequenceManager) {
      animatorSequenceManager.runInSequence = jasmine.createSpy('addClass');
      element = angular.element('<div></div>');
      element.addAnimatorClassSequence();
      expect(animatorSequenceManager.runInSequence).toHaveBeenCalledWith(element);
    }));

  });

});
