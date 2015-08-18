Mutiny.widgets.jqToggler = {
  stringArg: 'target',

  defaults: {
    'classes': 'inactive active',
    'targetClasses': null,
    'preventDefault': false,
    'autoFocusTarget': false
  },

  init: function(instigator, options){
    function idEscape(value) {
      var idOnly = /^[a-zA-Z0-9_-]+$/;
      if(value && idOnly.test(value)) {
        return Mutiny.util.format('{0},#{0}', value);
      } else {
        return value;
      }
    }

    var $instigator = $(instigator);
    var $target = $(idEscape(options.target));

    var toggleFuncs = [
      this.toggleFunc($instigator, options.style, options.classes)
    ];
    if($target.length) {
      toggleFuncs.push(this.toggleFunc($target, options.targetStyle || options.style, options.targetClasses || options.classes));
    }
    if(options.autoFocusTarget) {
      var $focusable = $target.filter(':focusable');
      if($focusable.length) {
        toggleFuncs.push(function(isOn) {
          $focusable.trigger(isOn ? 'focus' : 'blur');
        });
      }

      var $unfocusable = $target.filter(':not(:focusable)');
      if($unfocusable.length) {
        toggleFuncs.push(function(isOn) {
          $unfocusable.trigger(isOn ? 'focusin' : 'focusout');
        });
      }
    }

    function toggleFunc(isOn) {
      for(var i=0; i < toggleFuncs.length; i++) {
        var func = toggleFuncs[i];
        func(isOn);
      }
    }

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

    return {
      $instigator: $instigator,
      $target: $target,
      toggleFunc: toggleFunc,
    };
  },

  toggleFunc: function($e, style, classes){
    if(style) {
      var noStyle = {};
      for(var key in style) {
        if(style.hasOwnProperty(key)){
          noStyle[key] = $e.css(key);
        }
      }
      return function(isOn) {
        $e.css(isOn ? style : noStyle);
      };
    } else {
      classes = classes.split(' ');
      return function(isOn) {
        $e.toggleClass(classes[0], !isOn)
          .toggleClass(classes[1], isOn);
      };
    }
  }
};
