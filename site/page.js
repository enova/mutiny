var Page = function(page, $) {
  page.helpers = ['_jquery'];
  page.widgets = ['accordion', 'datepicker', 'slider', 'toggler'];
  page.files = page.helpers.concat(page.widgets);

  /* Manual document.write to force blocked loading */
  page.include = function(paths, transform) {
    for(var i=0; i < paths.length; i++) {
      document.write('<script src="' + transform.replace('%s', paths[i]) + '"><\/script>');
    }
  };

  return page;
}({}, jQuery);
