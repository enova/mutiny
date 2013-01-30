/*! Mutiny v0.1.0 - http://mutinyjs.com/ */
var Mutiny = {
    init: function(dataAttr) {
        dataAttr = dataAttr || "mutiny";
        $("[data-" + dataAttr + "]").mutiny(dataAttr);
    }
};

$.fn.mutiny = function(dataAttr) {
    var mutiny_call = function($instigator, name, instance_options) {
        if (Mutiny[name] === undefined) {
            throw '"' + name + '" not found';
        }
        var options = $.extend({}, Mutiny[name].defaults);
        if (typeof instance_options === "string") {
            options[Mutiny[name].string_arg] = instance_options;
        } else {
            $.extend(options, instance_options);
        }
        Mutiny[name].init($instigator, options);
    };
    dataAttr = dataAttr || "mutiny";
    this.each(function(i, e) {
        var $e = $(e);
        var data = $e.data(dataAttr);
        switch (typeof data) {
          case "string":
            mutiny_call($e, data, {});
            break;

          case "object":
            for (var directive in data) {
                mutiny_call($e, directive, data[directive]);
            }
            break;

          default:
            throw "Unsupported data";
        }
    });
    return this;
};

$(function() {
    Mutiny.init();
});

Mutiny.accordion = {
    defaults: {
        autoHeight: false,
        collapsible: true,
        active: false
    },
    _hrefIndex: function($search, href) {
        var active_index = -1;
        $search.find("a").each(function(index, anchorEl) {
            if ($(anchorEl).attr("href") == href) {
                active_index = index;
                return false;
            }
        });
        return active_index;
    },
    init: function($instigator, options) {
        var hash = window.location.hash || undefined;
        var $menu = options.menu ? $(options.menu) : undefined;
        if (hash) {
            var active_index = this._hrefIndex($menu || $instigator, hash);
            if (active_index > -1) {
                options.active = active_index;
            }
        }
        if ($menu) {
            var self = this;
            $menu.find("a").click(function(event) {
                var toggle_index = self._hrefIndex($menu, $(event.target).attr("href"));
                if (toggle_index > -1) {
                    $instigator.accordion("activate", toggle_index);
                }
            });
        }
        $instigator.accordion(options);
    }
};

Mutiny.datepicker = {
    init: function($instigator, options) {
        $instigator.datepicker();
    }
};

Mutiny.slider = {
    defaults: {
        range: "min"
    },
    _createFormatSpan: function(format, value, className) {
        if (value === null || value === "") {
            value = "&nbsp;";
        }
        var inner = format.replace("%s", "<span>" + value + "</span>");
        if (className) {
            return '<span class="' + className + '">' + inner + "</span>";
        } else {
            return "<span>" + inner + "</span>";
        }
    },
    init: function($instigator, options) {
        var $ui;
        if (options.target) {
            $ui = $(options.target);
        } else {
            var id = $instigator.attr("id");
            var extras = "";
            if (id) {
                extras = ' id="' + id + '-mutiny-slider"';
            }
            $ui = $("<div" + extras + "></div>").insertAfter($instigator);
        }
        options.value = $instigator.val();
        options.slide = function(event, slider) {
            $instigator.val(slider.value).change();
        };
        if ($instigator.is("select")) {
            var $options = $instigator.find("option");
            options.min = Number($options.first().val());
            options.max = Number($options.last().val());
            options.step = (options.max - options.min) / ($options.length - 1);
        } else {
            options.min = Number($instigator.attr("min") || $instigator.data("min"));
            options.max = Number($instigator.attr("max") || $instigator.data("max"));
            options.step = Number($instigator.attr("step") || $instigator.data("step"));
        }
        $instigator.change(function() {
            var val = Number($instigator.val());
            if (val > options.max) {
                val = options.max;
            }
            if (val < options.min) {
                val = options.min;
            }
            if (isNaN(val)) {
                val = options.value;
            }
            $instigator.val(val);
            $ui.slider("value", val);
        });
        if (options.minLabel) {
            $ui.append(this._createFormatSpan(options.minLabel, options.min, "min-label"));
        }
        if (options.maxLabel) {
            $ui.append(this._createFormatSpan(options.maxLabel, options.max, "max-label"));
        }
        $ui.slider(options);
        if (options.valueLabel) {
            var $valueLabel = $(this._createFormatSpan(options.valueLabel, options.value, "valueLabel")).appendTo($ui.find(".ui-slider-handle"));
            var $value = $valueLabel.find("span");
            $instigator.change(function() {
                $value.html($instigator.val());
            });
        }
    }
};

Mutiny.toggler = {
    defaults: {
        style: {
            display: "none"
        },
        preventDefault: false,
        instigatorClass: "active"
    },
    string_arg: "target",
    init: function($instigator, options) {
        var $target = $(options.target);
        var targetFunc;
        if (options["class"]) {
            targetFunc = function(on) {
                $target.toggleClass(options["class"], on);
            };
        } else {
            var noStyle = {};
            for (var key in options.style) {
                noStyle[key] = $target.css(key);
            }
            targetFunc = function(on) {
                $target.css(on ? options.style : noStyle);
            };
        }
        if ($instigator.is("input[type=radio]")) {
            var name = $instigator.attr("name");
            $('input[name="' + name + '"]').change(function(event) {
                var active = $instigator.is(":checked");
                $instigator.toggleClass(options.instigatorClass, active);
                targetFunc(active);
            });
        } else {
            var active = false;
            $instigator.click(function(event) {
                active = !active;
                $instigator.toggleClass(options.instigatorClass, active);
                targetFunc(active);
                if (options.preventDefault) {
                    event.preventDefault();
                }
            });
        }
    }
};