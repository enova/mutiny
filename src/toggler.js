var Mutiny = function(mutiny, $) {
  mutiny.toggler = {
    'defaults': {'class': 'active'},
    'string_arg': 'target',
    'init': function($instigator, options){
      var $target = $(options.target);

      var css_initial = null;
      if(options.css) {
        css_initial = {};
        for(var key in options.css) {
          css_initial[key] = $target.css(key) || '';
        }
      }
      $instigator.click(function() {
        if($instigator.hasClass(options['class'])) {
          $instigator.removeClass(options['class']);
          $target.removeClass(options['class']);
          if(css_initial) {
            $target.css(css_initial);
          }
        } else {
          $instigator.addClass(options['class']);
          $target.addClass(options['class']);
          if(css_initial) {
            $target.css(options.css);
          }
        }
      });
    }
  };

  return mutiny;
}(Mutiny || {}, jQuery);
