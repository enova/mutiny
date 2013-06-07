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
});
