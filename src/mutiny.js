$(function(){
  if(Mutiny.options.initOnReady) {
    Mutiny.init();
  }
});

var Mutiny = window.Mutiny = {
  options: {
    initOnReady: true
  },

  widgets: {},

  init: function($es, namespace) {
    namespace = namespace || 'mutiny';

    /* Deprecated.  data-mutiny="widget" should be data-mutiny-widget="" */
    filter($es, '[data-' + namespace + ']').each(function(i, e) {
      var $e = $(e);
      var data = $e.data();
      if(namespace in data) {
        var directives = data[namespace];
        if(isString(directives)) {
          /* data-mutiny='slider' */
          mutinyCall($e, directives, {});
        } else if(typeof data === 'object') {
          /* data-mutiny='{"slider": {"some": "options"}}' */
          for(var directive in directives) {
            mutinyCall($e, directive, directives[directive]);
          }
        } else {
          throw 'Unsupported data';
        }
      }
    });

    var queries = [];
    for(var name in Mutiny.widgets) {
      queries.push('[data-' + namespace + '-' + name + ']');
    }
    var $needWidgets = filter($es, queries.join(','));
    for(var i=0; i < $needWidgets.length; i++) {
      var $e = $($needWidgets[i]);
      var data = $e.data();
      for(var key in data) {
        if(key.indexOf(namespace) === 0) {
          var widget = lowerCaseFirst(key.replace(namespace, ''));
          mutinyCall($e, widget, data[key]);
        }
      }
    }
  }
};

var filter = function($es, arg) {
  return $es ? $es.filter(arg) : $(arg);
};

var mutinyCall = function($instigator, widget_name, options) {
  /* Deprecated: Mutiny.<widget_name> should be Mutiny.widgets.<widget_name> */
  var widget = Mutiny.widgets[widget_name] || Mutiny[widget_name];
  if(widget === undefined) {
    throw '"' + widget_name + '" not found';
  }

  var instanceOptions = {};
  if(!options) {
  } else if(isString(options)) {
    /* Deprecated: <widget>.string_arg should be <widget>.stringArg */
    if(widget.string_arg) {
      instanceOptions[widget.string_arg] = options;
    } else if(widget.stringArg) {
      instanceOptions[widget.stringArg] = options;
    } else {
      throw '"' + widget_name + '" cannot parse "' + options + '"';
    }
  } else {
    instanceOptions = options;
  }

  widget.init($instigator, $.extend({}, widget.defaults, instanceOptions));
};

var lowerCaseFirst = function(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
};
