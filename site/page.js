var Page = (function(page) {
  page.reqs = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-ui/jquery-ui.js',
    'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false'
  ];
  page.core = ['core'];
  page.widgets = [
    'jq/toggler',
    'jqui/accordion', 'jqui/datepicker', 'jqui/slider',
    'google/map', 'google/street-view'
  ];

  function formatter(format){
    return function(val){
      return format.replace('%s', val);
    };
  }

  function map(arr, func){
    var ret = [];
    for(var i=0; i < arr.length; i++){
      ret.push(func(arr[i]));
    }
    return ret;
  }

  function flatten(){
    var ret = [];
    for(var i = 0; i < arguments.length; i++){
      ret.push.apply(ret, arguments[i]);
    }
    return ret;
  }

  page.subPaths = flatten(page.core, page.widgets);
  page.src = flatten(
    page.reqs,
    map(page.subPaths, formatter('src/%s.js'))
  );
  page.spec = flatten(
    map(page.subPaths, formatter('spec/unit/%s-spec.js')),
    map(page.subPaths, formatter('spec/func/%s-spec.js'))
  );

  page.include = function include(file){
    if(!!file.substring || !('length' in file)){
      /* document.write to force blocked loading */
      document.write('<script src="' + file + '"></script>'); //jshint ignore:line
    } else {
      for(var i=0; i < file.length; i++){
        include(file[i]);
      }
    }
  };

  page.createLinks = function(target, prepend, files){
    $.each(files, function(i, file) {
      var url = prepend+file;
      $('<a/>')
        .attr('href', prepend + file)
        .text(file)
        .appendTo(target);
    });
  };

  page.loadExample = function(name, target){
    var $target = $(target);
    $target.addClass(Mutiny.util.dasherize(name));

    $target.load('examples/' + name + '.html', function(data, status, xhr) {
      if(status == "error") {
        $target
          .addClass('error')
          .html('<h1>Error ' + xhr.status + '</h1><code>' + data + '</code>');
        return;
      }

      $target.find('section').wrapInner('<div class="example"/>').each(function(i, e) {
        var $e = $(e);
        var $h1 = $('<h1/>')
                    .text($e.attr('id').replace(/-/g, ' '))
                    .prependTo($e);
        /* .html() pulls out the code of the parsed Javascript.  This can cause the
        browser to re-encode ' => " and " => &quot; */
        var code = $e.find('.example').html().replace(/"/g,      "'")
                                             .replace(/&quot;/g, '"')
                                             .replace(/&gt;/g,   '>')
                                             /* Delete blank lines. */
                                             .replace(/^$(\r\n|\n|\r)/gm, '')
                                             /* Delete opening whitespace */
                                             .replace(/^  /gm, '');

        $('<pre data-language="html"/>').text(code).insertAfter($h1);
      });

      Mutiny.init();
      Rainbow.color();
    });
  };

  return page;
})({});
