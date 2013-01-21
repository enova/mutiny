describe('Mutiny.toggler', function() {
  beforeEach(function(){
    loadFixtures('toggler.html');
    Mutiny.init();
  });

  it('triggers Bare Bones toggler', function() {
    expect($('#bare-bones')).toBeVisible();
    $('#bare-bones-toggler').click();
    expect($('#bare-bones')).toBeHidden();
  });

  it('triggers Class Name toggler', function() {
    expect($('#class-name')).not.toHaveClass('active');
    $('#class-name-toggler').click();
    expect($('#class-name')).toHaveClass('active');
  });

  it('triggers Style Changes toggler', function() {
    expect($('#style-changes')).not.toHaveCss({'font-style':'italic'});
    $('#style-changes-toggler').click();
    expect($('#style-changes')).toHaveCss({'font-style':'italic'});
  });

  it('triggers Radio Button toggler', function() {
    expect($('#option_group')).toBeHidden();
    $('#choice2').click();
    expect($('#option_group')).toBeVisible();
  });
});
