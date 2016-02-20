/// <reference path="../../reference.ts" />
'use strict';
beforeEach(function () {
  jasmine.addMatchers({
    toHaveClass: function () {
      return ({
        compare: function (actual, expected) {
        var msg = 'Expected \'' + angular.mock.dump(actual) + '\' to have class \'' + expected + '\'.';
        var pass = actual.hasClass ? actual.hasClass(expected) : angular.element(actual).hasClass(expected);
        return {
          pass: pass, message: pass ? msg.replace('to have', 'not to have') : msg };
        }
      });
    }
  });
});

