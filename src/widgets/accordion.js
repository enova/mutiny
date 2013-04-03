Mutiny.accordion = {
  'defaults': {'autoHeight': false, 'collapsible': true, 'active': false},
  'init': function($instigator, options){
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
