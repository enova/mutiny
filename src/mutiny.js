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
    $find($es, format('[data-{0}]', namespace)).each(function(i, e) {
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
      queries.push(format('[data-{0}-{1}]', namespace, dasherize(name)));
    }
    var $needWidgets = $find($es, queries.join(','));
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

var $find = function($es, arg) {
  return $es ? $es.filter(arg) : $(arg);
};

var mutinyCall = function($instigator, widgetName, options) {
  /* Deprecated: Mutiny.<widgetName> should be Mutiny.widgets.<widgetName> */
  var widget = Mutiny.widgets[widgetName] || Mutiny[widgetName];
  if(widget === undefined) {
    throw format('"{0}" not found', widgetName);
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
      throw format('"{0}" cannot parse "{1}"', widgetName, options);
    }
  } else {
    instanceOptions = options;
  }

  widget.init($instigator, $.extend({}, widget.defaults, instanceOptions));
};

var dasherize = function(string) {
  return $.map(string.split(/(?=[A-Z])/),
               function(t){ return t.toLowerCase(); }).join('-');
};

var lowerCaseFirst = function(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
};
