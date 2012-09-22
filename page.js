var Page = function($) {
  var helpers = ['_jquery'];
  var widgets = ['accordion', 'slider', 'toggler'];
  var files = helpers.concat(widgets);

  /* Manual DOM manipulation because jQuery versions swallow errors */
  var include = function(prepend, paths, append) {
    for(var i=0; i < paths.length; i++) {
      var script = document.createElement('script');
      script.src = prepend + paths[i] + append;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }

  include('src/', files, '.js');

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

  return {
    'loadSpecs': function() {
      include('spec/', files, '_spec.js');
    }
  };
}(jQuery);
