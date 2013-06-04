describe('Mutiny.toggler', function() {
  beforeEach(function(){
    loadFixtures('toggler.html');
    Mutiny.init();
  });

  function expectClass($e, directives) {
    $.each(directives.split(' '), function(i, directive) {
      switch(directive[0]) {
        case '+':
          expect($e).toHaveClass(directive.substring(1));
          break;
        case '-':
          expect($e).not.toHaveClass(directive.substring(1));
          break;
        default:
          throw "expectClass directive not supported: '"+directive[0]+"'";
      }
    });
  }

  it('triggers Bare Bones toggler', function() {
    expectClass($('#bare-bones .toggled'), '+inactive -active');
    $('#bare-bones [data-mutiny-toggler]').click();
    expectClass($('#bare-bones .toggled'), '+active -inactive');
  });

  it('triggers Class Name toggler', function() {
    expectClass($('#class-name .toggled'), '+start -end');
    $('#class-name [data-mutiny-toggler]').click();
    expectClass($('#class-name .toggled'), '+end -start');
  });

  it('triggers Style Changes toggler', function() {
    expect($('#style-changes .toggled')).not.toHaveCss({'font-style':'italic'});
    $('#style-changes [data-mutiny-toggler]').click();
    expect($('#style-changes .toggled')).toHaveCss({'font-style':'italic'});
  });

  it('triggers Radio Button toggler', function() {
    expectClass($('#radio-buttons .toggled'), '+inactive -active');
    $('#radio-buttons [data-mutiny-toggler]').click();
    expectClass($('#radio-buttons .toggled'), '+active -inactive');
  });
});
