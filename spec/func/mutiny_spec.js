describe('Mutiny.init()', function() {
  beforeEach(function() {
    function clone(o){
      return JSON.parse(JSON.stringify(o));
    }

    Mutiny.widgets.widget = {
      init: function(instigator, options){
        instigator.lastCalledWith = clone(options);
        instigator.numCalls = (instigator.numCalls || 0) + 1;
      }
    };
  });

  afterEach(function() {
    delete Mutiny.widgets.widget;
  });

  describe("<div data-mutiny-widget='' />", function() {
    beforeEach(function() {
      this.el = $("<div data-mutiny-widget='' />")[0];
    });

    it("invokes with empty options", function() {
      Mutiny.init(this.el);
      expect(this.el.lastCalledWith).toEqual({});
    });

    it("invokes with defaults", function() {
      Mutiny.widgets.widget.defaults = {'default': 'option'};
      Mutiny.init(this.el);
      expect(this.el.lastCalledWith).toEqual({'default': 'option'})
    });

    it("is invoked only once regardless of how often Mutiny.init() is called", function(){
      Mutiny.init(this.el);
      Mutiny.init(this.el);
      expect(this.el.numCalls).toEqual(1);
    });
  });

  describe('<div data-mutiny-widget=\'{"key": "value"}\' />', function() {
    beforeEach(function() {
      this.el = $('<div data-mutiny-widget=\'{"key": "value"}\' />')[0];
    });

    it("invokes with options", function() {
      Mutiny.init(this.el);
      expect(this.el.lastCalledWith).toEqual({'key': 'value'});
    });

    it("invokes with defaults merged with options", function() {
      Mutiny.widgets.widget.defaults = {'default': 'option'};
      Mutiny.init(this.el);
      expect(this.el.lastCalledWith).toEqual({'default': 'option', 'key': 'value'});
    });

    it("invokes with overridden defaults", function() {
      Mutiny.widgets.widget.defaults = {'key': 'default'};
      Mutiny.init(this.el);
      expect(this.el.lastCalledWith).toEqual({'key': 'value'});
    });
  });

  describe("<div data-namespace-widget=''>", function() {
    beforeEach(function() {
      this.el = $("<div data-namespace-widget='' />")[0];
    });

    it("triggers using argument", function() {
      Mutiny.init(this.el, 'namespace');
      expect(this.el.numCalls).toBe(1);
    });
  });

  describe("<div data-mutiny-long-form=''>", function() {
    beforeEach(function() {
      this.el = $("<div data-mutiny-long-form='' />")[0];
      Mutiny.widgets.longForm = Mutiny.widgets.widget;
    });

    it("triggers", function() {
      Mutiny.init(this.el);
      expect(this.el.numCalls).toBe(1);
    });
  });
});
