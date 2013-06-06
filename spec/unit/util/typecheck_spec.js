describe('util:typecheck', function() {
  describe('isString()', function() {
    it('counts "literal" as string', function() {
      expect(isString('literal')).toBe(true);
    });

    it('counts new String() as string', function() {
      expect(isString(new String())).toBe(true);
    });
  });
});
