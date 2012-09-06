(function($, undefined) {
  $.fn.macgyver.accordion = (function($els){
    $els.each(function(){
      var $instigator = $(this),
          defaults = {"autoHeight" : false, "collapsible" : true, "active" : false},
          options = $.extend(true, {}, defaults, $instigator.data('macgyver-options') || {});

      var hash = window.location.hash || undefined;
      var $menu = (options.menu) ? $(options.menu) : undefined;
      if (hash) {
        var active_index = -1;
        var $search = ($menu) ? $menu : $instigator;
        $search.find('a').each(function(index, anchorEl){
          if ($(anchorEl).attr('href') == hash) { active_index = index; return false; }
        });
        if (active_index > -1) { options.active = active_index; }
      }

      if ($menu) {
        $menu.click(function(event) {
          var toggle_index = -1;
          var $target = $(event.target);
          if ($target.is("a")) {
            $menu.find('a').each(function(index, anchorEl){
              if ($(anchorEl).attr('href') == $target.attr('href')) {
                toggle_index = index;
                return false;
              };
            });
          }
          if (toggle_index > -1) { $instigator.accordion("activate", toggle_index); }
        });
      }

      $instigator.accordion(options);
    });
    return this;
  });
})(jQuery);
