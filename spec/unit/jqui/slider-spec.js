describe('Mutiny.widgets.jquiSlider', function(){
  describe('formatSpan', function(){
    it('creates span tag with correct values', function() {
      var s = Mutiny.widgets.jquiSlider.formatSpan('%s', 'class up', 'val');
      expect(s).to.equal('<span class="class up"><span>val</span></span>');
    });

    it('wraps only the value inside inner <span>', function() {
      var s = Mutiny.widgets.jquiSlider.formatSpan('abc%s123', 'foo', 'val');
      expect(s).to.equal('<span class="foo">abc<span>val</span>123</span>');
    });

    it('converts "" into &nbsp; to fix DOM rendering', function() {
      var s = Mutiny.widgets.jquiSlider.formatSpan('%s', 'foo', '');
      expect(s).to.equal('<span class="foo"><span>&nbsp;</span></span>');
    });

    it('does not convert 0 into &nbsp;', function() {
      var s = Mutiny.widgets.jquiSlider.formatSpan('%s', 'foo', '0');
      expect(s).to.equal('<span class="foo"><span>0</span></span>');
    });
  });
});
