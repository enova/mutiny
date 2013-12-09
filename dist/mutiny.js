/*! Mutiny v0.3.0 - http://mutinyjs.com/ */
(function(window, undefined) {
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

  init: function($es, namespace) {
    namespace = namespace || 'mutiny';

    /* Deprecated.  data-mutiny="widget" should be data-mutiny-widget="" */
    $find($es, format('[data-{0}]', namespace)).each(function(i, e) {
      var $e = $(e);
      var directives = $e.data(namespace);
      if(isString(directives)) {
        /* data-mutiny='slider' */
        initWidget($e, directives, {});
      } else if(typeof data === 'object') {
        /* data-mutiny='{"slider": {"some": "options"}}' */
        for(var directive in directives) {
          initWidget($e, directive, directives[directive]);
        }
      } else {
        throw 'Unsupported data';
      }
    });

    var queries = [];
    for(var name in Mutiny.widgets) {
      queries.push(format('[data-{0}-{1}]', namespace, dasherize(name)));
    }
    var $needWidgets = $find($es, queries.join(','));
    for(var i=0; i < $needWidgets.length; i++) {
      var $e = $($needWidgets[i]);
      for(name in Mutiny.widgets) {
        var key = format('{0}-{1}', namespace, name);
        var data = $e.data(key);
        if(data !== undefined) {
          var updatedOptions = initWidget($e, name, data);
          if(updatedOptions) {
            $e.data(key, updatedOptions);
          }
        }
      }
    }
  }
};

function $find($es, arg) {
  return $es ? $es.filter(arg) : $(arg);
}

function initWidget($instigator, widgetName, instanceOptions) {
  /* Deprecated: Mutiny.<widgetName> should be Mutiny.widgets.<widgetName> */
  var widget = Mutiny.widgets[widgetName] || Mutiny[widgetName];
  if(widget === undefined) {
    throw format('"{0}" not found', widgetName);
  }

  instanceOptions = instanceOptions || {};
  if(isString(instanceOptions)) {
    var replacementOptions = {};
    /* Deprecated: <widget>.string_arg should be <widget>.stringArg */
    if(widget.string_arg) {
      replacementOptions[widget.string_arg] = instanceOptions;
    } else if(widget.stringArg) {
      replacementOptions[widget.stringArg] = instanceOptions;
    } else {
      throw format('"{0}" cannot parse "{1}"', widgetName, instanceOptions);
    }
    instanceOptions = replacementOptions;
  }

  if(!instanceOptions.called) {
    widget.init($instigator, $.extend({}, widget.defaults, instanceOptions));
    instanceOptions.called = true;
    return instanceOptions;
  }
}

function dasherize(string) {
  return $.map(string.split(/(?=[A-Z])/),
               function(t){ return t.toLowerCase(); }).join('-');
}

function lowerCaseFirst(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function startsWith(string, match) {
  return string.indexOf(match) === 0;
}

var format = function() {
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
}();

function isString(obj) {
  return !!obj.substring;
}

Mutiny.widgets.accordion = {
  'defaults': {},
  'init': function($instigator, options){
    var hash = window.location.hash;
    if(hash && $instigator.find(hash).length > 0) {
      options.active = hash;
    }
    $instigator.accordion(options);

    $(window).on('hashchange', function(event) {
      var hash = window.location.hash;
      if(hash && $instigator.find(hash).length > 0) {
        $instigator.accordion('activate', hash);
      }
    });
  }
};

Mutiny.widgets.datepicker = {
  'init': function($instigator, options) {
    $instigator.datepicker(options);
  }
};

function formatSpan(f, startValue, className) {
  var inner = f.replace('%s', format('<span>{0}</span>', startValue || '&nbsp;'));
  if(className) {
    return format('<span class="{0}">{1}</span>', className, inner);
  } else {
    return format('<span>{0}</span>', inner);
  }
}

Mutiny.widgets.slider = {
  'defaults': {'range': 'min'},
  'init': function($instigator, options){
    var $ui;
    if(options.target) {
      $ui = $(options.target);
    } else {
      var id = $instigator.attr('id');
      if(id) {
        $ui = $(format('<div id="{0}-mutiny-slider"></div>', id));
      } else {
        $ui = $('<div></div>');
      }
      $ui.insertAfter($instigator);
    }

    options.value = $instigator.val();
    options.slide = function(event, slider) {
      /* Force trigger of .change() to propagate the value elsewhere. */
      $instigator.val(slider.value).change();
    };

    /* Deprecated.  No more select sliders! */
    if ($instigator.is('select')) {
      var $options = $instigator.find('option');
      options.min = Number($options.first().val());
      options.max = Number($options.last().val());
      options.step = (options.max - options.min) / ($options.length - 1);
    } else {
      $.each(['min', 'max', 'step'], function(i, attr) {
        options[attr] = Number(options[attr] || $instigator.attr(attr) || $instigator.data(attr));
      });
    }

    $instigator.change(function(){
      var val = Number($instigator.val());
      if (val > options.max) { val = options.max; }
      if (val < options.min) { val = options.min; }
      if (isNaN(val)) { val = options.value; }
      $instigator.val(val);
      $ui.slider('value', val);
    });

    if(options.minLabel) {
      $ui.append(formatSpan(options.minLabel, options.min, 'min-label'));
    }
    if(options.maxLabel) {
      $ui.append(formatSpan(options.maxLabel, options.max, 'max-label'));
    }

    $ui.slider(options);

    /* Need to append the element to a DOM loaded slider so this occurs after the slider instantiation. */
    if(options.valueLabel) {
      var $valueLabel = $(formatSpan(options.valueLabel, options.value, 'value-label')).appendTo($ui.find('.ui-slider-handle'));
      var $value = $valueLabel.find('span');
      $instigator.change(function() {
        $value.html($instigator.val());
      });
    }
  }
};

Mutiny.widgets.toggler = {
  'defaults': {'classes': 'inactive active', 'preventDefault': false},
  'stringArg': 'target',
  'init': function($instigator, options){
    var $target = $(options.target);

    var toggleFunc;
    if(options.style) {
      var noStyle = {};
      for(var key in options.style) {
        noStyle[key] = $instigator.css(key);
      }

      toggleFunc = function(on) {
        $instigator.css(on ? options.style : noStyle);
        $target.css(on ? options.style : noStyle);
      };
    } else {
      var classes = options.classes.split(' ');
      toggleFunc = function(on) {
        $instigator.toggleClass(classes[0], !on);
        $instigator.toggleClass(classes[1], on);
        $target.toggleClass(classes[0], !on);
        $target.toggleClass(classes[1], on);
      };
    }

    if($instigator.is('input[type=radio]')) {
      var name = $instigator.attr("name");
      toggleFunc($instigator.is(':checked'));
      $(format('input[name="{0}"]', name)).change(function(event){
        toggleFunc($instigator.is(':checked'));
      });
    } else {
      var active = false;
      toggleFunc(active);
      $instigator.click(function(event) {
        active = !active;
        toggleFunc(active);

        if(options.preventDefault) {
          event.preventDefault();
        }
      });
    }
  }
};

})(window);