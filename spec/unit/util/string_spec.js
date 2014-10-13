describe('util:string', function() {
  describe('dasherize()', function() {
    it('converts CapWords into cap-words', function() {
      expect(dasherize('CapWords')).toEqual('cap-words');
    });
  });

  describe('format()', function() {
    it('based on position', function() {
      var out = format('This is testing {0} for {1}.', 'foo', 'bar');
      expect(out).toEqual('This is testing foo for bar.');
    });

    it('same value correctly', function() {
      var out = format('{0} {0} {1} {0}', 'foo', 'bar');
      expect(out).toEqual('foo foo bar foo');
    });
  });
});
