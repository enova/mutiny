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
            mutiny[directive].init($e, data[directive]);
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
