let lat = 0;
let lon = 0;
let days = "&days=7";
let weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

openWeatherURL = "http://api.apixu.com/v1/forecast.json?key=8c56c6af6d8a458fa49222421182311&q=";

$(document).ready(function () {
//Weather through geo-location
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGetPos, errorGetPos);
    }
//Weather through city search 
    $("#search").click(getCityWeather);

//Weather through longitude and latitude search 
    $("#submit").submit(getCoordWeather);
});

function successGetPos(pos) {
    //let openWeatherURL = "",
    corsAwURL = "https://cors-anywhere.herokuapp.com/";
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
// The "https://cors-anywhere.herokuapp.com/" url is used to fix the "same-origin policy" (crossorigin) problem with the ajax call.
//If you want to work with navigator.geolocation, JSONP can't solve the issue for every browser due to the different connection type: https on codepen (for making navigator.geolocation works on chrome), http on api.openweathermap (it doesn't seem to work on firefox anyway).
// The "https://cors-anywhere.herokuapp.com/" url actually behaves like a proxy.
    url = lat + "," + lon + days;
    $.getJSON(corsAwURL + openWeatherURL + url, openWeatherCall);
    return 0;
}

function errorGetPos() {
	console.log("oops, access denied to geolocation! Using Mauritian coordinates.");
	position = {
		coords : {
			latitude : -20.251868,
			longitude : 57.870755
		}
	}
	console.log(position);
	succesGetPos(position);

return -1
}

function openWeatherCall(json) {
    $("#city").val(json.location.name + ", " + json.location.country);
    $("#lat").val(json.location.lat);
    $("#lon").val(json.location.lon);
    $("#temp").html(json.current.temp_c.toFixed(1));
    $("#hum").html(json.current.humidity);
    $("#wind").html(json.current.wind_kph);
    $("#pressure").html(json.current.pressure_mb);
    $("#icon").html("<img src='http:" + json.current.condition.icon.replace("64x64", "128x128") + "'>");
    $("#uv").html(json.current.uv);
    $("#feels").html(json.current.feelslike_c);
    $("#weather").html(json.current.condition.text);
    $("#forecast").empty();
    for (let i = 0; i < json.forecast.forecastday.length; i++) {
        d = new Date(json.forecast.forecastday[i].date);
        if (i == 0) {
            $("#today").html(json.forecast.forecastday[i].day.avgtemp_c)
        } else {
            day = "<span class ='row'>" + weekday[d.getDay()] + "</span>";
            pic = "<img class ='row' src='http:" + json.forecast.forecastday[i].day.condition.icon + "'>";
            p = "<div class ='row'>" + json.forecast.forecastday[i].day.avgtemp_c + "</div>";
            $('#forecast').append("<div class='col-md-2' id = 'day" + i + "'>" + day + pic + p + "</div>")
        }
    }

    return 0;
}

function getCityWeather() {
    let openWeatherQuery = openWeatherURL,
        cityName = $("#city").val(),
        corsAwURL = "https://cors-anywhere.herokuapp.com/";
    $.getJSON(corsAwURL + openWeatherQuery + cityName + days, openWeatherCall);
    return 0;
}

function getCoordWeather() {
    lat = $("#lat").val();
    lon = $("#lon").val();
    corsAwURL = "https://cors-anywhere.herokuapp.com/";
    url = lat + "," + lon + days;
    $.getJSON(corsAwURL + openWeatherURL + url, openWeatherCall);
    return 0;
}
