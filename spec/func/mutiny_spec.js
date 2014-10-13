describe('Mutiny.init()', function() {
  beforeEach(function() {
    Mutiny.widgets.widget = {
      'init': function(){}
    };
    this.spy = spyOn(Mutiny.widgets.widget, 'init');
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

    it("is invoked only once regardless of how often Mutiny.init() is called", function(){
      Mutiny.init(this.el);
      Mutiny.init(this.el);
      expect(this.spy.callCount).toEqual(1);
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

  describe("<div data-namespace-widget=''>", function() {
    beforeEach(function() {
      this.el = $("<div data-namespace-widget='' />");
    });

    it("triggers using argument", function() {
      Mutiny.init(this.el, 'namespace');
      expect(Mutiny.widgets.widget.init).wasCalled();
    });
  });

  describe("<div data-mutiny-long-form=''>", function() {
    beforeEach(function() {
      this.el = $("<div data-mutiny-long-form='' />");
      Mutiny.widgets.longForm = {
        'init': function(){}
      };
      spyOn(Mutiny.widgets.longForm, 'init');
    });

    it("triggers", function() {
      Mutiny.init(this.el);
      expect(Mutiny.widgets.longForm.init).wasCalled();
    });
  });
});
