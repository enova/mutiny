BenchmarkPlus({
  'naive arguments.length': (function(){
    function sum(){
      var acc = 0;
      for(var i=0; i < arguments.length; i++){
        acc += arguments[i];
      }
      return acc;
    }

    return function(){
      sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    };
  })(),

  'cached arguments.length': (function(){
    function sum(){
      var acc = 0;
      var len = arguments.length;
      for(var i=0; i < len; i++){
        acc += arguments[i];
      }
      return acc;
    }

    return function(){
      sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    };
  })(),

  'no arguments': (function(){
    function sum(arr){
      var acc = 0;
      for(var i=0; i < arr.length; i++){
        acc += arr[i];
      }
      return acc;
    }

    return function(){
      sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    };
  })(),
});
