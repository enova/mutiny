var Mutiny = (function(mutiny, $, undefined) {
  var mutiny_call = function($instigator, name, instance_options){
    if(mutiny[name] === undefined) {
      throw '"' + name + '" not found';
    }

    var options = $.extend({}, mutiny[name].defaults);
    if(typeof instance_options === 'string') {
      options[mutiny[name].string_arg] = instance_options;
    } else {
      $.extend(options, instance_options);
    }
    mutiny[name].init($instigator, options);
  };

  $.fn.mutiny = function(dataAttr){
    dataAttr = dataAttr || 'mutiny';
    this.each(function(i, e) {
      var $e = $(e);
      var data = $e.data(dataAttr);
      switch(typeof data) {
        case 'string':
          /* data-mutiny='slider' */
          mutiny_call($e, data, {});
          break;
        case 'object':
          /* data-mutiny='{"slider": {"some": "options"}}' */
          for(var directive in data) {
            mutiny_call($e, directive, data[directive]);
          }
          break;
        default:
          throw 'Unsupported data';
      }
    });
    return this;
  };

  mutiny.init = function(dataAttr) {
    dataAttr = dataAttr || 'mutiny';
    $('[data-' + dataAttr + ']').mutiny(dataAttr);
  };

  return mutiny;
})(Mutiny || {}, jQuery);
