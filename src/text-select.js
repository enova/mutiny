Mutiny.widgets.textSelect = {
  stringArg: 'trigger',

  defaults: {
    trigger: 'click'
  },

  init: function(instigator, options){
    var range;
    var selectFunc;
    if(document.body.createTextRange) {
      range = document.body.createTextRange();
      selectFunc = function(){
        range.moveToElementText(instigator);
        range.select();
      };
    } else if(window.getSelection) {
      var selection = window.getSelection();
      range = document.createRange();
      selectFunc = function(){
        range.selectNodeContents(instigator);
        selection.removeAllRanges();
        selection.addRange(range);
      };
    }

    var triggers = options.trigger.split();
    for(var i=0; i < triggers.length; i++){
      instigator.addEventListener(triggers[i], selectFunc);
    }
  }
};
