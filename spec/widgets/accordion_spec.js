describe('Mutiny.widgets.accordion', function() {
  beforeEach(function(){
    loadFixtures('accordion.html');
    Mutiny.init();
  });

  it('triggers Bare Bones accordion', function() {
    expect($('#bare-bones p:eq(0)')).toBeHidden();
    expect($('#bare-bones p:eq(1)')).toBeHidden();
    $('#bare-bones h2:eq(1)').click();
    expect($('#bare-bones p:eq(0)')).toBeHidden();
    expect($('#bare-bones p:eq(1)')).toBeVisible();
  });
});
