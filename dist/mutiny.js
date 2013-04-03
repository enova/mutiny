/*! Mutiny v0.2.0 - http://mutinyjs.com/ */
(function(window, $, undefined) {
$(function(){
  Mutiny.init();
});

var Mutiny = window.Mutiny = {
  init: function(el, namespace) {
    namespace = namespace || 'mutiny';
    el = el || $('*');

    var mutiny_call = function($instigator, widget, instance_options){
      if(Mutiny[widget] === undefined) {
        throw '"' + widget + '" not found';
      }

      var options = $.extend({}, Mutiny[widget].defaults);
      if(isString(instance_options)) {
        options[Mutiny[widget].string_arg] = instance_options;
      } else {
        $.extend(options, instance_options);
      }
      Mutiny[widget].init($instigator, options);
    };

    el.each(function(i, e) {
      var $e = $(e);
      var data = $e.data();
      if(namespace in data) {
        var directives = data[namespace];
        if(isString(directives)) {
          /* data-mutiny='slider' */
          mutiny_call($e, directives, {});
        } else if(typeof data === 'object') {
          /* data-mutiny='{"slider": {"some": "options"}}' */
          for(var directive in directives) {
            mutiny_call($e, directive, directives[directive]);
          }
        } else {
          throw 'Unsupported data';
        }
      }

      for(var key in data) {
        if(key.indexOf(namespace) === 0 && key != namespace) {
          var widget = key.replace(namespace, '').toLowerCase();
          var options = data[key];
          mutiny_call($e, widget, options || {});
        }
      }
    });
  }
};

function isString(obj) {
  return !!obj.substring;
}

Mutiny.accordion = {
  'defaults': {'autoHeight': false, 'collapsible': true, 'active': false},
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

Mutiny.datepicker = {
  'init': function($instigator, options) {
    $instigator.datepicker(options);
  }
};

Mutiny.slider = {
  'defaults': {'range': 'min'},
  '_createFormatSpan': function(format, value, className) {
    if(value === null || value === '') {
      /* If value does not exist, force a non-empty element draw.  Starting with empty
       * element prevents correct drawing when it has been replace with real contents.
       */
      value = '&nbsp;';
    }
    var inner = format.replace('%s', '<span>' + value + '</span>');
    if(className) {
      return '<span class="' + className + '">' + inner + '</span>';
    } else {
      return '<span>' + inner + '</span>';
    }
  },
  'init': function($instigator, options){
    var $ui;
    if(options.target) {
      $ui = $(options.target);
    } else {
      var id = $instigator.attr('id');
      var extras = '';
      if(id) {
        extras = ' id="' + id + '-mutiny-slider"';
      }
      $ui = $('<div' + extras + '></div>').insertAfter($instigator);
    }

    options.value = $instigator.val();
    options.slide = function(event, slider) {
      /* Force trigger of .change() to propagate the value elsewhere. */
      $instigator.val(slider.value).change();
    };

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
      $ui.append(this._createFormatSpan(options.minLabel, options.min, 'min-label'));
    }
    if(options.maxLabel) {
      $ui.append(this._createFormatSpan(options.maxLabel, options.max, 'max-label'));
    }

    $ui.slider(options);

    /* Need to append the element to a DOM loaded slider so this occurs after the slider instantiation. */
    if(options.valueLabel) {
      var $valueLabel = $(this._createFormatSpan(options.valueLabel, options.value, 'value-label')).appendTo($ui.find('.ui-slider-handle'));
      var $value = $valueLabel.find('span');
      $instigator.change(function() {
        $value.html($instigator.val());
      });
    }
  }
};

Mutiny.toggler = {
  'defaults': {'style': {'display': 'none'}, 'preventDefault': false, 'instigatorClass': 'active'},
  'string_arg': 'target',
  'init': function($instigator, options){
    var $target = $(options.target);

    var targetFunc;
    if(options['class']) {
      targetFunc = function(on) {
        $target.toggleClass(options['class'], on);
      };
    } else {
      var noStyle = {};
      for(var key in options.style) {
        noStyle[key] = $target.css(key);
      }

      targetFunc = function(on) {
        $target.css(on ? options.style : noStyle);
      };
    }

    if($instigator.is('input[type=radio]')) {
      var name = $instigator.attr("name");
      $('input[name="'+ name +'"]').change(function(event){
        var active = $instigator.is(':checked');
        $instigator.toggleClass(options.instigatorClass, active);
        targetFunc(active);
      });
    } else {
      var active = false;
      $instigator.click(function(event) {
        active = !active;
        $instigator.toggleClass(options.instigatorClass, active);
        targetFunc(active);

        if(options.preventDefault) {
          event.preventDefault();
        }
      });
    }
  }
};

})(window, jQuery);