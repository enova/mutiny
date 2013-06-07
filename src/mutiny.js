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
    $es = $es || $('*');

    var mutiny_call = function($instigator, widget_name, instance_options) {
      /* Deprecated: Mutiny.<widget_name> should be Mutiny.widgets.<widget_name> */
      var widget = Mutiny.widgets[widget_name] || Mutiny[widget_name];
      if(widget === undefined) {
        throw '"' + widget_name + '" not found';
      }

      var options = $.extend({}, widget.defaults);
      if(isString(instance_options)) {
        /* Deprecated: <widget>.string_arg should be <widget>.stringArg */
        if(widget.string_arg) {
          options[widget.string_arg] = instance_options;
        } else if(widget.stringArg) {
          options[widget.stringArg] = instance_options;
        } else {
          throw '"' + widget_name + '" cannot parse "' + instance_options + '"';
        }
      } else {
        $.extend(options, instance_options);
      }
      widget.init($instigator, options);
    };

    $es.each(function(i, e) {
      var $e = $(e);
      var data = $e.data();
      /* Deprecated.  data-mutiny="widget" should be data-mutiny-widget="" */
      if(namespace in data) {
        var directives = data[namespace];
        if(isString(directives)) {
          /* data-mutiny='slider' */
          mutiny_call($e, directives, {});
        } else if(typeof data === 'object') {
          /* data-mutiny='{"slider": {"some": "options"}}' */
          for(var directive in directives) {
            mutiny_call($e, directive, directives[directive]);
          }
        } else {
          throw 'Unsupported data';
        }
      }

      for(var key in data) {
        if(key.indexOf(namespace) === 0 && key != namespace) {
          var widget = key.replace(namespace, '').toLowerCase();
          var options = data[key];
          mutiny_call($e, widget, options || {});
        }
      }
    });
  }
};
