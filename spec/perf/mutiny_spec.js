describe('performance', function() {
  function timedIt(value, iterations, func) {
    it(value + ' is fast', function() {
      var start = +new Date();
      for(var i=0; i < iterations; i++) {
        func();
      }
      var end = +new Date();
      console.log(value, end - start);
    });
  }

  timedIt('Mutiny.init()', 10000, function() {
    Mutiny.init();
  });

  timedIt('format()', 1000000, function() {
    format('{0} {1} {2} {2} {1} {0}', 'foo', 'bar', 'baz');
  });
});
