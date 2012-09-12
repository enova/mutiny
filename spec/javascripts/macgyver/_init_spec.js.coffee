#= require macgyver/_init

describe '$.fn.macgyver()', ->
  beforeEach ->
    $.fn.macgyver.test = (->)
    spyOn($.fn.macgyver, 'test')

  afterEach ->
    delete $.fn.macgyver.test

  it 'invokes widget using string', ->
    el = $("""<div data-macgyver='test' />""")
    el.macgyver()
    # Kludgey but necessary: el === $(el[0]) in practice but not on paper
    expect($.fn.macgyver.test).wasCalledWith($(el[0]), {})

  it 'invokes widget using JSON', ->
    el = $("""<div data-macgyver='{"test": "var"}' />""")
    el.macgyver()
    expect($.fn.macgyver.test).wasCalledWith($(el[0]), 'var')
