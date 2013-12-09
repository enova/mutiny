Mutiny.widgets.toggler = {
  'defaults': {'classes': 'inactive active', 'preventDefault': false},
  'stringArg': 'target',
  'init': function($instigator, options){
    var $target = $(options.target);

    var instigatorFunc;
    var targetFunc;
    var key;
    if(options.style) {
      var noStyle = {};
      for(key in options.style) {
        noStyle[key] = $instigator.css(key);
      }
      instigatorFunc = function(on) {
        $instigator.css(on ? options.style : noStyle);
      };
    } else {
      var classes = options.classes.split(' ');
      instigatorFunc = function(on) {
        $instigator.toggleClass(classes[0], !on);
        $instigator.toggleClass(classes[1], on);
      };
    }

    if($target.length === 0){
      targetFunc = function(){};
    } else if(options.targetStyle) {
      var noTargetStyle = {};
      for(key in options.targetStyle) {
        noTargetStyle[key] = $target.css(key);
      }
      targetFunc = function(on) {
        $target.css(on ? options.targetStyle : noTargetStyle);
      };
    } else {
      var targetClasses = (options.targetClasses || options.classes).split(' ');
      targetFunc = function(on) {
        $target.toggleClass(targetClasses[0], !on);
        $target.toggleClass(targetClasses[1], on);
      };
    }

    if($instigator.is('input[type=radio]')) {
      var name = $instigator.attr("name");
      instigatorFunc($instigator.is(':checked'));
      targetFunc($instigator.is(':checked'));
      $(format('input[name="{0}"]', name)).change(function(event){
        instigatorFunc($instigator.is(':checked'));
        targetFunc($instigator.is(':checked'));
      });
    } else if($instigator.is('input[type=checkbox]')) {
      instigatorFunc($instigator.is(':checked'));
      targetFunc($instigator.is(':checked'));
      $instigator.change(function(event){
        instigatorFunc($instigator.is(':checked'));
        targetFunc($instigator.is(':checked'));
      });
    } else {
      var active = false;
      instigatorFunc(active);
      targetFunc(active);
      $instigator.click(function(event) {
        active = !active;
        instigatorFunc(active);
        targetFunc(active);

        if(options.preventDefault) {
          event.preventDefault();
        }
      });
    }
  }
};
