Mutiny.toggler = {
  'defaults': {'class': 'inactive active', 'preventDefault': false},
  'string_arg': 'target',
  'init': function($instigator, options){
    var $target = $(options.target);

    var toggleFunc;
    if(options.style) {
      var noStyle = {};
      for(var key in options.style) {
        noStyle[key] = $instigator.css(key);
      }

      toggleFunc = function(on) {
        $instigator.css(on ? options.style : noStyle);
        $target.css(on ? options.style : noStyle);
      };
    } else {
      var classes = options['class'].split(' ');
      toggleFunc = function(on) {
        $instigator.toggleClass(classes[0], !on);
        $instigator.toggleClass(classes[1], on);
        $target.toggleClass(classes[0], !on);
        $target.toggleClass(classes[1], on);
      };
    }

    if($instigator.is('input[type=radio]')) {
      var name = $instigator.attr("name");
      toggleFunc($instigator.is(':checked'));
      $('input[name="'+ name +'"]').change(function(event){
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
  }
};
