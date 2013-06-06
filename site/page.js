var Page = function(page, $) {
  page.helpers = ['mutiny', 'util/typecheck'];
  page.widgets = ['accordion', 'datepicker', 'slider', 'toggler'];

  page.subPaths = page.helpers.concat($.map(page.widgets, function(w){return 'widgets/'+w}));

  page.srcFiles = [];
  page.specFiles = [];

  $.each(page.subPaths, function(i, widget) {
    page.srcFiles.push('src/' + widget + '.js');
    $.each(['unit', 'func'], function(i, subdir) {
      page.specFiles.push('spec/' + subdir + '/' + widget + '_spec.js');
    });
  });

  page.include = function(files) {
    $.each(files, function(i, file) {
      /* document.write to force blocked loading */
      document.write('<script src="' + file + '"></script>');
    });
  };

  return page;
}({}, jQuery);
