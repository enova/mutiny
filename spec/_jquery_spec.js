describe('$(element).mutiny()', function() {
  beforeEach(function() {
    Mutiny.directive = {
      'init': function(){}
    };
    spyOn(Mutiny.directive, 'init');
  });

  afterEach(function() {
    delete Mutiny.directive;
  });

  describe("<div data-mutiny='directive' />", function() {
    beforeEach(function() {
      this.el = $("<div data-mutiny='directive' />");
    });

    it("invokes with empty options", function() {
      this.el.mutiny();
      expect(Mutiny.directive.init).wasCalledWith($(this.el[0]), {});
    });

    it("invokes with defaults", function() {
      Mutiny.directive.defaults = {'default': 'option'};
      this.el.mutiny();
      expect(Mutiny.directive.init).wasCalledWith($(this.el[0]), {'default': 'option'});
    });
  });

  describe('<div data-mutiny=\'{"directive": {"key": "value"}}\' />', function() {
    beforeEach(function() {
      this.el = $('<div data-mutiny=\'{"directive": {"key": "value"}}\' />');
    });

    it("invokes with options", function() {
      this.el.mutiny();
      expect(Mutiny.directive.init).wasCalledWith($(this.el[0]), {'key': 'value'});
    });

    it("invokes with defaults merged with options", function() {
      Mutiny.directive.defaults = {'default': 'option'};
      this.el.mutiny();
      expect(Mutiny.directive.init).wasCalledWith($(this.el[0]), {'default': 'option', 'key': 'value'});
    });

    it("invokes with overridden defaults", function() {
      Mutiny.directive.defaults = {'key': 'default'};
      this.el.mutiny();
      expect(Mutiny.directive.init).wasCalledWith($(this.el[0]), {'key': 'value'});
    });
  });

  describe('<div data-mutiny=\'{"directive": "string"}\' />', function() {
    beforeEach(function() {
      Mutiny.directive.string_arg = 'objectize';
      this.el = $('<div data-mutiny=\'{"directive": "string"}\' />');
    });

    it("converts options into {Mutiny.directive.string_arg: 'string'}", function() {
      this.el.mutiny();
      expect(Mutiny.directive.init).wasCalledWith($(this.el[0]), {'objectize': 'string'});
    });

    it("merges defaults with options", function() {
      Mutiny.directive.defaults = {'default': 'option'};
      this.el.mutiny();
      expect(Mutiny.directive.init).wasCalledWith($(this.el[0]), {'default': 'option', 'objectize': 'string'});
    });

    it("overrides defaults with options", function() {
      Mutiny.directive.defaults = {'objectize': 'default'};
      this.el.mutiny();
      expect(Mutiny.directive.init).wasCalledWith($(this.el[0]), {'objectize': 'string'});
    });
  });

  describe("<div data-custom='directive'>", function() {
    beforeEach(function() {
      this.el = $("<div data-custom='directive' />");
    });

    it("triggers using argument", function() {
      this.el.mutiny('custom');
      expect(Mutiny.directive.init).wasCalled();
    });
  });

  describe("exceptions", function() {
    it("<div data-mutiny='nonexistent'> throws nonexistent directive", function() {
      var el = $("<div data-mutiny='nonexistent' />");
      expect(function() {
        el.mutiny();
      }).toThrow('"nonexistent" not found');
    });
  });
});
