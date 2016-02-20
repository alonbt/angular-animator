'use strict';

describe('Angular.element: Extend', function () {

  // load the controller's module
  var element;

  beforeEach(function () {
    module('angularAnimator');
  });

  beforeEach(inject(function() {

  }));

  describe('when element.addAnimatorClass', function () {

    describe('when empty element', function () {
      beforeEach(function() {
        addAnimationOnElementWithCss();
      });

      it('should not add animator-between class', function () {
        expect(element).not.toHaveClass('animator-between');
      });

      it('should not add animator-between-in class', function () {
        expect(element).not.toHaveClass('animator-between-in');
      });

      it('should add animator-in class', function () {
        expect(element).toHaveClass('animator-in');
      });
    });

    describe('when transition with 1 second', function () {
      beforeEach(function () {
        addAnimationOnElementWithCss({'transition-duration': '1s'});
      });

      describe('start', function () {

        it('should add animator-between class', function () {
          expect(element).toHaveClass('animator-between');
        });

        it('should add animator-between-in class', function () {
          expect(element).toHaveClass('animator-between-in');
        });

        it('should not add animator-in class', function () {
          expect(element).not.toHaveClass('animator-in');
        });

      });

      describe('between', function () {

        beforeEach(inject(function($timeout) {
          $timeout.flush(0);
        }));

        it('should add animator-in class', function () {
          expect(element).toHaveClass('animator-in');
        });

      });

      describe('end', function () {
        beforeEach(inject(function($timeout) {
          $timeout.flush(1000);
        }));

        //it('should remove animator-between class', function () {
        //  expect(element).not.toHaveClass('animator-between');
        //});
        //
        //it('should remove animator-between-in class', function () {
        //  expect(element).not.toHaveClass('animator-between-in');
        //});
        //
        //it('should have animator-in class', function () {
        //  expect(element).toHaveClass('animator-in');
        //});
      });

    });
  });

  function addAnimationOnElementWithCss(args) {
    element = angular.element('<div></div>');
    if (args) {
      for (var key in args) {
        element.css(key, args[key]);
      }
    }
    element.addAnimatorClass();
  }

});
