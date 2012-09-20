var Mutiny = (function(mutiny, $) {
  $.fn.mutiny = function(dataAttr){
    dataAttr = dataAttr || 'mutiny';
    this.each(function(i, e) {
      var $e = $(e);
      var data = $e.data(dataAttr);
      switch(typeof data) {
        case 'string':
          /* data-mutiny='slider' */
          mutiny[data].init($e, $.extend({}, mutiny[data].defaults));
          break;
        default:
          /* data-mutiny='{"slider": {"some": "options"}}' */
          for(var directive in data) {
            var mutiny_func = mutiny[directive];
            var mutiny_options = $.extend({}, mutiny_func.defaults);
            var data_options = data[directive];
            if(typeof(data_options) === "string") {
              mutiny_options[mutiny_func.string_arg] = data_options;
              mutiny_func.init($e, mutiny_options);
            } else {
              mutiny_func.init($e, $.extend(mutiny_options, data_options));
            }
          }
      }
    });
    return this;
  };

  mutiny.init = function(dataAttr) {
    dataAttr = dataAttr || 'mutiny';
    $('[data-' + dataAttr + ']').mutiny();
  }

  return mutiny;
})(Mutiny || {}, jQuery);
