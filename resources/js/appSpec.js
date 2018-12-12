describe('Testing the functionality for the GeoDatum website', ()=>{
    let json = {
	    "location": {
	        "name": "Agdal",
	        "region": "",
	        "country": "Morocco",
	        "lat": 34.02,
	        "lon": -6.85,
	        "tz_id": "Africa/Casablanca",
	        "localtime_epoch": 1544582246,
	        "localtime": "2018-12-12 2:37"
	    },
	    "current": {
	        "last_updated_epoch": 1544581806,
	        "last_updated": "2018-12-12 02:30",
	        "temp_c": 10.0,
	        "temp_f": 50.0,
	        "is_day": 0,
	        "condition": {
	            "text": "Mist",
	            "icon": "//cdn.apixu.com/weather/64x64/night/143.png",
	            "code": 1030
	        },
	        "wind_mph": 0.0,
	        "wind_kph": 0.0,
	        "wind_degree": 153,
	        "wind_dir": "SSE",
	        "pressure_mb": 1023.0,
	        "pressure_in": 30.7,
	        "precip_mm": 0.0,
	        "precip_in": 0.0,
	        "humidity": 87,
	        "cloud": 50,
	        "feelslike_c": 10.0,
	        "feelslike_f": 50.0,
	        "vis_km": 5.0,
	        "vis_miles": 3.0,
	        "uv": 3.0
	    },
	    "forecast": {
	        "forecastday": [
	            {
	                "date": "2018-12-12",
	                "date_epoch": 1544572800,
	                "day": {
	                    "maxtemp_c": 19.1,
	                    "maxtemp_f": 66.4,
	                    "mintemp_c": 14.4,
	                    "mintemp_f": 57.9,
	                    "avgtemp_c": 15.9,
	                    "avgtemp_f": 60.6,
	                    "maxwind_mph": 5.8,
	                    "maxwind_kph": 9.4,
	                    "totalprecip_mm": 0.0,
	                    "totalprecip_in": 0.0,
	                    "avgvis_km": 20.0,
	                    "avgvis_miles": 12.0,
	                    "avghumidity": 79.0,
	                    "condition": {
	                        "text": "Partly cloudy",
	                        "icon": "//cdn.apixu.com/weather/64x64/day/116.png",
	                        "code": 1003
	                    },
	                    "uv": 3.1
	                },
	                "astro": {
	                    "sunrise": "07:24 AM",
	                    "sunset": "05:19 PM",
	                    "moonrise": "11:14 AM",
	                    "moonset": "09:59 PM"
	                }
	            },
	            {
	                "date": "2018-12-13",
	                "date_epoch": 1544659200,
	                "day": {
	                    "maxtemp_c": 16.8,
	                    "maxtemp_f": 62.2,
	                    "mintemp_c": 12.9,
	                    "mintemp_f": 55.2,
	                    "avgtemp_c": 15.2,
	                    "avgtemp_f": 59.4,
	                    "maxwind_mph": 17.4,
	                    "maxwind_kph": 28.1,
	                    "totalprecip_mm": 1.1,
	                    "totalprecip_in": 0.04,
	                    "avgvis_km": 18.2,
	                    "avgvis_miles": 11.0,
	                    "avghumidity": 80.0,
	                    "condition": {
	                        "text": "Heavy rain at times",
	                        "icon": "//cdn.apixu.com/weather/64x64/day/305.png",
	                        "code": 1192
	                    },
	                    "uv": 2.9
	                },
	                "astro": {
	                    "sunrise": "07:24 AM",
	                    "sunset": "05:19 PM",
	                    "moonrise": "11:50 AM",
	                    "moonset": "10:54 PM"
	                }
	            },
	            {
	                "date": "2018-12-14",
	                "date_epoch": 1544745600,
	                "day": {
	                    "maxtemp_c": 16.1,
	                    "maxtemp_f": 61.0,
	                    "mintemp_c": 10.7,
	                    "mintemp_f": 51.3,
	                    "avgtemp_c": 14.2,
	                    "avgtemp_f": 57.5,
	                    "maxwind_mph": 9.2,
	                    "maxwind_kph": 14.8,
	                    "totalprecip_mm": 0.0,
	                    "totalprecip_in": 0.0,
	                    "avgvis_km": 19.7,
	                    "avgvis_miles": 12.0,
	                    "avghumidity": 62.0,
	                    "condition": {
	                        "text": "Partly cloudy",
	                        "icon": "//cdn.apixu.com/weather/64x64/day/116.png",
	                        "code": 1003
	                    },
	                    "uv": 3.2
	                },
	                "astro": {
	                    "sunrise": "07:25 AM",
	                    "sunset": "05:20 PM",
	                    "moonrise": "12:22 PM",
	                    "moonset": "11:49 PM"
	                }
	            }
	        ]
	    }
		}
	const forecast = document.createElement('div');
	const city = document.createElement('input');
	const lat = document.createElement('input');
	const lon = document.createElement('input')
	forecast.id="forecast"
	city.id="city"
	lat.id="lat"
	lon.id="lon"
	openWeatherCall(json);

    it('should get weather forecast for 2 days', ()=>{
    	expect($( "#forecast").children()).length.toBe(2);
    })
	
	it('should get weather for searched city', ()=>{
	    expect($( "#city").value).toBe("Agdal, Morocco");
	})

	it('should get weather for the right coordinates', ()=>{
	    expect($( "#lat").value).toBe(json.location.lat);
	    expect($( "#lon").value).toBe(json.location.lon);
	})
})