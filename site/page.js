var Page = function(page) {
  page.core = ['core'];
  page.widgets = [
    'jq/toggler',
    'jqui/accordion', 'jqui/datepicker', 'jqui/slider'
  ];

  var mapFormat = function(arr, format) {
    return $.map(arr, function(e) { return format.replace('%s', e); });
  };

  page.subPaths = page.core.concat(page.widgets);
  page.src = mapFormat(page.subPaths, 'src/%s.js');
  page.spec = mapFormat(page.subPaths, 'spec/unit/%s-spec.js').concat(
              mapFormat(page.subPaths, 'spec/func/%s-spec.js'));

  page.include = function(files) {
    $.each(files, function(i, file) {
      /* document.write to force blocked loading */
      document.write('<script src="' + file + '"></script>');
    });
  };

  return page;
}({});
