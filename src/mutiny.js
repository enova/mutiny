$(function(){
  if(Mutiny.options.initOnReady) {
    Mutiny.init();
  }
});

var Mutiny = window.Mutiny = {
  options: {
    initOnReady: true
  },

  widgets: {},

  init: function(els, namespace) {
    namespace = namespace || 'mutiny';

    if(!els) {
      var queries = [];
      for(var name in Mutiny.widgets) {
        if(Mutiny.widgets.hasOwnProperty(name)) {
          queries.push(format('[data-{0}-{1}]', namespace, dasherize(name)));
        }
      }
      els = document.querySelectorAll(queries.join(','));
    }

    for(var i=0; i < els.length; i++) {
      var el = els[i];
      for(name in Mutiny.widgets) {
        var attr = format('data-{0}-{1}', namespace, dasherize(name));
        var data = el.getAttribute(attr);
        if(data !== undefined) {
          var updatedOptions = initWidget(el, name, data);
          if(updatedOptions) {
            el.setAttribute(attr, JSON.stringify(updatedOptions));
          }
        }
      }
    }
  }
};

function initWidget(instigator, widgetName, instanceOptions) {
  var widget = Mutiny.widgets[widgetName];
  if(widget === undefined) {
    throw format('"{0}" not found', widgetName);
  }

  try {
    instanceOptions = instanceOptions ? JSON.parse(instanceOptions) : {};
  } catch(e) {
    e.message = format('"{0}" cannot parse "{1}"', widgetName, instanceOptions);
    throw e;
  }

  if(!instanceOptions.called) {
    for(var key in widget.defaults) {
      if(widget.defaults.hasOwnProperty(key) && !instanceOptions.hasOwnProperty(key)) {
        instanceOptions[key] = widget.defaults[key];
      }
    }
    widget.init($(instigator), instanceOptions);
    instanceOptions.called = true;
    return instanceOptions;
  }
}
