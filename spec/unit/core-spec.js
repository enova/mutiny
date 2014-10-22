describe('Mutiny.util', function(){
  describe('dasherize()', function(){
    it('converts CapWords into cap-words', function(){
      expect(Mutiny.util.dasherize('CapWords')).to.equal('cap-words');
    });

    it('converts foo/bar into foo-bar', function(){
      expect(Mutiny.util.dasherize('foo/bar')).to.equal('foo-bar');
    });
  });

  describe('format()', function() {
    it('based on position', function() {
      var out = Mutiny.util.format('This is testing {0} for {1}.', 'foo', 'bar');
      expect(out).to.equal('This is testing foo for bar.');
    });

    it('same value correctly', function() {
      var out = Mutiny.util.format('{0} {0} {1} {0}', 'foo', 'bar');
      expect(out).to.equal('foo foo bar foo');
    });
  });

  describe('isString()', function() {
    it('counts "literal" as string', function() {
      expect(Mutiny.util.isString('literal')).to.equal(true);
    });

    it('counts new String() as string', function() {
      expect(Mutiny.util.isString(new String())).to.equal(true);
    });
  });
});
