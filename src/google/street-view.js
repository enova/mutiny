Mutiny.widgets.googleStreetView = {
  defaults: {},
  init: function(instigator, options){
    var streetView = new google.maps.StreetViewPanorama(instigator);

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: options.address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        streetView.setPosition(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
};
