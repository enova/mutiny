$('article').each(function(i, e) {
  var $e = $(e);
  var $code = $('<code></code>').insertAfter($e.find('h3'));
  $code.text($e.find('.example').html());
});
