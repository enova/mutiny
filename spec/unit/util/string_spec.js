describe('util:string', function() {
  describe('dasherize()', function() {
    it('converts CapWords into cap-words', function() {
      expect(dasherize('CapWords')).toEqual('cap-words');
    });
  });

  describe('lowerCaseFirst()', function() {
    it('only lowercases the first letter', function() {
      expect(lowerCaseFirst('ABCDEFG')).toEqual('aBCDEFG');
    });
  });

  describe('format()', function() {
    it('formats based on position', function() {
      var out = format('This is testing {0} for {1}.', 'foo', 'bar');
      expect(out).toEqual('This is testing foo for bar.');
    });
  });
});
