function dasherize(string) {
  return $.map(string.split(/(?=[A-Z])/),
               function(t){ return t.toLowerCase(); }).join('-');
}

function lowerCaseFirst(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function format() {
  var s = arguments[0];
  for(var i=1; i < arguments.length; i++) {
    var reg = new RegExp("\\{" + (i-1) + "\\}", "gm");
    s = s.replace(reg, arguments[i]);
  }

  return s;
}
