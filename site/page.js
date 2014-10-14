var Page = function(page) {
  page.vendor = ['jquery', 'jquery-ui'];
  page.core = ['core'];
  page.widgets = [
    'jq/toggler',
    'jqui/accordion', 'jqui/datepicker', 'jqui/slider'
  ];

  function mapFormat(arr, format) {
    var ret = [];
    for(var i=0; i < arr.length; i++){
      ret.push(format.replace('%s', arr[i]));
    }
    return ret;
  };

  page.subPaths = page.core.concat(page.widgets);
  page.src = mapFormat(page.vendor, 'vendor/%s.js').concat(
             mapFormat(page.subPaths, 'src/%s.js'));
  page.spec = mapFormat(page.subPaths, 'spec/unit/%s-spec.js').concat(
              mapFormat(page.subPaths, 'spec/func/%s-spec.js'));

  page.include = function(files) {
    for(var i=0; i < files.length; i++){
      /* document.write to force blocked loading */
      document.write('<script src="' + files[i] + '"></script>');
    }
  };

  return page;
}({});
