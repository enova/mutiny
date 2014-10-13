function toggleFunc($e, style, classes){
  if($e.length === 0){
    return function(){};
  } else if(style) {
    var noStyle = {};
    for(var key in style) {
      noStyle[key] = $e.css(key);
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

Mutiny.widgets.toggler = {
  'defaults': {'classes': 'inactive active', 'preventDefault': false},
  'init': function(instigator, options){
    var $instigator = $(instigator);
    var $target = $(options.target);

    var instigatorFunc = toggleFunc($instigator, options.style, options.classes);
    var targetFunc = toggleFunc($target, options.targetStyle, options.targetClasses || options.classes);

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
