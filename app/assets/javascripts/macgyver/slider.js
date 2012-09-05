$.fn.macgyver = (function(){
  this.each(function(){
    var $instigator = $(this),
        defaults = {"range" : "min"};
        options = $.extend(true, {}, defaults, $instigator.data('macgyver-options') || {});

    var $ui = $('<div id="' + $instigator.attr('id').replace(/_/g,'-') + '-macgyver-slider"></div>').insertAfter($instigator);

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
        var val = parseInt($instigator.val());
        if (val > options.max) { val = options.max; }
        if (val < options.min) { val = options.min; }
        if (isNaN(val)) { val = options.value; }
        $instigator.val(val);
        $instigator.next('.ui-slider').slider('option','value',val);
      });
    }
    options.slide = function(event,slider) { $instigator.val(slider.value); };
    $ui.append('<span class="min-amount">' + options.min + '</span><span class="max-amount">' + options.max + '</span>');

    $ui.slider(options);
  });
  return this;
});

$(document).ready(function() {
  $('[data-macgyver=slider]').macgyver();
});
