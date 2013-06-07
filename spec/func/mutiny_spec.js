describe('Mutiny.init()', function() {
  beforeEach(function() {
    Mutiny.widgets.widget = {
      'init': function(){}
    };
    spyOn(Mutiny.widgets.widget, 'init');
  });

  afterEach(function() {
    delete Mutiny.widgets.widget;
  });

  describe("<div data-mutiny-widget='' />", function() {
    beforeEach(function() {
      this.el = $("<div data-mutiny-widget='' />");
    });

    it("invokes with empty options", function() {
      Mutiny.init(this.el);
      expect(Mutiny.widgets.widget.init).wasCalledWith($(this.el[0]), {});
    });

    it("invokes with defaults", function() {
      Mutiny.widgets.widget.defaults = {'default': 'option'};
      Mutiny.init(this.el);
      expect(Mutiny.widgets.widget.init).wasCalledWith($(this.el[0]), {'default': 'option'});
    });
  });

  describe('<div data-mutiny-widget=\'{"key": "value"}\' />', function() {
    beforeEach(function() {
      this.el = $('<div data-mutiny-widget=\'{"key": "value"}\' />');
    });

    it("invokes with options", function() {
      Mutiny.init(this.el);
      expect(Mutiny.widgets.widget.init).wasCalledWith($(this.el[0]), {'key': 'value'});
    });

    it("invokes with defaults merged with options", function() {
      Mutiny.widgets.widget.defaults = {'default': 'option'};
      Mutiny.init(this.el);
      expect(Mutiny.widgets.widget.init).wasCalledWith($(this.el[0]), {'default': 'option', 'key': 'value'});
    });

    it("invokes with overridden defaults", function() {
      Mutiny.widgets.widget.defaults = {'key': 'default'};
      Mutiny.init(this.el);
      expect(Mutiny.widgets.widget.init).wasCalledWith($(this.el[0]), {'key': 'value'});
    });
  });

  describe('<div data-mutiny-widget="string" />', function() {
    beforeEach(function() {
      this.el = $('<div data-mutiny-widget="string" />');
    });

    it("cannot parse stringArg by default", function() {
      var el = this.el;
      expect(function() {
        Mutiny.init(el);
      }).toThrow('"widget" cannot parse "string"');
    });

    describe('with stringArg defined', function() {
      beforeEach(function() {
        Mutiny.widgets.widget.stringArg = 'objectize';
        this.el = $('<div data-mutiny-widget="string" />');
      });

      it("converts options into {Mutiny.widgets.widget.stringArg: 'string'}", function() {
        Mutiny.init(this.el);
        expect(Mutiny.widgets.widget.init).wasCalledWith($(this.el[0]), {'objectize': 'string'});
      });

      it("merges defaults with options", function() {
        Mutiny.widgets.widget.defaults = {'default': 'option'};
        Mutiny.init(this.el);
        expect(Mutiny.widgets.widget.init).wasCalledWith($(this.el[0]), {'default': 'option', 'objectize': 'string'});
      });

      it("overrides defaults with options", function() {
        Mutiny.widgets.widget.defaults = {'objectize': 'default'};
        Mutiny.init(this.el);
        expect(Mutiny.widgets.widget.init).wasCalledWith($(this.el[0]), {'objectize': 'string'});
      });
    });
  });

  describe("<div data-custom-widget=''>", function() {
    beforeEach(function() {
      this.el = $("<div data-custom-widget='' />");
    });

    it("triggers using argument", function() {
      Mutiny.init(this.el, 'custom');
      expect(Mutiny.widgets.widget.init).wasCalled();
    });
  });
});
