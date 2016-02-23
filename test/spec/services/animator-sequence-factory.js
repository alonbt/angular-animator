'use strict';

describe('Service: animatorSequenceBuilder', function () {

  // load the service's module
  beforeEach(module('angularAnimator'));

  var seq;
  //var prepareFunc, startFunc, endFunc;
  var callback, secondCallback, thirdCallback;
  var duration = 1000;

  // instantiate service
  var AnimatorSequence;
  beforeEach(inject(function (_AnimatorSequence_, animatorDuration) {
    AnimatorSequence = _AnimatorSequence_;    callback = jasmine.createSpy('callback');
    secondCallback = jasmine.createSpy('secondCallback');
    thirdCallback = jasmine.createSpy('thirdCallback');
    seq = new AnimatorSequence();
  }));

  it('should do something', function () {
    expect(!!AnimatorSequence).toBe(true);
  });


  describe('when adding step', function () {
    beforeEach(function () {
      seq.step(callback);
    });

    it('should run it on next', function () {
      next();
      expect(callback).toHaveBeenCalled();
    })
  });

  describe('when adding 2 steps', function () {
    beforeEach(function () {
      seq.step(callback);
      seq.step(secondCallback);
    });

    it('should not run 2nd step before 2nd next', function () {
      next();
      expect(secondCallback).not.toHaveBeenCalled();
    });

    it('should run 2nd steps', function () {
      next();
      next();
      expect(secondCallback).toHaveBeenCalled();
    });
  });

  describe('when adding timeout step', function () {
    beforeEach(function () {
      seq.step(callback, 1000);
    });

    it('should not run before timeout', inject(function ($rootScope) {
      next();
      $rootScope.$apply();
      expect(callback).not.toHaveBeenCalled();
    }));

    it('should not run after timeout', function () {
      nextWithTimeout(seq, 1000);
      expect(secondCallback).not.toHaveBeenCalled();
    });
  });

  describe('when adding 2 timeout step', function () {
    beforeEach(function () {
      seq.step(callback, 1000);
      seq.step(secondCallback, 2000);
    });

    it('should not run 2nd callback before timeout', inject(function ($rootScope) {
      nextWithTimeout(seq, 1000);
      expect(secondCallback).not.toHaveBeenCalled();
      next();
      $rootScope.$apply();
      $rootScope.$apply();
      expect(secondCallback).not.toHaveBeenCalled();
    }));
  });

  describe('next', function () {
    beforeEach(function () {
      seq.step(callback);
      seq.step(secondCallback);
    });

    it('should call first step', function () {
      next();
      expect(callback).toHaveBeenCalled();
    });

    it('should not call second step', function () {
      next();
      expect(secondCallback).not.toHaveBeenCalled();
    });
  });

  describe('when adding step with timeFunction', function () {
    beforeEach(function () {
      seq.step(callback, function () { return duration });
    });

    it('should run steps', function () {
      run();
      timeout(duration);
      expect(callback).toHaveBeenCalled();

    });
  });

  describe('when adding 3 steps', function () {

    beforeEach(function () {
      seq.step(callback).step(secondCallback, duration);
      seq.step(thirdCallback, duration);
    });

    it('should run 3 steps', function () {
      run();
      expect(callback).toHaveBeenCalled();
      expect(secondCallback).not.toHaveBeenCalled();
      timeout(duration);
      expect(secondCallback).toHaveBeenCalled();
      expect(thirdCallback).not.toHaveBeenCalled();
      timeout(duration);
      expect(thirdCallback).toHaveBeenCalled();
    });

    it ('should stop when stop', function () {
      run();
      timeout(duration);
      seq.stop();
      timeout(duration);
      expect(thirdCallback).not.toHaveBeenCalled();
    });
  });

  it('should run two instances', function () {
    var seq2 = new AnimatorSequence();
    seq2.step(secondCallback);
    seq.run();
    run(seq2);
    expect(secondCallback).toHaveBeenCalled();
  });

  it('should stop instance on first step', function () {
    seq.step(callback);
    seq.stop();
    run();
    expect(callback).not.toHaveBeenCalled();
  });


  it('stop should not stop the second istance when stopping the first', function () {
    var seq2 = new AnimatorSequence();
    seq2.step(callback);
    run();
    seq.stop();
    run(seq2);
    expect(callback).toHaveBeenCalled();
  });

  it('stop should work after run', function () {
    seq.run().stop();
  });

  function run(customSeq) {
    inject(function ($rootScope) {
      seq = customSeq || seq;
      seq.run();
      $rootScope.$apply();
    });
  }

  function next(customSeq) {
    inject(function ($rootScope) {
      seq = customSeq || seq;
      seq.next();
      $rootScope.$apply();
    });
  }

  function nextWithTimeout(customSeq, time) {
    inject(function ($rootScope, $timeout) {
      seq = customSeq || seq;
      seq.next();
      $rootScope.$apply();
      $timeout.flush(time);
      $rootScope.$apply();
    });
  }


  function timeout(duration) {
    inject(function ($timeout) {
      $timeout.flush(duration);
    });
  };


});
