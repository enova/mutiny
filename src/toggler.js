var Mutiny = function(mutiny, $) {
  mutiny.toggler = {
    'defaults': {'class': 'active', 'preventDefault':true},
    'string_arg': 'target',
    'init': function($instigator, options){
      var $target = $(options.target);

      var cssInitial = null;
      if(options.css) {
        cssInitial = {};
        for(var key in options.css) {
          cssInitial[key] = '';
        }
      }
      $instigator.click(function(event) {
        if($instigator.hasClass(options['class'])) {
          $instigator.removeClass(options['class']);
          $target.removeClass(options['class']);
          if(cssInitial) {
            $target.css(cssInitial);
          }
        } else {
          $instigator.addClass(options['class']);
          $target.addClass(options['class']);
          if(cssInitial) {
            $target.css(options.css);
          }
        }

        if(options.preventDefault) {
          event.preventDefault();
        }
      });
    }
  };

  return mutiny;
}(Mutiny || {}, jQuery);
