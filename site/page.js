var Page = function(page, $) {
  page.helpers = ['mutiny', 'util/string', 'util/typecheck'];
  page.widgets = ['accordion', 'datepicker', 'slider', 'toggler'];

  var mapFormat = function(arr, format) {
    return $.map(arr, function(e) { return format.replace('%s', e); });
  };

  page.subPaths = page.helpers.concat(mapFormat(page.widgets, 'widgets/%s'));
  page.src = mapFormat(page.subPaths, 'src/%s.js');
  page.spec = {
    unit: mapFormat(page.subPaths, 'spec/unit/%s_spec.js'),
    func: mapFormat(page.subPaths, 'spec/func/%s_spec.js'),
    perf: mapFormat(page.subPaths, 'spec/perf/%s_spec.js'),
  };
  page.spec.base = page.spec.unit.concat(page.spec.func);

  page.include = function(files) {
    $.each(files, function(i, file) {
      /* document.write to force blocked loading */
      document.write('<script src="' + file + '"></script>');
    });
  };

  return page;
}({}, jQuery);
