$('article').each(function(i, e) {
  var $e = $(e);
  var $code = $('<code></code>').insertAfter($e.find('h3'));
  /* .html() pulls out the code of the parsed Javascript.  This can cause the
     browser to re-encode ' => " and " => &quot; */
  $code.text($e.find('.example').html().replace(/"/g, "'").replace(/&quot;/g, '"'));
});
