Mutiny.widgets.jqAjaxReplace = {
  defaults: {
    loadingClass: 'loading',
    errorClass: 'error',
  },

  init: function(instigator, options){
    var $instigator = $(instigator);

    options.success = function(data, textStatus, xhr){
      $instigator.removeClass(options.loadingClass);
      $instigator.html(data);
      Mutiny.init();
    };

    options.error = function(xhr, textStatus, errorThrown){
      $instigator.removeClass(options.loadingClass).addClass(options.errorClass);
      $instigator.html(xhr.responseText);
    };

    $instigator.addClass(options.loadingClass)
    $.ajax(options);
  }
};
