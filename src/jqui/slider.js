function formatSpan(f, startValue, className) {
  var inner = f.replace('%s', Mutiny.util.format('<span>{0}</span>', startValue || '&nbsp;'));
  if(className) {
    return Mutiny.util.format('<span class="{0}">{1}</span>', className, inner);
  } else {
    return Mutiny.util.format('<span>{0}</span>', inner);
  }
}

Mutiny.widgets.jquiSlider = {
  defaults: {'range': 'min'},
  init: function(instigator, options){
    var $instigator = $(instigator);
    var $ui;
    if(options.target) {
      $ui = $(options.target);
    } else {
      var id = $instigator.attr('id');
      if(id) {
        $ui = $(Mutiny.util.format('<div id="{0}-mutiny-slider"></div>', id));
      } else {
        $ui = $('<div></div>');
      }
      $ui.insertAfter($instigator);
    }

    options.value = $instigator.val();
    options.slide = function(event, slider) {
      /* Force trigger of .change() to propagate the value elsewhere. */
      $instigator.val(slider.value).change();
    };

    $.each(['min', 'max', 'step'], function(i, attr) {
      options[attr] = Number(options[attr] || $instigator.attr(attr) || $instigator.data(attr));
    });

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
