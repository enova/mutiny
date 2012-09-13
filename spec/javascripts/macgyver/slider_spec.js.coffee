#= require macgyver/slider


describe 'Macgyver.slider', ->
  describe '_createFormatSpan', ->
    it 'creates span tag with correct values', ->
      s = Macgyver.slider._createFormatSpan('%s', 'val')
      expect(s).toEqual('<span><span>val</span></span>')

    it 'uses class when given', ->
      s = Macgyver.slider._createFormatSpan('%s', 'val', 'class up')
      expect(s).toEqual('<span class="class up"><span>val</span></span>')

    it 'wraps only the value inside inner <span>', ->
      s = Macgyver.slider._createFormatSpan('abc%s123', 'val')
      expect(s).toEqual('<span>abc<span>val</span>123</span>')

    it 'converts empty value into &nbsp; to fix DOM rendering', ->
      s = Macgyver.slider._createFormatSpan('%s', '')
      expect(s).toEqual('<span><span>&nbsp;</span></span>')
