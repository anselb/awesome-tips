

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
    var locations = [

    ];

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: './m'});

    // FOR MARKERS END

}
