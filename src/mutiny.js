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
      var directives = $e.data(namespace);
      if(isString(directives)) {
        /* data-mutiny='slider' */
        initWidget($e, directives, {});
      } else if(typeof data === 'object') {
        /* data-mutiny='{"slider": {"some": "options"}}' */
        for(var directive in directives) {
          initWidget($e, directive, directives[directive]);
        }
      } else {
        throw 'Unsupported data';
      }
    });

    var queries = [];
    for(var name in Mutiny.widgets) {
      queries.push(format('[data-{0}-{1}]', namespace, dasherize(name)));
    }
    var $needWidgets = $find($es, queries.join(','));
    for(var i=0; i < $needWidgets.length; i++) {
      var $e = $($needWidgets[i]);
      for(name in Mutiny.widgets) {
        var key = format('{0}-{1}', namespace, name);
        var data = $e.data(key);
        if(data !== undefined) {
          var updatedOptions = initWidget($e, name, data);
          if(updatedOptions) {
            $e.data(key, updatedOptions);
          }
        }
      }
    }
  }
};

function $find($es, arg) {
  return $es ? $es.filter(arg) : $(arg);
}

function initWidget($instigator, widgetName, instanceOptions) {
  /* Deprecated: Mutiny.<widgetName> should be Mutiny.widgets.<widgetName> */
  var widget = Mutiny.widgets[widgetName] || Mutiny[widgetName];
  if(widget === undefined) {
    throw format('"{0}" not found', widgetName);
  }

  instanceOptions = instanceOptions || {};
  if(isString(instanceOptions)) {
    var replacementOptions = {};
    /* Deprecated: <widget>.string_arg should be <widget>.stringArg */
    if(widget.string_arg) {
      replacementOptions[widget.string_arg] = instanceOptions;
    } else if(widget.stringArg) {
      replacementOptions[widget.stringArg] = instanceOptions;
    } else {
      throw format('"{0}" cannot parse "{1}"', widgetName, instanceOptions);
    }
    instanceOptions = replacementOptions;
  }

  if(!instanceOptions.called) {
    widget.init($instigator, $.extend({}, widget.defaults, instanceOptions));
    instanceOptions.called = true;
    return instanceOptions;
  }
}
