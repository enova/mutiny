var Page = function($) {
  var helpers = ['_jquery'];
  var widgets = ['accordion', 'slider', 'toggler'];
  var files = helpers.concat(widgets);

  /* Manual DOM manipulation because jQuery versions swallow errors */
  var include = function(paths, transform) {
    transform = transform || '%s';
    for(var i=0; i < paths.length; i++) {
      var script = document.createElement('script');
      script.src = transform.replace('%s', paths[i]);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }

  include(files, 'src/%s.js');

  $.each(widgets, function(i, widget) {
    var $e = $('<a href="#%s">%s</a>'.replace(/%s/g, widget));
    $e.appendTo('#examples')
      .click(function() {
        /* Replace with Mutiny.tabber */
        $('#examples a').removeClass('active');
        $e.addClass('active');

        $('#main').load('examples/' + widget + '.html', function() {
          $('#main section').each(function(i, e) {
            var $e = $(e);
            var $code = $('<code></code>').insertAfter($e.find('> h3'));
            /* .html() pulls out the code of the parsed Javascript.  This can cause the
            browser to re-encode ' => " and " => &quot; */
            $code.text($e.find('.example').html().replace(/"/g,      "'")
                                                 .replace(/&quot;/g, '"')
                                                 .replace(/&gt;/g,   '>'));
          });

          $('#main *').mutiny();
        });
        return false;
      });
  });

  return {
    'loadSpecs': function() {
      include(files, 'spec/%s_spec.js');
    }
  };
}(jQuery);
