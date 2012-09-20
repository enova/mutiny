var Mutiny = (function(mutiny, $) {
  $.fn.mutiny = function(dataAttr){
    dataAttr = dataAttr || 'mutiny';
    this.each(function(i, e) {
      var $e = $(e);
      var data = $e.data(dataAttr);
      switch(typeof data) {
        case 'string':
          /* data-mutiny='slider' */
          mutiny[data].init($e, {});
          break;
        default:
          /* data-mutiny='{"slider": {"some": "options"}}' */
          for(var directive in data) {
            var mutiny_func = mutiny[directive];
            var data_options = data[directive];
            if(typeof(data_options) === "string") {
              var options = {};
              options[mutiny_func.string_arg] = data_options;
              mutiny_func.init($e, options);
            } else {
              mutiny_func.init($e, data_options);
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
