describe('Mutiny.widgets.jqToggler', function() {
  beforeEach(function(){
    fixtures.load('jq/toggler.html');
    window.$ = fixtures.jQuery();
    Mutiny.init($('*'));
  });

  afterEach(function(){
    fixtures.cleanUp();
    window.$ = window.jQuery;
  });

  function expectClass($e, directives) {
    $.each(directives.split(' '), function(i, directive) {
      switch(directive[0]) {
        case '+':
          expect($e).to.have.class(directive.substring(1));
          break;
        case '-':
          expect($e).to.not.have.class(directive.substring(1));
          break;
        default:
          throw "expectClass directive not supported: '"+directive[0]+"'";
      }
    });
  }

  it('triggers basic toggler', function() {
    var $toggler = $('#basic-toggler [data-mutiny-jq-toggler]');
    expectClass($toggler, '+inactive -active');
    $toggler.click();
    expectClass($toggler, '+active -inactive');
    $toggler.click();
    expectClass($toggler, '+inactive -active');
  });

  it('triggers Targeted Class toggler', function() {
    var $target = $('#targeted-class .target');
    var $toggler = $('#targeted-class [data-mutiny-jq-toggler]');
    expectClass($target, '+first -last');
    $toggler.click();
    expectClass($target, '+last -first');
    $toggler.click();
    expectClass($target, '+first -last');
  });

  it('triggers Class Name toggler', function() {
    var $toggler = $('#class-name [data-mutiny-jq-toggler]');
    expectClass($toggler, '+start -end');
    $toggler.click();
    expectClass($toggler, '+end -start');
    $toggler.click();
    expectClass($toggler, '+start -end');
  });

  it('triggers Style Changes toggler', function() {
    var $toggler = $('#style-changes [data-mutiny-jq-toggler]');
    expect($toggler).to.not.have.css('font-style', 'italic');
    $toggler.click();
    expect($toggler).to.have.css('font-style', 'italic');
    $toggler.click();
    expect($toggler).to.not.have.css('font-style', 'italic');
  });

  it('triggers Checkbox toggler', function() {
    var $toggler = $('#checkbox [data-mutiny-jq-toggler]');
    expectClass($toggler, '+inactive -active');
    $toggler.click();
    expectClass($toggler, '+active -inactive');
  });

  it('triggers Radio Button toggler', function() {
    var $toggler = $('#radio-buttons [data-mutiny-jq-toggler]');
    expectClass($toggler, '+inactive -active');
    $toggler.click();
    expectClass($toggler, '+active -inactive');
  });
});
