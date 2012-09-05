(function($, undefined) {
  $.fn.macgyver = (function(value){
    $.fn.macgyver[value](this);
  });

  $(document).ready(function() {
    for(var attr in $.fn.macgyver) {
      $('[data-macgyver=' + attr + ']').macgyver(attr);
    }
  });
})(jQuery);
