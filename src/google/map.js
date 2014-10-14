Mutiny.widgets.googleMap = {
  defaults: {zoom: 14},
  init: function(instigator, options){
    var map = new google.maps.Map(instigator, options);

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: options.address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var loc = results[0].geometry.location;
        map.setCenter(loc);
        new google.maps.Marker({
          map: map,
          position: loc
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
