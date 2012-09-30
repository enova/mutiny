var Page = function(page, $) {
  page.helpers = ['_jquery'];
  page.widgets = ['accordion', 'slider', 'toggler'];
  page.files = page.helpers.concat(page.widgets);

  /* Manual document.write to force blocked loading */
  page.include = function(paths, transform) {
    for(var i=0; i < paths.length; i++) {
      document.write('<script src="' + transform.replace('%s', paths[i]) + '"><\/script>');
    }
  };

  page.include(page.files, '/src/%s.js');

  return page;
}({}, jQuery);
