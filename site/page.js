var Page = function(page, $) {
  page.helpers = ['_jquery'];
  page.widgets = ['accordion', 'slider', 'toggler'];
  page.files = page.helpers.concat(page.widgets);

  /* Manual DOM manipulation because jQuery versions swallow errors */
  page.include = function(paths, transform) {
    for(var i=0; i < paths.length; i++) {
      var script = document.createElement('script');
      script.src = transform.replace('%s', paths[i]);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };

  page.include(page.files, '/src/%s.js');

  return page;
}({}, jQuery);
