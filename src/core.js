var Mutiny = (function(mutiny, document, window){
  var mOptions = mutiny.options = {
    initOnReady: true,
    initOnInsert: false,
    namespace: 'mutiny'
  };

  var mWidgets = mutiny.widgets = {};

  var mInit = mutiny.init = function(baseEls, namespace) {
    namespace = namespace || mOptions.namespace;

    if (baseEls && !mUtil.isNodeList(baseEls)) {
      baseEls = [baseEls];
    }

    for(var name in mWidgets) {
      var attr = mUtil.format('data-{0}-{1}', namespace, mUtil.dasherize(name));

      var els = baseEls || document.querySelectorAll('[' + attr + ']');

      for(var i=0; i < els.length; i++) {
        initWidget(els[i], name, attr);
      }
    }
  };

  function initWidget(element, widgetName, attr) {
    var processedAttr = attr + '-processed';

    if(element.nodeType != 1 || !element.hasAttribute(attr) || element.hasAttribute(processedAttr)) {
      return;
    }

    var widget = mWidgets[widgetName];

    var rawOptions = element.getAttribute(attr);
    var options = parseOptions(widgetName, rawOptions);

    for(var key in widget.defaults) {
      if(widget.defaults.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
        options[key] = widget.defaults[key];
      }
    }
    element.setAttribute(processedAttr, true);
    widget.init(element, options);
  }

  function parseOptions(widgetName, rawOptions) {
    function errorMessage() {
      var description = mUtil.format.apply(null, arguments);
      return mUtil.format('"Mutiny.widgets.{0}" {1}', widgetName, description);
    }

    var widget = mWidgets[widgetName];
    if(!widget) {
      throw errorMessage('not found');
    }

    var options = {};

    if(!rawOptions || !rawOptions.length) {
      return {};
    } else if(rawOptions[0] === '{') {
      try {
        return JSON.parse(rawOptions);
      } catch(e) {
        e.message = errorMessage('cannot parse "{0}"', rawOptions);
        throw e;
      }
    } else if(rawOptions[0] === '[') {
      if(!widget.arrayArg) {
        throw errorMessage('does not define arrayArg to parse "{0}"', rawOptions);
      }

      try {
        options[widget.arrayArg] = JSON.parse(rawOptions);
        return options;
      } catch(e) {
        e.message = errorMessage('cannot parse "{0}"', rawOptions);
        throw e;
      }
    } else {
      if(!widget.stringArg) {
        throw errorMessage('does not define stringArg to parse "{0}"', rawOptions);
      }
      options[widget.stringArg] = rawOptions;
      return options;
    }
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

    onInsert: (function(){
      var callbacks;
      var lastTimeout;

      function debouncedCallback() {
        clearTimeout(lastTimeout);
        lastTimeout = setTimeout(onCallback, 30);
      }

      function onCallback() {
        for(var i=0; i < callbacks.length; i++) {
          callbacks[i]();
        }
      }

      return function(fn) {
        if(!callbacks) {
          callbacks = [];

          if(window.MutationObserver) {
            var observer = new MutationObserver(debouncedCallback);
            observer.observe(document, { childList: true, subtree: true });
          } else {
            document.addEventListener('DOMNodeInserted', debouncedCallback);
          }
        }

        callbacks.push(fn);
      }
    })(),

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

    isNodeList: function(obj){
      return (obj instanceof NodeList) || !!obj.splice
    },
  };

  mUtil.onReady(function(){
    if(mOptions.initOnReady) {
      mInit();
    }

    if(mOptions.initOnInsert) {
      mUtil.onInsert(mInit);
    }
  });

  return mutiny;
})({}, document, window);
