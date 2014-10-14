var Page = function(page) {
  page.extra = ['vendor/jquery.js', 'vendor/jquery-ui.js', 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false'];
  page.core = ['core'];
  page.widgets = [
    'jq/toggler',
    'jqui/accordion', 'jqui/datepicker', 'jqui/slider',
    'google/map', 'google/street-view'
  ];

  function mapFormat(arr, format) {
    var ret = [];
    for(var i=0; i < arr.length; i++){
      ret.push(format.replace('%s', arr[i]));
    }
    return ret;
  };

  page.subPaths = page.core.concat(page.widgets);
  page.src = page.extra.concat(
             mapFormat(page.subPaths, 'src/%s.js'));
  page.spec = mapFormat(page.subPaths, 'spec/unit/%s-spec.js').concat(
              mapFormat(page.subPaths, 'spec/func/%s-spec.js'));

  page.include = function include(file) {
    if(!!file.substring || !('length' in file)){
      /* document.write to force blocked loading */
      document.write('<script src="' + file + '"></script>');
    } else {
      for(var i=0; i < file.length; i++){
        include(file[i]);
      }
    }
  };

  return page;
}({});
