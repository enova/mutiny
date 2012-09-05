var NC = (function(nc, $) {
  var $body;
  
  $.fn.uiTransform = (function(){
    this.each(function(){
      var $instigator = $(this),
          ui = $instigator.data('ui'),
          defaults = {"accordion" : {"autoHeight" : false, "collapsible" : true, "active" : false}},
          options = $.extend(true, {}, defaults[ui], $instigator.data('ui-options') || {}),
          needs_ui_element = !(ui == 'accordion');
      
      var $ui = (needs_ui_element) ? $('<div id="' + $instigator.attr('id').replace(/_/g,'-') + '-ui-' + ui + '"></div>').insertAfter($instigator) : $instigator;
      
      switch (ui) {
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
  
  $.fn.initWizard = (function(){
    this.each(function(){
      var $wizard = $(this),
          wizard = $wizard.data('wizard');
          
          switch (wizard) {
            case 'paydate' :
              var paydate_wizard = new PaydateWizard($wizard);
              paydate_wizard.decorate();
              break;
          }    
      });
    return this;
  });
  
  nc.hijackUI = function(el) {
    var $el = $(el || $body);
    //return ($el.is('[data-ui]')) ? $el.uiTransform() : $el.find('[data-ui]').uiTransform();
  };
  
  nc.wizzo = function (el) {
    var $el = $(el || $body);        
    return ($el.is('[data-wizard]')) ? $el.initWizard() : $el.find('[data-wizard]').initWizard();
  };
  
  $(function(){
    $body = $($('body').get(0));
    nc.hijackUI();
    nc.wizzo();
  });
  
  return nc;
}(NC || {}, jQuery));
