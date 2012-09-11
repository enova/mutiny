$('article').each(function(i, e) {
  var $e = $(e);
  var $code = $('<h3 class="code"></h3>').prependTo($e);
  $code.text($e.find('.example').html());
});
