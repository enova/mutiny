var NC = (function(nc, $) {
  var $body;
  
  $.fn.uiTransform = (function(){
    this.each(function(){
      var $instigator = $(this),
          ui = $instigator.data('ui'),
          defaults = {"slider" : {"range" : "min"}, "accordion" : {"autoHeight" : false, "collapsible" : true, "active" : false}},
          options = $.extend(true, {}, defaults[ui], $instigator.data('ui-options') || {}),
          needs_ui_element = !(ui == 'accordion');
      
      var $ui = (needs_ui_element) ? $('<div id="' + $instigator.attr('id').replace(/_/g,'-') + '-ui-' + ui + '"></div>').insertAfter($instigator) : $instigator;
      
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
        
        case 'accordion' :
          var hash = window.location.hash || undefined;
          var $menu = (options.menu) ? $(options.menu) : undefined;
          if (hash) {
            var active_index = -1;
            var $search = ($menu) ? $menu : $ui;
            $search.find('a').each(function(index, anchorEl){
              if ($(anchorEl).attr('href') == hash) { active_index = index; return false; }
            });
            if (active_index > -1) { options.active = active_index; }
          }
          
          if ($menu) {
            $menu.click(function(event) {
              var toggle_index = -1;
              var $target = $(event.target);
              if ($target.is("a")) {
                $menu.find('a').each(function(index, anchorEl){
                  if ($(anchorEl).attr('href') == $target.attr('href')) {
                    toggle_index = index;
                    return false;
                  };
                });
              }
              if (toggle_index > -1) { $ui.accordion("activate", toggle_index); }
            });            
          }
          break;
      }
      
      $ui[ui](options);
      
    });
    return this;
  });
  
  nc.hijackUI = function(el) {
    var $el = $(el || $body);
    return ($el.is('[data-ui]')) ? $el.uiTransform() : $el.find('[data-ui]').uiTransform();
  };
  
  
  $(function(){
    $body = $($('body').get(0));
    nc.hijackUI();
  });
  
  return nc;
}(NC || {}, jQuery));