var NC = (function(nc, $) {
  var $body;
    
  $.fn.uiTransform = (function(){
    this.each(function(){
      var $ui = $(this),
          ui = $ui.data('ui'),
          options = {};
          
      switch (ui) {
      case 'slider' :
        options.value = $ui.val();
        options.range = 'min';
        if ($ui.is('select')) {
          var $options = $ui.find('option');         
          options.min = parseInt($options.first().val());
          options.max = parseInt($options.last().val());
          options.step = $options.length;
        } else {
          options.min = parseInt($ui.attr('min') || $ui.data('min'));
          options.max = parseInt($ui.attr('max') || $ui.data('max'));
          options.step = parseInt($ui.attr('step') || $ui.data('step'));
          
          $ui.blur(function(){
            var $this = $(this);
            var val = parseInt($this.val());
            if (val > options.max) { val = options.max; }
            if (val < options.min) { val = options.min; }
            if (isNaN(val)) { val = options.value; }
            $this.val(val);
            $this.next('.ui-slider').slider('option','value',val);
          });
        }
        break;
      }
      options.slide = function(event,slider) { $ui.val(slider.value); };
      
      $('<div id="' + $ui.attr('id') + '-ui-' + ui + '"></div>').insertAfter($ui)[ui](options);
    });
    return this;
  });
  
  nc.hijackUI = function(el) {
    var $el = $(el || $body);
    return ($el.is('[data-ui]')) ? $el.uiTransform() : $el.find('[data-ui]').uiTransform();
  };
  
  
  $(function(){
    $body = $($('body').get(0)).addClass('js');
    nc.hijackUI();
  });
  
  return nc;
}(NC || {}, jQuery));