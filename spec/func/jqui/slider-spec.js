describe('Mutiny.widgets.jquiSlider', function() {
  beforeEach(function(){
    fixtures.load('jqui/slider.html');
    window.$ = fixtures.jQuery();
    Mutiny.init($('*'));
  });

  afterEach(function(){
    fixtures.cleanUp();
    window.$ = window.jQuery;
  });

  it('creates basic slider', function() {
    expect($('#basic-slider')).to.have.descendants('.ui-slider');
  });

  it('creates slider ID', function() {
    expect($('#slider-id')).to.have.descendants('.ui-slider#example-id-mutiny-slider');
  });

  it('creates min max labels', function() {
    expect($('#min-max-labels')).to.have.descendants('span.min-label');
    expect($('#min-max-labels')).to.have.descendants('span.max-label');
  });

  it('creates value label', function() {
    expect($('#value-label')).to.have.descendants('span.value-label');
  });

  it('creates slider within existing element', function() {
    expect($('#existing-element')).to.have.class('ui-slider');
  });
});
