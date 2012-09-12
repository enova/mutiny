var Macgyver = (function(macgyver, $) {
  $.fn.macgyver = function(dataAttr){
    dataAttr = dataAttr || 'macgyver';
    this.each(function(i, e) {
      var $e = $(e);
      var data = $e.data(dataAttr);
      switch(typeof data) {
        case 'string':
          /* data-macgyver='slider' */
          macgyver[data].init($e, {});
          break;
        default:
          /* data-macgyver='{"slider": {"some": "options"}}' */
          for(var directive in data) {
            macgyver[directive].init($e, data[directive]);
          }
      }
    });
    return this;
  };

  macgyver.init = function(dataAttr) {
    dataAttr = dataAttr || 'macgyver';
    $('[data-' + dataAttr + ']').macgyver();
  }

  return macgyver;
})(Macgyver || {}, jQuery);
