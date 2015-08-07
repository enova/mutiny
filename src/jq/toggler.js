Mutiny.widgets.jqToggler = {
  stringArg: 'target',

  defaults: {
    'classes': 'inactive active',
    'targetClasses': null,
    'preventDefault': false,
    'autoFocusTarget': false
  },

  init: function(instigator, options){
    var $instigator = $(instigator);
    var $target = $(options.target);

    var self = this;
    var toggleFunc = (function() {
      var instigatorFunc = self.toggleFunc($instigator, options.style, options.classes);
      var targetFunc = self.toggleFunc($target, options.targetStyle, options.targetClasses || options.classes);

      return function(toggleValue) {
        instigatorFunc(toggleValue);
        targetFunc(toggleValue);
        if(options.autoFocusTarget) {
          $target.trigger(toggleValue ? 'focusin' : 'focusout');
        }
      };
    })();

    if($instigator.is('input[type=radio]')) {
      var name = $instigator.attr("name");
      toggleFunc($instigator.is(':checked'));
      $(Mutiny.util.format('input[name="{0}"]', name)).change(function(event){
        toggleFunc($instigator.is(':checked'));
      });
    } else if($instigator.is('input[type=checkbox]')) {
      toggleFunc($instigator.is(':checked'));
      $instigator.change(function(event){
        toggleFunc($instigator.is(':checked'));
      });
    } else {
      var active = false;
      toggleFunc(active);
      $instigator.click(function(event) {
        active = !active;
        toggleFunc(active);

        if(options.preventDefault) {
          event.preventDefault();
        }
      });
    }
  },

  toggleFunc: function($e, style, classes){
    if($e.length === 0){
      return function(){};
    } else if(style) {
      var noStyle = {};
      for(var key in style) {
        if(style.hasOwnProperty(key)){
          noStyle[key] = $e.css(key);
        }
      }
      return function(on) {
        $e.css(on ? style : noStyle);
      };
    } else {
      classes = classes.split(' ');
      return function(on) {
        $e.toggleClass(classes[0], !on);
        $e.toggleClass(classes[1], on);
      };
    }
  }
};
