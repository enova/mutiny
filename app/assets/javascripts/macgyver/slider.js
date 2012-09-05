$.fn.macGyver = (function(){
  this.each(function(){
    var $instigator = $(this),
        ui = $instigator.data('ui'),
        defaults = {"slider" : {"range" : "min"}};
        options = $.extend(true, {}, defaults[ui], $instigator.data('ui-options') || {}),
    
    var $ui = $('<div id="' + $instigator.attr('id').replace(/_/g,'-') + '-ui-' + ui + '"></div>').insertAfter($instigator);
    
    switch (ui) {
    case 'slider' :
      options.value = $instigator.val();
      if ($instigator.is('select')) {
        var $options = $instigator.find('option');         
        options.min = parseInt($options.first().val());
        options.max = parseInt($options.last().val());
        options.step = $options.length;
      } else {
        options.min = parseInt($instigator.attr('min') || $instigator.data('min'));
        options.max = parseInt($instigator.attr('max') || $instigator.data('max'));
        options.step = parseInt($instigator.attr('step') || $instigator.data('step'));
        
        $instigator.blur(function(){
          var $this = $(this);
          var val = parseInt($this.val());
          if (val > options.max) { val = options.max; }
          if (val < options.min) { val = options.min; }
          if (isNaN(val)) { val = options.value; }
          $this.val(val);
          $this.next('.ui-slider').slider('option','value',val);
        });
      }
      options.slide = function(event,slider) { $instigator.val(slider.value); };
      $ui.append('<span class="min-amount">' + options.min + '</span><span class="max-amount">' + options.max + '</span>');
      break;
    }
    
    $ui[ui](options);
    
  });
  return this;
});

$(document).ready(function() {
  $('[data-ui]').macGyver();
});
