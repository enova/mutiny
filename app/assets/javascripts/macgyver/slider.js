(function($) {
  $.fn.macgyver.slider = (function($els){
    $els.each(function(){
      var $instigator = $(this),
          defaults = {"range" : "min"},
          options = $.extend(true, {}, defaults, $instigator.data('macgyver-options') || {});

      var $ui;
      if(options['target']) {
        $ui = $(options['target']);
      } else {
        var id = $instigator.attr('id');
        var extras = '';
        if(id) {
          extras = ' id="' + id + '-macgyver-slider"';
        }
        $ui = $('<div' + extras + '></div>').insertAfter($instigator);
      }

      options.value = $instigator.val();
      options.slide = function(event, slider) {
        /* Force trigger of .change() to propagate the value elsewhere. */
        $instigator.val(slider.value).change();
      };

      if ($instigator.is('select')) {
        var $options = $instigator.find('option');
        options.min = parseInt($options.first().val());
        options.max = parseInt($options.last().val());
        options.step = (options.max - options.min) / ($options.length - 1);
      } else {
        options.min = parseInt($instigator.attr('min') || $instigator.data('min'));
        options.max = parseInt($instigator.attr('max') || $instigator.data('max'));
        options.step = parseInt($instigator.attr('step') || $instigator.data('step'));
      }

      $instigator.change(function(){
        var val = parseInt($instigator.val());
        if (val > options.max) { val = options.max; }
        if (val < options.min) { val = options.min; }
        if (isNaN(val)) { val = options.value; }
        $instigator.val(val);
        $ui.slider('value', val);
      });

      if(options['minLabel']) {
        $ui.append('<span class="min-amount">' + options.min + '</span>');
      }
      if(options['maxLabel']) {
        $ui.append('<span class="max-amount">' + options.max + '</span>');
      }

      $ui.slider(options);

      if(options['valueLabel']) {
        /* If value does not exist, force a non-empty element draw.  Starting with empty
         * element prevents correct drawing when it has been replace with real contents.
         */
        var val = (options['value'] || '&nbsp;');
        var text = options['valueLabel'].replace('%s', '<span class="value">' + val + '</span>')
        var $valueLabel = $('<span class="value-label">' + text + '</span>').appendTo($ui.find('.ui-slider-handle'))
        var $value = $valueLabel.find('.value');
        $instigator.change(function() {
          $value.html($instigator.val());
        });
      }
    });
    return this;
  });
})(jQuery);
