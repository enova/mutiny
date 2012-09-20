#= require mutiny/_jquery

describe '$(element).mutiny()', ->
  beforeEach ->
    Mutiny.directive = {'init': (->)}
    spyOn(Mutiny.directive, 'init')

  afterEach ->
    delete Mutiny.directive

  it """<div data-mutiny='directive'> invokes with empty options""", ->
    el = $("""<div data-mutiny='directive' />""")
    el.mutiny()
    # Kludgey but necessary: el === $(el[0]) for DOM usage but not for comparison operators
    expect(Mutiny.directive.init).wasCalledWith($(el[0]), {})

  it """<div data-mutiny='{"directive": {"key": "value"}}'> invokes with options""", ->
    el = $("""<div data-mutiny='{"directive": {"key": "value"}}' />""")
    el.mutiny()
    expect(Mutiny.directive.init).wasCalledWith($(el[0]), {"key": "value"})

  it """<div data-mutiny='{"directive": "string"}'> converts options into {Mutiny.directive.string_arg: "string"}""", ->
    Mutiny.directive.string_arg = 'objectize'
    el = $("""<div data-mutiny='{"directive": "string"}' />""")
    el.mutiny()
    expect(Mutiny.directive.init).wasCalledWith($(el[0]), {"objectize": "string"})

  it """<div data-custom='directive'> requires 'custom' argument""", ->
    el = $("""<div data-custom='directive' />""")
    el.mutiny('custom')
    expect(Mutiny.directive.init).wasCalled()
