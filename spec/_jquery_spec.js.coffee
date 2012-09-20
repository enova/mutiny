#= require mutiny/_jquery

describe '$(element).mutiny()', ->
  beforeEach ->
    Mutiny.directive = {'init': (->)}
    spyOn(Mutiny.directive, 'init')

  afterEach ->
    delete Mutiny.directive

  describe """<div data-mutiny='directive'>""", ->
    beforeEach ->
      @el = $("""<div data-mutiny='directive' />""")

    it """invokes with empty options""", ->
      @el.mutiny()
      # Kludgey but necessary: el === $(el[0]) for DOM usage but not for comparison operators
      expect(Mutiny.directive.init).wasCalledWith($(@el[0]), {})

    it """invokes with defaults""", ->
      Mutiny.directive.defaults = {'default': 'option'}
      @el.mutiny()
      expect(Mutiny.directive.init).wasCalledWith($(@el[0]), {'default': 'option'})

  describe """<div data-mutiny='{"directive": {"key": "value"}}'>""", ->
    beforeEach ->
      @el = $("""<div data-mutiny='{"directive": {"key": "value"}}' />""")

    it """invokes with options""", ->
      @el.mutiny()
      expect(Mutiny.directive.init).wasCalledWith($(@el[0]), {'key': 'value'})

    it """invokes with defaults merged with options""", ->
      Mutiny.directive.defaults = {'default': 'option'}
      @el.mutiny()
      expect(Mutiny.directive.init).wasCalledWith($(@el[0]), {'default': 'option', 'key': 'value'})

    it """invokes with overridden defaults""", ->
      Mutiny.directive.defaults = {'key': 'default'}
      @el.mutiny()
      expect(Mutiny.directive.init).wasCalledWith($(@el[0]), {'key': 'value'})

  describe """<div data-mutiny='{"directive": {"key": "value"}}'>""", ->
    beforeEach ->
      Mutiny.directive.string_arg = 'objectize'
      @el = $("""<div data-mutiny='{"directive": "string"}' />""")

    it """converts options into {Mutiny.directive.string_arg: "string"}""", ->
      @el.mutiny()
      expect(Mutiny.directive.init).wasCalledWith($(@el[0]), {'objectize': 'string'})

    it """merges defaults with options""", ->
      Mutiny.directive.defaults = {'default': 'option'}
      @el.mutiny()
      expect(Mutiny.directive.init).wasCalledWith($(@el[0]), {'default': 'option', 'objectize': 'string'})

    it """overrides defaults with options""", ->
      Mutiny.directive.defaults = {'objectize': 'default'}
      @el.mutiny()
      expect(Mutiny.directive.init).wasCalledWith($(@el[0]), {'objectize': 'string'})

  it """<div data-custom='directive'> requires 'custom' argument""", ->
    el = $("""<div data-custom='directive' />""")
    el.mutiny('custom')
    expect(Mutiny.directive.init).wasCalled()

  it """<div data-mutiny='cannot find directive'>""", ->
    el = $("""<div data-mutiny='nonexistent directive' />""")
    expect(-> el.mutiny()).toThrow('"nonexistent directive" not found')
