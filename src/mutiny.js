$(function(){
  if(Mutiny.options.initOnReady) {
    Mutiny.init();
  }
});

var Mutiny = window.Mutiny = {
  options: {
    initOnReady: true
  },

  init: function(el, namespace) {
    namespace = namespace || 'mutiny';
    el = el || $('*');

    var mutiny_call = function($instigator, widget, instance_options){
      if(Mutiny[widget] === undefined) {
        throw '"' + widget + '" not found';
      }

      var options = $.extend({}, Mutiny[widget].defaults);
      if(isString(instance_options)) {
        options[Mutiny[widget].string_arg] = instance_options;
      } else {
        $.extend(options, instance_options);
      }
      Mutiny[widget].init($instigator, options);
    };

    el.each(function(i, e) {
      var $e = $(e);
      var data = $e.data();
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
