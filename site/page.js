var Page = function(page, $) {
  page.helpers = ['_jquery'];
  page.widgets = ['accordion', 'datepicker', 'slider', 'toggler'];

  page.subPaths = page.helpers.concat(page.widgets);

  page.srcFiles = $.map(page.subPaths, function(e){return 'src/'+e+'.js'});
  page.specFiles = $.map(page.subPaths, function(e){return 'spec/'+e+'_spec.js'});

  page.include = function() {
    for(var i=0; i < arguments.length; i++) {
      var arrayFiles = [].concat(arguments[i]);
      for(var j=0; j < arrayFiles.length; j++) {
        /* document.write to force blocked loading */
        document.write('<script src="' + arrayFiles[j] + '"><\/script>');
      }
    }
  };

  return page;
}({}, jQuery);
