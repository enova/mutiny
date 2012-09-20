var Mutiny = function(mutiny, $, undefined) {
  mutiny.accordion = {
    'defaults': {'autoHeight': false, 'collapsible': true, 'active': false},
    '_hrefIndex': function($search, href) {
      var active_index = -1;
      $search.find('a').each(function(index, anchorEl){
        if ($(anchorEl).attr('href') == href) { active_index = index; return false; }
      });
      return active_index;
    },
    'init': function($instigator, options){
      var hash = window.location.hash || undefined;
      var $menu = (options['menu']) ? $(options['menu']) : undefined;
      if (hash) {
        var active_index = this._hrefIndex($menu || $instigator, hash);
        if (active_index > -1) { options['active'] = active_index; }
      }

      if ($menu) {
        var self = this;
        $menu.find('a').click(function(event) {
          var toggle_index = self._hrefIndex($menu, $(event.target).attr('href'));
          if (toggle_index > -1) { $instigator.accordion("activate", toggle_index); }
        });
      }

      $instigator.accordion(options);
    }
  };

  return mutiny;
}(Mutiny || {}, jQuery);
