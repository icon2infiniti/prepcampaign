function initMap() {

    var map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 2,
        center: {lat: 37.7749, lng: 122.4194}
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.

    $(document).ready(function () {
        var markers = locations.map(function (location, i) {
            return new CustomMarker(
                new google.maps.LatLng(location.position.lat, location.position.lng), map, location.icon
            );
        });
        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,{
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    });
}

function CustomMarker(latlng, map, imageSrc) {
    this.latlng_ = latlng;
    this.imageSrc = imageSrc;
    this.setMap(map);
}

$(document).ready(function () {

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function () {
        // Check if the div has been created.
        var div = this.div_;
        if (!div) {
            // Create a overlay text DIV
            div = this.div_ = document.createElement('div');
            // Create the DIV representing our CustomMarker
            div.className = "customMarker";


            var img = document.createElement("img");
            img.src = this.imageSrc;
            div.appendChild(img);
            // google.maps.event.addDomListener(div, "click", function (event) {
            //     google.maps.event.trigger(me, "click");
            // });

            // Then add the overlay to the DOM
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }

        // Position the overlay
        var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
        if (point) {
            div.style.left = point.x + 'px';
            div.style.top = point.y + 'px';
        }
    };

    CustomMarker.prototype.remove = function () {
        // Check if the overlay was on the map and needs to be removed.
        if (this.div_) {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
        }
    };

    CustomMarker.prototype.getPosition = function () {
        return this.latlng_;
    };
});