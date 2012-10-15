var Mutiny = function(mutiny, $) {
  mutiny.datepicker = {
    'init': function($instigator, options) {
      $instigator.datepicker();
    }
  };

  return mutiny;
}(Mutiny || {}, jQuery);
