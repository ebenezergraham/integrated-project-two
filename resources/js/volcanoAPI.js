var map;
var url = "https://data.humdata.org/dataset/a60ac839-920d-435a-bf7d-25855602699d/resource/7234d067-2d74-449a-9c61-22ae6d98d928/download/volcano.geojson";
var markers = []; // keep an array of Google Maps markers, to be used by the Google Maps clusterer
var infowindow;

$(document).ready(function () {
    // We fetch the volcano feed associated with the actual button that has been pressed.
    // In this example we are not plotting on a map, just demonstrating how to get the data.
    $.ajax({
        url: url, // The GeoJSON URL associated with a specific button was stored in the button's properties when the button was created

        success: function (data) {  // We've received the GeoJSON data
            var places = []; // We store the names of Volcano locations in this array
            // $.each(data.features, function (key, val) {  // Just get a single value ('place') and save it in an array
            //     places.push(val.properties.place); // Add a new volcano location to the array.
            //     console.log("this is a place" + val.properties.place);
            // });
            buildMap(url, places)
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
            // console.log(data.features);
            $.each(data.features, function (key, val) {
                // Get the lat and lng data for use in the markers
                var coords = val.geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);
                // Now create a new marker on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: 'https://maps.google.com/mapfiles/kml/shapes/volcano_maps.png',
                    volcano: val.properties,
                });
                console.log("marker volcano ")
                console.log(marker.volcano)
//                 // Form a string that holds desired marker infoWindow content. The infoWindow will pop up when you click on a marker on the map
                

                marker.addListener('click', function () {
                    try {  infowindow.close();  }catch(err) {  }
                   
                    var lat = marker.position.lat();
                    var lng = marker.position.lng();
                    var cont = '<p>Volcano name: ' + marker.volcano.V_Name + '</p>'+
                        '<p>Volcano id: ' + marker.volcano.VolcanoID + '</p>'+
                        '<p>Country: ' + marker.volcano.Country + '</p>'+
                        '<p>Region: ' + marker.volcano.Region + '</p>';                  

                    infowindow = new google.maps.InfoWindow({
                        content: cont
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

// $(document).ready(function () {
//         buildMap(url);
// });
