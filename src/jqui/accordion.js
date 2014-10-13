Mutiny.widgets.jquiAccordion = {
  defaults: {},
  init: function(instigator, options){
    var $instigator = $(instigator);
    var hash = window.location.hash;
    if(hash && $instigator.find(hash).length > 0) {
      options.active = hash;
    }
    $instigator.accordion(options);

    $(window).on('hashchange', function(event) {
      var hash = window.location.hash;
      if(hash && $instigator.find(hash).length > 0) {
        $instigator.accordion('activate', hash);
      }
    });
  }
};
