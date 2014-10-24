var Page = function(page) {
  page.extra = ['bower_components/jquery/dist/jquery.js', 'bower_components/jquery-ui/jquery-ui.js', 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false'];
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
    page.extra,
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

  return page;
}({});
