Mutiny.slider = {
  'defaults': {'range': 'min'},
  'init': function($instigator, options){
    var $ui;
    if(options.target) {
      $ui = $(options.target);
    } else {
      var id = $instigator.attr('id');
      var extras = '';
      if(id) {
        extras = ' id="' + id + '-mutiny-slider"';
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
      options.min = Number($options.first().val());
      options.max = Number($options.last().val());
      options.step = (options.max - options.min) / ($options.length - 1);
    } else {
      $.each(['min', 'max', 'step'], function(i, attr) {
        options[attr] = Number(options[attr] || $instigator.attr(attr) || $instigator.data(attr));
      });
    }

    $instigator.change(function(){
      var val = Number($instigator.val());
      if (val > options.max) { val = options.max; }
      if (val < options.min) { val = options.min; }
      if (isNaN(val)) { val = options.value; }
      $instigator.val(val);
      $ui.slider('value', val);
    });

    if(options.minLabel) {
      $ui.append(formatSpan(options.minLabel, options.min, 'min-label'));
    }
    if(options.maxLabel) {
      $ui.append(formatSpan(options.maxLabel, options.max, 'max-label'));
    }

    $ui.slider(options);

    /* Need to append the element to a DOM loaded slider so this occurs after the slider instantiation. */
    if(options.valueLabel) {
      var $valueLabel = $(formatSpan(options.valueLabel, options.value, 'value-label')).appendTo($ui.find('.ui-slider-handle'));
      var $value = $valueLabel.find('span');
      $instigator.change(function() {
        $value.html($instigator.val());
      });
    }
  }
};
