describe('Mutiny.widgets.toggler', function() {
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

  it('triggers basic toggler', function() {
    expectClass($('#basic-toggler [data-mutiny-toggler]'), '+inactive -active');
    $('#basic-toggler [data-mutiny-toggler]').click();
    expectClass($('#basic-toggler [data-mutiny-toggler]'), '+active -inactive');
    $('#basic-toggler [data-mutiny-toggler]').click();
    expectClass($('#basic-toggler [data-mutiny-toggler]'), '+inactive -active');
  });

  it('triggers Targeted toggler', function() {
    expectClass($('#targeted .target'), '+inactive -active');
    $('#targeted [data-mutiny-toggler]').click();
    expectClass($('#targeted .target'), '+active -inactive');
    $('#targeted [data-mutiny-toggler]').click();
    expectClass($('#targeted .target'), '+inactive -active');
  });

  it('triggers Class Name toggler', function() {
    expectClass($('#class-name [data-mutiny-toggler]'), '+start -end');
    $('#class-name [data-mutiny-toggler]').click();
    expectClass($('#class-name [data-mutiny-toggler]'), '+end -start');
    $('#class-name [data-mutiny-toggler]').click();
    expectClass($('#class-name [data-mutiny-toggler]'), '+start -end');
  });

  it('triggers Style Changes toggler', function() {
    expect($('#style-changes [data-mutiny-toggler]')).not.toHaveCss({'font-style':'italic'});
    $('#style-changes [data-mutiny-toggler]').click();
    expect($('#style-changes [data-mutiny-toggler]')).toHaveCss({'font-style':'italic'});
    $('#style-changes [data-mutiny-toggler]').click();
    expect($('#style-changes [data-mutiny-toggler]')).not.toHaveCss({'font-style':'italic'});
  });

  it('triggers Checkbox toggler', function() {
    expectClass($('#checkbox [data-mutiny-toggler]'), '+inactive -active');
    $('#checkbox [data-mutiny-toggler]').click();
    expectClass($('#checkbox [data-mutiny-toggler]'), '+active -inactive');
  });

  it('triggers Radio Button toggler', function() {
    expectClass($('#radio-buttons [data-mutiny-toggler]'), '+inactive -active');
    $('#radio-buttons [data-mutiny-toggler]').click();
    expectClass($('#radio-buttons [data-mutiny-toggler]'), '+active -inactive');
  });
});
