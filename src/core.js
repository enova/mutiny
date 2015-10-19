var Mutiny = (function(mutiny, document, window){
  var mOptions = mutiny.options = {
    initOnReady: true,
    initOnInsert: false,
    namespace: 'mutiny'
  };

  var mWidgets = mutiny.widgets = {};

  mutiny.init = function(els, namespace) {
    namespace = namespace || mOptions.namespace;
    var name;

    for(name in mWidgets) {
      var attr = mUtil.format('data-{0}-{1}', namespace, mUtil.dasherize(name));
      var processedAttr = attr + '-processed';

      var widgetEls = findElements(els, attr);
      for(var i=0; i < widgetEls.length; i++) {
        var el = widgetEls[i];
        if(!el.hasAttribute(processedAttr)) {
          el.setAttribute(processedAttr, 'processed');
          initWidget(el, name, el.getAttribute(attr));
        }
      }
    }
  };

  function findElements(baseEls, attr) {
    if(!baseEls) {
      var query = '[' + attr + ']';
      return document.querySelectorAll(query);
    }

    if(!mUtil.isArray(baseEls)) {
      baseEls = [baseEls];
    }

    var filtered = [];
    for(var i=0; i < baseEls.length; i++) {
      var el = baseEls[i];
      if(el.nodeType === 1 && el.hasAttribute(attr)) {
        filtered.push(el);
      }
    }
    return filtered;
  }

  function initWidget(element, widgetName, instanceOptions) {
    function errorMessage() {
      var description = mUtil.format.apply(null, arguments);
      return mUtil.format('"Mutiny.widgets.{0}" {1}', widgetName, description);
    }

    var widget = mWidgets[widgetName];
    if(!widget) {
      throw errorMessage('not found');
    }

    var options = {};

    if(!instanceOptions || !instanceOptions.length) {
      // Use empty object
    } else if(instanceOptions[0] === '{') {
      try {
        options = JSON.parse(instanceOptions);
      } catch(e) {
        e.message = errorMessage('cannot parse "{0}"', instanceOptions);
        throw e;
      }
    } else if(instanceOptions[0] === '[') {
      if(!widget.arrayArg) {
        throw errorMessage('does not define arrayArg to parse "{0}"', instanceOptions);
      }

      try {
        options[widget.arrayArg] = JSON.parse(instanceOptions);
      } catch(e) {
        e.message = errorMessage('cannot parse "{0}"', instanceOptions);
        throw e;
      }
    } else {
      if(!widget.stringArg) {
        throw errorMessage('does not define stringArg to parse "{0}"', instanceOptions);
      }
      options[widget.stringArg] = instanceOptions;
    }

    for(var key in widget.defaults) {
      if(widget.defaults.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
        options[key] = widget.defaults[key];
      }
    }
    widget.init(element, options);
  }

  var mUtil = mutiny.util = {
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

    onInsert: function(fn){
      if(typeof MutationObserver === 'function') {
        var observer = new MutationObserver(function(mutations) {
          for(var i = 0; i < mutations.length; i++) {
            fn(mutations[i].addedNodes);
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      } else {
        document.addEventListener('DOMNodeInserted', function(event) {
          fn(event.target);
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

    format: (function(){
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
    })(),

    isString: function(obj){
      return !!obj.substring;
    },

    isArray: function(obj){
      return !!obj.splice
    },
  };

  mUtil.onReady(function(){
    if(mOptions.initOnReady) {
      mutiny.init();
    }

    if(mOptions.initOnInsert) {
      mUtil.onInsert(mutiny.init);
    }
  });

  return mutiny;
})({}, document, window);
