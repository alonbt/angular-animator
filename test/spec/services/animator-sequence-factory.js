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
    AnimatorSequence = _AnimatorSequence_;    callback = jasmine.createSpy('callback').and.returnValue(1);
    secondCallback = jasmine.createSpy('secondCallback').and.returnValue(2);
    thirdCallback = jasmine.createSpy('thirdCallback').and.returnValue(3);
    seq = new AnimatorSequence();
  }));

  it('should do something', function () {
    expect(!!AnimatorSequence).toBe(true);
  });


  describe('when adding step', function () {
    beforeEach(function () {
      seq.step(callback);
    });

    it('should run step', function () {
      run();
      expect(callback).toHaveBeenCalled();
    })
  });

  describe('when adding 2 steps', function () {
    beforeEach(function () {
      seq.step(callback);
      seq.step(secondCallback, duration);
    });

    it('should run steps', function () {
      run();
      expect(callback).toHaveBeenCalled();
      expect(secondCallback).not.toHaveBeenCalled();
      timeout(duration);
      expect(secondCallback).toHaveBeenCalled();
    });
  });

  describe('when adding test with timeFunction', function () {
    beforeEach(function () {
      seq.step(callback, function () { return duration });
    });

    it('should run steps', function () {
      run();
      timeout(duration);
      expect(callback).toHaveBeenCalled();
      //expect(secondCallback).not.toHaveBeenCalled();
      //expect(secondCallback).toHaveBeenCalled();
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

  function timeout(duration) {
    inject(function ($timeout) {
      $timeout.flush(duration);
    });
  };


});
