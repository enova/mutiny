describe('$(element).mutiny()', function() {
  beforeEach(function() {
    Mutiny.widget = {
      'init': function(){}
    };
    spyOn(Mutiny.widget, 'init');
  });

  afterEach(function() {
    delete Mutiny.widget;
  });

  describe("<div data-mutiny='widget' />", function() {
    beforeEach(function() {
      this.el = $("<div data-mutiny='widget' />");
    });

    it("invokes with empty options", function() {
      this.el.mutiny();
      expect(Mutiny.widget.init).wasCalledWith($(this.el[0]), {});
    });

    it("invokes with defaults", function() {
      Mutiny.widget.defaults = {'default': 'option'};
      this.el.mutiny();
      expect(Mutiny.widget.init).wasCalledWith($(this.el[0]), {'default': 'option'});
    });
  });

  describe('<div data-mutiny=\'{"widget": {"key": "value"}}\' />', function() {
    beforeEach(function() {
      this.el = $('<div data-mutiny=\'{"widget": {"key": "value"}}\' />');
    });

    it("invokes with options", function() {
      this.el.mutiny();
      expect(Mutiny.widget.init).wasCalledWith($(this.el[0]), {'key': 'value'});
    });

    it("invokes with defaults merged with options", function() {
      Mutiny.widget.defaults = {'default': 'option'};
      this.el.mutiny();
      expect(Mutiny.widget.init).wasCalledWith($(this.el[0]), {'default': 'option', 'key': 'value'});
    });

    it("invokes with overridden defaults", function() {
      Mutiny.widget.defaults = {'key': 'default'};
      this.el.mutiny();
      expect(Mutiny.widget.init).wasCalledWith($(this.el[0]), {'key': 'value'});
    });
  });

  describe('<div data-mutiny=\'{"widget": "string"}\' />', function() {
    beforeEach(function() {
      Mutiny.widget.string_arg = 'objectize';
      this.el = $('<div data-mutiny=\'{"widget": "string"}\' />');
    });

    it("converts options into {Mutiny.widget.string_arg: 'string'}", function() {
      this.el.mutiny();
      expect(Mutiny.widget.init).wasCalledWith($(this.el[0]), {'objectize': 'string'});
    });

    it("merges defaults with options", function() {
      Mutiny.widget.defaults = {'default': 'option'};
      this.el.mutiny();
      expect(Mutiny.widget.init).wasCalledWith($(this.el[0]), {'default': 'option', 'objectize': 'string'});
    });

    it("overrides defaults with options", function() {
      Mutiny.widget.defaults = {'objectize': 'default'};
      this.el.mutiny();
      expect(Mutiny.widget.init).wasCalledWith($(this.el[0]), {'objectize': 'string'});
    });
  });

  describe("<div data-custom='widget'>", function() {
    beforeEach(function() {
      this.el = $("<div data-custom='widget' />");
    });

    it("triggers using argument", function() {
      this.el.mutiny('custom');
      expect(Mutiny.widget.init).wasCalled();
    });
  });

  describe("exceptions", function() {
    it("<div data-mutiny='nonexistent'> throws nonexistent widget", function() {
      var el = $("<div data-mutiny='nonexistent' />");
      expect(function() {
        el.mutiny();
      }).toThrow('"nonexistent" not found');
    });
  });
});
