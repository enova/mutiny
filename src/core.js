var Mutiny = window.Mutiny = {
  options: {
    initOnReady: true
  },

  widgets: {},

  util: {
    onReady: function(fn){
      if(document.readyState === 'complete'){
        fn();
      } else if(document.addEventListener){
        document.addEventListener('DOMContentLoaded', function wrapper(){
          document.removeEventListener('DOMContentLoaded', wrapper);
          fn();
        });
      } else {
        document.attachEvent('onreadystatechange', function wrapper(){
          document.detachEvent('onreadystatechange', wrapper);
          fn();
        });
      }
    },

    dasherize: function(string){
      string = string.replace(/[^a-z]+/ig, '-');
      return string.replace(/(.?)([A-Z])/g, function(match, prev, cap){
        if(prev) {
          return prev + '-' + cap.toLowerCase();
        } else {
          return cap.toLowerCase();
        }
      });
    },

    format: function(){
      var regexes = [];
      for(var i=0; i < 10; i++) {
        regexes[i] = new RegExp('\\{' + i + '\\}', 'gm');
      }

      return function() {
        var s = arguments[0];
        for(var i=1; i < arguments.length; i++) {
          s = s.replace(regexes[i-1], arguments[i]);
        }

        return s;
      };
    }(),

    isString: function(obj){
      return !!obj.substring;
    },

    isArray: function(obj){
      return obj.length !== undefined;
    }
  },

  init: function(els, namespace) {
    namespace = namespace || 'mutiny';
    var name;

    if(!els) {
      var queries = [];
      for(name in Mutiny.widgets) {
        if(Mutiny.widgets.hasOwnProperty(name)) {
          queries.push(Mutiny.util.format('[data-{0}-{1}]', namespace, Mutiny.util.dasherize(name)));
        }
      }
      els = document.querySelectorAll(queries.join(','));
    } else if(!Mutiny.util.isArray(els)) {
      els = [els];
    }

    for(var i=0; i < els.length; i++) {
      var el = els[i];
      for(name in Mutiny.widgets) {
        var attr = Mutiny.util.format('data-{0}-{1}', namespace, Mutiny.util.dasherize(name));
        if(el.hasAttribute(attr)){
          var data = el.getAttribute(attr);
          var updatedOptions = initWidget(el, name, data);
          if(updatedOptions) {
            el.setAttribute(attr, JSON.stringify(updatedOptions));
          }
        }
      }
    }
  }
};

Mutiny.util.onReady(function(){
  if(Mutiny.options.initOnReady) {
    Mutiny.init();
  }
});

function initWidget(instigator, widgetName, instanceOptions) {
  var widget = Mutiny.widgets[widgetName];
  if(widget === undefined) {
    throw Mutiny.util.format('"{0}" not found', widgetName);
  }

  try {
    instanceOptions = instanceOptions ? JSON.parse(instanceOptions) : {};
  } catch(e) {
    e.message = Mutiny.util.format('"{0}" cannot parse "{1}"', widgetName, instanceOptions);
    throw e;
  }

  if(!instanceOptions.called) {
    for(var key in widget.defaults) {
      if(widget.defaults.hasOwnProperty(key) && !instanceOptions.hasOwnProperty(key)) {
        instanceOptions[key] = widget.defaults[key];
      }
    }
    widget.init(instigator, instanceOptions);
    instanceOptions.called = true;
    return instanceOptions;
  }
}
