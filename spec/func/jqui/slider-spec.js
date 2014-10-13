describe('Mutiny.widgets.jquiSlider', function() {
  beforeEach(function(){
    loadFixtures('jqui/slider.html');
    Mutiny.init();
  });

  it('creates basic slider', function() {
    expect($('#basic-slider')).toContain('.ui-slider');
  });

  it('creates slider ID', function() {
    expect($('#slider-id')).toContain('.ui-slider#example-id-mutiny-slider');
  });

  it('creates min max labels', function() {
    expect($('#min-max-labels')).toContain('span.min-label');
    expect($('#min-max-labels')).toContain('span.max-label');
  });

  it('creates value label', function() {
    expect($('#value-label')).toContain('span.value-label');
  });

  it('creates slider within existing element', function() {
    expect($('#existing-element')).toHaveClass('ui-slider');
  });
});
