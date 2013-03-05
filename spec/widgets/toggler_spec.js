describe('Mutiny.toggler', function() {
  beforeEach(function(){
    loadFixtures('toggler.html');
    Mutiny.init();
  });

  it('triggers Bare Bones toggler', function() {
    expect($('#bare-bones .toggled')).toBeVisible();
    $('#bare-bones [data-mutiny-toggler]').click();
    expect($('#bare-bones .toggled')).toBeHidden();
  });

  it('triggers Class Name toggler', function() {
    expect($('#class-name .toggled')).not.toHaveClass('active');
    $('#class-name [data-mutiny-toggler]').click();
    expect($('#class-name .toggled')).toHaveClass('active');
  });

  it('triggers Style Changes toggler', function() {
    expect($('#style-changes .toggled')).not.toHaveCss({'font-style':'italic'});
    $('#style-changes [data-mutiny-toggler]').click();
    expect($('#style-changes .toggled')).toHaveCss({'font-style':'italic'});
  });

  it('triggers Radio Button toggler', function() {
    expect($('#radio-buttons .toggled')).toBeHidden();
    $('#radio-buttons [data-mutiny-toggler]').click();
    expect($('#radio-buttons .toggled')).toBeVisible();
  });
});
