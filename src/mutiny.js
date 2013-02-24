$(function(){
  Mutiny.init();
});

var Mutiny = window.Mutiny = {
  init: function(el, dataAttr) {
    dataAttr = dataAttr || 'mutiny';
    el = el || $('[data-' + dataAttr + ']');

    var mutiny_call = function($instigator, name, instance_options){
      if(Mutiny[name] === undefined) {
        throw '"' + name + '" not found';
      }

      var options = $.extend({}, Mutiny[name].defaults);
      if(isString(instance_options)) {
        options[Mutiny[name].string_arg] = instance_options;
      } else {
        $.extend(options, instance_options);
      }
      Mutiny[name].init($instigator, options);
    };

    el.each(function(i, e) {
      var $e = $(e);
      var data = $e.data(dataAttr);
      if(isString(data)) {
        /* data-mutiny='slider' */
        mutiny_call($e, data, {});
      } else if(typeof data === 'object') {
        /* data-mutiny='{"slider": {"some": "options"}}' */
        for(var directive in data) {
          mutiny_call($e, directive, data[directive]);
        }
      } else {
        throw 'Unsupported data';
      }
    });
    return this;
  }
};
