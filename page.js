var helpers = ['_jquery'];
var widgets = ['accordion', 'slider', 'toggler'];

$.each(helpers.concat(widgets), function(i, name) {
  $('body').append('<script src="src/' + name + '.js"></' + 'script>');
});

$.each(widgets, function(i, widget) {
  $('<a href="#%s">%s</a>'.replace(/%s/g, widget))
    .appendTo('menu')
    .click(function() {
      $.get('examples/' + widget + '.html', function(data) {
        $('#main').html(data);
        $('article').each(function(i, e) {
          var $e = $(e);
          var $code = $('<code></code>').insertAfter($e.find('> h3'));
          /* .html() pulls out the code of the parsed Javascript.  This can cause the
          browser to re-encode ' => " and " => &quot; */
          $code.text($e.find('.example').html().replace(/"/g, "'").replace(/&quot;/g, '"'));
        });

        Mutiny.init();
      });
      return false;
    });
});
