BenchmarkPlus({
  runner: function(format){
    format('{0} {1} {2} {3}', 'foo', 'bar', 'baz', 'boo');
  },

  'inline': function(str){
    for(var i=1; i < arguments.length; i++) {
      var regex = new RegExp("\\{" + (i-1) + "\\}", "gm");
      str = str.replace(regex, arguments[i]);
    }

    return str;
  },

  'precached': (function(){
    var regexes = [];
    for(var i=0; i < 10; i++){
      regexes[i] = new RegExp("\\{" + i + "\\}", "gm");
    }
    return function(str) {
      for(var i=1; i < arguments.length; i++) {
        str = str.replace(regexes[i-1], arguments[i]);
      }

      return str;
    };
  })(),

  'cache on demand': (function(){
    var regexes = [];
    return function(str) {
      for(var i=1; i < arguments.length; i++) {
        var r = i-1;
        var regex = regexes[r];
        if(!regex){
          regex = regexes[r] = new RegExp("\\{" + r + "\\}", "gm");
        }
        str = str.replace(regex, arguments[i]);
      }

      return str;
    };
  })()
});
