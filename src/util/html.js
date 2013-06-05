function formatSpan(format, startValue, className) {
  var inner = format.replace('%s', '<span>' + (startValue || '&nbsp;') + '</span>');
  if(className) {
    return '<span class="' + className + '">' + inner + '</span>';
  } else {
    return '<span>' + inner + '</span>';
  }
}
