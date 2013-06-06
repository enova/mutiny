describe('formatSpan', function() {
  it('creates span tag with correct values', function() {
    var s = formatSpan('%s', 'val');
    expect(s).toEqual('<span><span>val</span></span>');
  });

  it('uses class when given', function() {
    var s = formatSpan('%s', 'val', 'class up');
    expect(s).toEqual('<span class="class up"><span>val</span></span>');
  });

  it('wraps only the value inside inner <span>', function() {
    var s = formatSpan('abc%s123', 'val');
    expect(s).toEqual('<span>abc<span>val</span>123</span>');
  });

  it('converts "" into &nbsp; to fix DOM rendering', function() {
    var s = formatSpan('%s', '');
    expect(s).toEqual('<span><span>&nbsp;</span></span>');
  });

  it('does not convert 0 into &nbsp;', function() {
    var s = formatSpan('%s', '0');
    expect(s).toEqual('<span><span>0</span></span>');
  });
});
