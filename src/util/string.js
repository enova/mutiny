function dasherize(string) {
  return $.map(string.split(/(?=[A-Z])/),
               function(t){ return t.toLowerCase(); }).join('-');
}

function lowerCaseFirst(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
