#= require macgyver/_jquery

describe '$.fn.macgyver()', ->
  beforeEach ->
    Macgyver.test = {'init': (->)}
    spyOn(Macgyver.test, 'init')

  afterEach ->
    delete Macgyver.test

  it 'invokes widget using data-macgyver=string', ->
    el = $("""<div data-macgyver='test' />""")
    el.macgyver()
    # Kludgey but necessary: el === $(el[0]) in practice but not on paper
    expect(Macgyver.test.init).wasCalledWith($(el[0]), {})

  it 'invokes widget using data-macgyver=JSON', ->
    el = $("""<div data-macgyver='{"test": "var"}' />""")
    el.macgyver()
    expect(Macgyver.test.init).wasCalledWith($(el[0]), 'var')

  it 'invokes widget using data-custom', ->
    el = $("""<div data-custom='test' />""")
    el.macgyver('custom')
    expect(Macgyver.test.init).wasCalled()
