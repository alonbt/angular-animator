'use strict';

describe('Directive: animator', function () {

  // load the directive's module
  beforeEach(module('angularAnimator'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div animator></div>');
    element = $compile(element)(scope);

    //expect(element.text()).toBe('this is the animator directive');
  }));
});
