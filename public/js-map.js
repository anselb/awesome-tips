

function initMap() {

    // https://developers.google.com/maps/documentation/javascript/marker-clustering
    // https://developers.google.com/maps/documentation/javascript/geolocation

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
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
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
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
        {lat: 31.563910, lng: -120.154312},
        {lat: 31.718234, lng: -120.363181},
        {lat: 31.727111, lng: -120.371124},
        {lat: 31.848588, lng: -120.209834},
        {lat: 31.851702, lng: -120.216968},
        {lat: 31.671264, lng: -120.863657},
        {lat: 32.304724, lng: -120.662905},
        {lat: 36.817685, lng: -119.699196},
        {lat: 36.828611, lng: -116.790222},
        {lat: 37.750000, lng: -116.116667},
        {lat: 37.759859, lng: -116.128708},
        {lat: 37.765015, lng: -116.133858},
        {lat: 37.770104, lng: -115.143299},
        {lat: 37.773700, lng: -115.145187},
        {lat: 37.774785, lng: -115.137978},
        {lat: 37.819616, lng: -114.968119},
        {lat: 38.330766, lng: -114.695692},
        {lat: 39.927193, lng: -115.053218},
        {lat: 31.330162, lng: -113.865694},
        {lat: 32.734358, lng: -113.439506},
        {lat: 32.734358, lng: -113.501315},
        {lat: 32.735258, lng: -114.438000},
        {lat: 33.999792, lng: -114.463352}
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