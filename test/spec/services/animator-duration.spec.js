'use strict';

describe('Service: animatorDuration', function () {

  // load the service's module
  beforeEach(module('angularAnimator'));


  // instantiate service
  var animatorDuration;
  //
  //beforeEach(function () {
  //  element = createElement();
  //});

  beforeEach(inject(function (_animatorDuration_) {
    animatorDuration = _animatorDuration_;
  }));

  it('should do something', function () {
    expect(!!animatorDuration).toBe(true);
  });

  describe('when get()', function () {

    describe('transition', function () {
      describe('when no transition property', function () {
        it('should return 0', function () {
          expect(animatorDuration.get(new ElementBuilder().build())).toBe(0);
        });
      });

      describe('when duration property is 1s', function () {
        it('should return 1000', function () {
          expect(animatorDuration.get(new ElementBuilder().withTransitionDuration().build())).toBe(1000);
        });
      });

      describe('when delay and transition duration is 1s', function () {
        it('should return 1000', function () {
          expect(animatorDuration.get(new ElementBuilder().withTransitionDuration().withTransitionDelay().build())).toBe(2000);
        });
      });
    });

    describe('animation', function () {
      describe('when duration property is 1s', function () {
        it('should return 1000', function () {
          expect(animatorDuration.get(new ElementBuilder().withAnimationDuration().build())).toBe(1000);
        });
      });

      describe('when delay and transition duration is 1s', function () {
        it('should return 1000', function () {
          expect(animatorDuration.get(new ElementBuilder().withAnimationDuration().withAnimationDelay().build())).toBe(2000);
        });
      });
    });

    describe('animation and transition duration', function () {
      describe('when Transition duration is bigger', function () {

        var transitionDurationBigger;

        beforeEach(function () {
          transitionDurationBigger = new ElementBuilder().withAnimationDuration().withTransitionDuration('2s');
        });

        it('should return transition duration', function () {
          expect(animatorDuration.get(transitionDurationBigger.build())).toBe(2000);
        });

        describe('when animation delay+duration is bigger than transition delay+duration', function () {

          it('should return transition duration', function () {
            expect(animatorDuration.get(transitionDurationBigger.withAnimationDelay('3s').build())).toBe(4000);
          });

        });

      });

      describe('when animation duration is bigger', function () {

        var animationDurationBigger;

        beforeEach(function () {
          animationDurationBigger = new ElementBuilder().withAnimationDuration('2s').withTransitionDuration();
        });

        it('should return animation duration', function () {
          expect(animatorDuration.get(animationDurationBigger.build())).toBe(2000);
        });


        describe('when transition delay+duration is bigger than animation delay+duration', function () {

          it('should return transition duration', function () {
            expect(animatorDuration.get(animationDurationBigger.withTransitionDelay('3s').build())).toBe(4000);
          });

        });

      });

    });

    /* THERE IS NO SUPPORT FOR DURATION === 0 and DELAY > 0 */

  });


  function ElementBuilder() {
    var element = angular.element('<div></div>');
    return {
      withTransitionDuration: function(time) {
        element.css('transition-duration', time || '1s');
        return this;
      },
      withTransitionDelay: function(time) {
        element.css('transition-delay', time || '1s');
        return this;
      },
      withAnimationDuration: function(time) {
        element.css('animation-duration', time || '1s');
        return this;
      },
      withAnimationDelay: function(time) {
        element.css('animation-delay', time || '1s');
        return this;
      },
      build: function () {
        return element;
      }
    };
  }


});
