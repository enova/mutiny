describe('Mutiny.widgets.accordion', function() {
  beforeEach(function(){
    loadFixtures('accordion.html');
    Mutiny.init();
  });

  it('triggers basic accordion', function() {
    expect($('#basic-accordion p:eq(0)')).toBeHidden();
    expect($('#basic-accordion p:eq(1)')).toBeHidden();
    $('#basic-accordion h2:eq(1)').click();
    expect($('#basic-accordion p:eq(0)')).toBeHidden();
    expect($('#basic-accordion p:eq(1)')).toBeVisible();
  });

  it('uses header argument', function() {
    $('#header-argument h2:eq(1)').click();
    expect($('#header-argument p:eq(0)')).toBeHidden();
    expect($('#header-argument p:eq(1)')).toBeVisible();
  });
});
