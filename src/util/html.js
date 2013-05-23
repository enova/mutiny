function formatSpan(format, startValue, className) {
  if(startValue === null || startValue === '') {
    /* If startValue does not exist, force a non-empty element draw.  Starting
     * with empty element prevents correct drawing when it has been replace with
     * real contents.
     */
    startValue = '&nbsp;';
  }

  var inner = format.replace('%s', '<span>' + startValue + '</span>');
  if(className) {
    return '<span class="' + className + '">' + inner + '</span>';
  } else {
    return '<span>' + inner + '</span>';
  }
}
