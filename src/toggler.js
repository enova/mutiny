Mutiny.toggler = {
  'defaults': {'style': {'display': 'none'}, 'preventDefault': false, 'instigatorClass': 'active'},
  'string_arg': 'target',
  'init': function($instigator, options){
    var $target = $(options.target);

    var targetFunc;
    if(options['class']) {
      targetFunc = function(on) {
        $target.toggleClass(options['class'], on);
      };
    } else {
      var noStyle = {};
      for(var key in options.style) {
        noStyle[key] = $target.css(key);
      }

      targetFunc = function(on) {
        $target.css(on ? options.style : noStyle);
      };
    }

    if($instigator.is('input[type=radio]')) {
      var name = $instigator.attr("name");
      $('input[name="'+ name +'"]').change(function(event){
        var active = $instigator.is(':checked');
        $instigator.toggleClass(options.instigatorClass, active);
        targetFunc(active);
      });
    } else {
      var active = false;
      $instigator.click(function(event) {
        active = !active;
        $instigator.toggleClass(options.instigatorClass, active);
        targetFunc(active);

        if(options.preventDefault) {
          event.preventDefault();
        }
      });
    }
  }
};
