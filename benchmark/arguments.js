BenchmarkPlus({
  runner: function(sum){
    sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  },

  'naive arguments.length': function(){
    var acc = 0;
    for(var i=0; i < arguments.length; i++){
      acc += arguments[i];
    }
    return acc;
  },

  'cached arguments.length': function(){
    var acc = 0;
    var len = arguments.length;
    for(var i=0; i < len; i++){
      acc += arguments[i];
    }
    return acc;
  }
});
