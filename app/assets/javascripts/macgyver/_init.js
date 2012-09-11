(function($) {
  $.fn.macgyver = function(){
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
            console.log(data[directive]);
            $.fn.macgyver[directive]($e, data[directive]);
          }
      }
    });
    return this;
  };

  $(document).ready(function() {
    $('[data-macgyver]').macgyver();
  });
})(jQuery);
