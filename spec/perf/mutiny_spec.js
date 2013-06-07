describe('Mutiny.init()', function() {
  it('is fast', function() {
    var start = +new Date();
    for(var i=0; i < 10000; i++) {
      Mutiny.init();
    }
    console.log(+new Date() - start);
  });
});
