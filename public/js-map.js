
function getTipMarkers(cb){
  $.get('/tips', function(data){
    cb(data);
  });
}

function initMap() {

    // https://developers.google.com/maps/documentation/javascript/marker-clustering
    // https://developers.google.com/maps/documentation/javascript/geolocation

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 38.563910, lng: -121.887 }
    });

    // Create an array of alphabetical characters used to label the markers
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // FOR GEO LOCATION START
    var infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(15);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    // END GEO LOCATION

    // FOR MARKERS START
    getTipMarkers(function(tips){
      // Add some markers to the map.
      // Note: The code uses the JavaScript Array.prototype.map() method to
      // create an array of markers based on a given "locations" array.
      // The map() method here has nothing to do with the Google Maps API.
      var markers = tips.map(function(tip, i) {
          var marker = new google.maps.Marker({
              position: {lat : tip.latitude, lng : tip.longitude},
              label: labels[i % labels.length],
          });
          var infowindow = new google.maps.InfoWindow({
            content: tip.body
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
          return marker;
      });

      // Add a marker clusterer to manage the markers.
      var markerCluster = new MarkerClusterer(map, markers,
          {imagePath: './m'});



      // FOR MARKERS END
    });






}
