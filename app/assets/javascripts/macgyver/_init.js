(function($) {
  $.fn.macgyver = function(dataAttr){
    this.each(function(i, e) {
      var $e = $(e);
      var data = $e.data('macgyver');
      switch(typeof data) {
        case 'string':
          /* data-macgyver='slider' */
          $.fn.macgyver[data]($e, {});
          break;
        default:
          /* data-macgyver='{"slider": {"some": "options"}}' */
          for(var directive in data) {
            $.fn.macgyver[directive]($e, data[directive]);
          }
      }
    });
    return this;
  };

  $.fn.macgyver.init = function() {
    $('[data-macgyver]').macgyver();
  }
})(jQuery);
