describe('Mutiny.util', function() {
  describe('dasherize()', function() {
    it('converts CapWords into cap-words', function() {
      expect(Mutiny.util.dasherize('CapWords')).toEqual('cap-words');
    });
  });

  describe('format()', function() {
    it('based on position', function() {
      var out = Mutiny.util.format('This is testing {0} for {1}.', 'foo', 'bar');
      expect(out).toEqual('This is testing foo for bar.');
    });

    it('same value correctly', function() {
      var out = Mutiny.util.format('{0} {0} {1} {0}', 'foo', 'bar');
      expect(out).toEqual('foo foo bar foo');
    });
  });

  describe('isString()', function() {
    it('counts "literal" as string', function() {
      expect(Mutiny.util.isString('literal')).toBe(true);
    });

    it('counts new String() as string', function() {
      expect(Mutiny.util.isString(new String())).toBe(true);
    });
  });
});
