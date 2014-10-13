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

  init: function(es, namespace) {
    namespace = namespace || 'mutiny';

    var queries = [];
    for(var name in Mutiny.widgets) {
      queries.push(format('[data-{0}-{1}]', namespace, dasherize(name)));
    }

    if(!es) {
      es = document.querySelectorAll(queries.join(','));
    }
    for(var i=0; i < es.length; i++) {
      var e = es[i];
      for(name in Mutiny.widgets) {
        var attr = format('data-{0}-{1}', namespace, dasherize(name));
        var data = e.getAttribute(attr);
        if(data !== undefined) {
          var updatedOptions = initWidget(e, name, data);
          if(updatedOptions) {
            e.setAttribute(attr, JSON.stringify(updatedOptions));
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
    widget.init($(instigator), $.extend({}, widget.defaults, instanceOptions));
    instanceOptions.called = true;
    return instanceOptions;
  }
}
