function dasherize(string) {
  return $.map(string.split(/(?=[A-Z])/),
               function(t){ return t.toLowerCase(); }).join('-');
}

function lowerCaseFirst(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

var format = function() {
  var regexes = [];
  for(var i=0; i < 10; i++) {
    regexes[i] = new RegExp('\\{' + i + '\\}', 'gm');
  }

  return function() {
    var s = arguments[0];
    for(var i=1; i < arguments.length; i++) {
      s = s.replace(regexes[i-1], arguments[i]);
    }

    return s;
  };
}();
