Mutiny.widgets.jqAjaxReplace = {
  stringArg: 'url',

  defaults: {
    loadingClass: 'loading',
    errorClass: 'error',
    onLoad: Mutiny.init
  },

  init: function(instigator, options){
    var $instigator = $(instigator);

    options.success = function(data, textStatus, xhr){
      $instigator.removeClass(options.loadingClass);
      $instigator.html(data);
      options.onLoad();
    };

    options.error = function(xhr, textStatus, errorThrown){
      $instigator.removeClass(options.loadingClass).addClass(options.errorClass);
      $instigator.html(xhr.responseText);
      options.onLoad();
    };

    $instigator.addClass(options.loadingClass);
    $.ajax(options);
  }
};
