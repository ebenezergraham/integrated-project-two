var map;

var quakeFeeds = {
    "past hour": {
        "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
        "all 1.0+": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson",
        "all 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson",
        "all 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson",
        "all significant": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson"
    },
    "past day": {
        "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
        "all 1.0+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson",
        "all 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson",
        "all 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson",
        "all significant": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson"
    },
    "past week": {
        "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
        "all 1.0+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson",
        "all 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
        "all 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
        "all significant": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
    },
    "past month": {
        "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        "all 1.0+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson",
        "all 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson",
        "all 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson",
        "all significant": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
    }
};

/* Function to construct a set of web page buttons of class: 'feed-name' where each button has a stored URL property */
function makeChildProps(obj, currentProp) {
    var childProps = '';

    for (var prop in obj[currentProp]) {
        var el = "<div class='child-prop'><button class='feed-name' data-feedurl='" + obj[currentProp][prop] + "'>" + prop + "</button></div>";
        childProps += el;
    }

    return childProps;
}

/* construct the buttons (that include the geojson URL properties) */
for (var prop in quakeFeeds) {
    if (!quakeFeeds.hasOwnProperty(prop)) {
        continue;
    }
    $('#feedSelector').append("<div class='feed-date'>" + prop + "</div>" + makeChildProps(quakeFeeds, prop));
    console.log(makeChildProps(quakeFeeds, prop));
}
/* respond to a button press of any button of 'feed-name' class */
$('.feed-name').click(function (e) {
    // We fetch the earthquake feed associated with the actual button that has been pressed.
    // In this example we are not plotting on a map, just demonstrating how to get the data.
    $.ajax({
        url: $(e.target).data('feedurl'), // The GeoJSON URL associated with a specific button was stored in the button's properties when the button was created

        success: function (data) {  // We've received the GeoJSON data
            var places = []; // We store the names of earthquake locations in this array
            $.each(data.features, function (key, val) {  // Just get a single value ('place') and save it in an array
                places.push(val.properties.place); // Add a new earthquake location to the array.
            });
            buildMap($(e.target).data('feedurl'))
        }
    });
});

function buildMap(url, places) {
    // Set Google map  to its start state
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
        mapTypeId: 'terrain' // can be any valid type
    });
    // The following uses JQuery library
    $.ajax({
        // The URL of the specific data required
        url: url,

        // Called if there is a problem loading the data
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },
        // Called when the data has succesfully loaded
        success: function (data) {
            i = 0;
            var markers = []; // keep an array of Google Maps markers, to be used by the Google Maps clusterer
            $.each(data.features, function (key, val) {
                // Get the lat and lng data for use in the markers
                var coords = val.geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);
                // Now create a new marker on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });

                // Form a string that holds desired marker infoWindow content. The infoWindow will pop up when you click on a marker on the map
                var infowindow = new google.maps.InfoWindow({
                    content: " <div id=\"weatherImage\"></div>\n" +
                        "    <div id=\"weatherInfo\">No Weather data available</div>"
                });
                marker.addListener('click', function () {
                    // We use the lat and lon as the parameters in the API call to weather service
                    var lat = marker.position.lat();
                    var lng = marker.position.lng();
                    // You need to use the FREE signup at https://www.apixu.com/ to get a key for the Weather URL below
                    theURL = 'https://api.apixu.com/v1/current.json?key=67923d08f9504585a23131454180311&q=' + lat.toFixed(4) + ',' + lng.toFixed(4);
                    $.ajax({
                        url: theURL,
                        success: function (data) {
                            image = new Image();
                            if (data.error) {
                                image.src = "http://via.placeholder.com/64x64?text=%20"; // Error, so we use blank image for weather. See 'error:' below for another way to include a small blank image
                            }
                            else {
                                image.src = "http:" + data.current.condition.icon; // icon is specified within the data

                                $('#weatherInfo').html(
                                    '<p>Condition: ' + data.current.condition.text + '</p>'+
                                    '<p>Wind Speed: ' + data.current.wind_kph + '</p>'+
                                    '<p>Wind Degree: ' + data.current.wind_degree + '</p>'+
                                    '<p>Wind Direction: ' + data.current.wind_dir + '</p>'+
                                    '<p>Pressure: ' + data.current.pressure_mb + '</p>'+
                                    '<p>Precip: ' + data.current.precip_in + '</p>'+
                                    '<p>Cloud: ' + data.current.cloud + '</p>'+
                                    '<p>Humidity: ' + data.current.humidity + '</p>'+
                                    '<p>Temperator:' + data.current.feelslike_c + '</p>'+
                                    '<p>UV Level: ' + data.current.uv + '</p>'
                                ); // current weather in text format
                            }
                            image.onload = function () {
                                $('#weatherImage').empty().append(image);
                            };

                        },
                        error: function () { // Weather service could not provide weather for requested lat,lon world location
                            image = new Image();
                            // A local 64*64 transparent image. Generated from the useful site: http://png-pixel.com/
                            image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAPElEQVR42u3OMQEAAAgDIJfc6BpjDyQgt1MVAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBgXbgARTAX8ECcrkoAAAAAElFTkSuQmCC";
                            image.onload = function () {
                                //set the image into the web page
                                $('#weatherImage').empty().append(image);
                            };
                        }
                    });
                    infowindow.open(map, marker);
                });
                markers[i++] = marker; // Add the marker to array to be used by clusterer
            });
            var markerCluster = new MarkerClusterer(map, markers,
                { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        }
    });
}

$(document).ready(function () {
        buildMap("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson");
});
