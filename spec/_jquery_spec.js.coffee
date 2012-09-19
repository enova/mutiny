#= require mutiny/_jquery

describe '$.fn.mutiny()', ->
  beforeEach ->
    Mutiny.test = {'init': (->)}
    spyOn(Mutiny.test, 'init')

  afterEach ->
    delete Mutiny.test

  it 'invokes widget using data-mutiny=string', ->
    el = $("""<div data-mutiny='test' />""")
    el.mutiny()
    # Kludgey but necessary: el === $(el[0]) in practice but not on paper
    expect(Mutiny.test.init).wasCalledWith($(el[0]), {})

  it 'invokes widget using data-mutiny=JSON', ->
    el = $("""<div data-mutiny='{"test": "var"}' />""")
    el.mutiny()
    expect(Mutiny.test.init).wasCalledWith($(el[0]), 'var')

  it 'invokes widget using data-custom', ->
    el = $("""<div data-custom='test' />""")
    el.mutiny('custom')
    expect(Mutiny.test.init).wasCalled()
