var Mutiny = window.Mutiny = {
  options: {
    initOnReady: true,
    namespace: 'mutiny'
  },

  widgets: {},

  init: function(els, namespace) {
    namespace = namespace || Mutiny.options.namespace;
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

    var processed = Mutiny.util.format('data-{0}', namespace);
    for(var i=0; i < els.length; i++) {
      var el = els[i];
      if(el.hasAttribute(processed)){
        continue;
      }

      el.setAttribute(processed, 'processed');

      for(name in Mutiny.widgets) {
        var attr = Mutiny.util.format('data-{0}-{1}', namespace, Mutiny.util.dasherize(name));
        if(el.hasAttribute(attr)){
          Mutiny.util.initWidget(el, name, el.getAttribute(attr));
        }
      }
    }
  },

  util: {
    onReady: function(fn){
      var onLoad;

      if(document.readyState === 'complete'){
        fn();
      } else if(document.addEventListener){
        onLoad = function(){
          document.removeEventListener('DOMContentLoaded', onLoad);
          window.removeEventListener('load', onLoad);
          fn();
        };

        document.addEventListener('DOMContentLoaded', onLoad);
        window.addEventListener('load', onLoad);
      } else {
        onLoad = function(){
          document.detachEvent('onreadystatechange', onLoad);
          window.detachEvent('onload', onLoad);
          fn();
        };

        document.attachEvent('onreadystatechange', onLoad);
        window.attachEvent('onload', onLoad);
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
      return function(str){
        for(var i=1; i < arguments.length; i++){
          var r = i-1;
          var regex = regexes[r];
          if(!regex){
            regex = regexes[r] = new RegExp('\\{' + r + '\\}', 'gm');
          }
          str = str.replace(regex, arguments[i]);
        }

        return str;
      };
    }(),

    isString: function(obj){
      return !!obj.substring;
    },

    isArray: function(obj){
      return obj.length !== undefined;
    },

    initWidget: function(instigator, widgetName, rawInstanceOptions) {
      var widget = Mutiny.widgets[widgetName];
      if(!widget) {
        throw Mutiny.util.format('"Mutiny.widget.{0}" not found', widgetName);
      }

      var instanceOptions = {};

      if(!rawInstanceOptions || !rawInstanceOptions.length) {
        // Use empty object
      } else if(rawInstanceOptions[0] === '{') {
        try {
          instanceOptions = JSON.parse(rawInstanceOptions);
        } catch(e) {
          e.message = Mutiny.util.format('"Mutiny.widget.{0}" cannot parse "{1}"', widgetName, rawInstanceOptions);
          throw e;
        }
      } else if(rawInstanceOptions[0] === '[') {
        if(!widget.arrayArg) {
          throw Mutiny.util.format('"Mutiny.widget.{0}" does not define arrayArg to parse "{1}"', widgetName, rawInstanceOptions);
        }

        try {
          instanceOptions[widget.arrayArg] = JSON.parse(rawInstanceOptions);
        } catch(e) {
          e.message = Mutiny.util.format('"Mutiny.widget.{0}" cannot parse "{1}"', widgetName, rawInstanceOptions);
          throw e;
        }
      } else {
        if(!widget.stringArg) {
          throw Mutiny.util.format('"Mutiny.widget.{0}" does not define stringArg to parse "{1}"', widgetName, rawInstanceOptions);
        }
        instanceOptions[widget.stringArg] = rawInstanceOptions;
      }

      for(var key in widget.defaults) {
        if(widget.defaults.hasOwnProperty(key) && !instanceOptions.hasOwnProperty(key)) {
          instanceOptions[key] = widget.defaults[key];
        }
      }
      widget.init(instigator, instanceOptions);
    }
  }
};

Mutiny.util.onReady(function(){
  if(Mutiny.options.initOnReady) {
    Mutiny.init();
  }
});
