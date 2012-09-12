var Macgyver = function(macgyver, $) {
  macgyver.slider = {
    'defaults': {'range': 'min'},
    'init': function($instigator, options){
      options = $.extend({}, this.defaults, options);

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

      options['value'] = $instigator.val();
      options['slide'] = function(event, slider) {
        /* Force trigger of .change() to propagate the value elsewhere. */
        $instigator.val(slider.value).change();
      };

      if ($instigator.is('select')) {
        var $options = $instigator.find('option');
        options['min'] = parseInt($options.first().val());
        options['max'] = parseInt($options.last().val());
        options['step'] = (options['max'] - options['min']) / ($options.length - 1);
      } else {
        options['min'] = parseInt($instigator.attr('min') || $instigator.data('min'));
        options['max'] = parseInt($instigator.attr('max') || $instigator.data('max'));
        options['step'] = parseInt($instigator.attr('step') || $instigator.data('step'));
      }

      $instigator.change(function(){
        var val = parseInt($instigator.val());
        if (val > options['max']) { val = options['max']; }
        if (val < options['min']) { val = options['min']; }
        if (isNaN(val)) { val = options['value']; }
        $instigator.val(val);
        $ui.slider('value', val);
      });

      /* >> newLabel('hamlet', 'romeo%sjuliet', 'othello');
         -> '<span class="hamlet">romeo<span>othello</span>juliet</span>'
       */
      var newLabel = function(className, format, value) {
        var inner = format.replace('%s', '<span>' + value + '</span>');
        return '<span class="' + className + '">' + inner + '</span>';
      };
      if(options['minLabel']) {
        $ui.append(newLabel('min-label', options['minLabel'], options['min']));
      }
      if(options['maxLabel']) {
        $ui.append(newLabel('max-label', options['maxLabel'], options['max']));
      }

      $ui.slider(options);

      /* Need to append the element to a DOM loaded slider so this occurs after the slider instantiation. */
      if(options['valueLabel']) {
        /* If value does not exist, force a non-empty element draw.  Starting with empty
         * element prevents correct drawing when it has been replace with real contents.
         */
        var val = (options['value'] || '&nbsp;');
        var $valueLabel = $(newLabel('value-label', options['valueLabel'], val)).appendTo($ui.find('.ui-slider-handle'));
        var $value = $valueLabel.find('span');
        $instigator.change(function() {
          $value.html($instigator.val());
        });
      }
    }
  };

  return macgyver;
}(Macgyver || {}, jQuery);
