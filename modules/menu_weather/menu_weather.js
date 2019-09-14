Module.register("menu_weather", {

	// Default module config.
	defaults: {
		locationID: 4351977,
		apiKey: "",
		apiBaseURL: "https://api.openweathermap.org/data/2.5/",
		imageMap: {
			"01d": "day_sunny",
			"02d": "day_cloudy",
			"03d": "cloudy",
			"04d": "cloudy_windy",
			"09d": "showers",
			"10d": "rain",
			"11d": "thunderstorm",
			"13d": "snow",
			"50d": "fog",
			"01n": "night_clear",
			"02n": "cloudy",
			"03n": "cloudy",
			"04n": "cloudy",
			"09n": "night_showers",
			"10n": "night_rain",
			"11n": "night_thunderstorm",
			"13n": "night_snow",
			"50n": "night_alt_cloudy_windy"
		},
		rateLimit: 1500,
		cooldownTime: new Date().getTime(),
		cachedWeather: []
	},

	start: function () {
		Log.info("Starting module: " + this.name);

	},

	getStyles: function() {
		return ["menu_weather.css"];
	},

	getScripts: function() {
		return ["jquery.min.js"]
	},

	formatQuery: function(options) {
		let formatted = "?";
		for(let key in options)
			formatted+=`${key}=${options[key]}&`;
		return options ? formatted.substring(0, formatted.length-1): "";
	},


	req: function({path, options}) {

		let time = new Date().getTime();

		return new Promise((resolve,reject)=>{
			if(time > this.config.cooldownTime) {

				//Update call request delay
				this.config.cooldownTime = new Date().getTime() + this.config.rateLimit;

				//Override query params to always include apikey
				options.appid = this.config.apiKey;
				
				$.ajax({
					method: 'GET',
					url: this.config.apiBaseURL + path + this.formatQuery(options),
					dataType: "json"
				}).done(function(res){
					if(res && res.cod == "200") {
						resolve(res)
					} else {
						reject(res);
					}
				});

			} else {

				resolve(this.config.cachedWeather);
			}
		});

	},

	kelvinToFarenheit: function(kelvin) {
		return Math.floor((kelvin-273) * 9/5 + 32);
	},

	//Temperature is in kelvin
	get5DayForecast: function() {
		return this.req({
			path: "forecast",
			options: {
				id: this.config.locationID
			}
		}).catch(function(err){
			console.error("Failed to get a 5 day forecast! \n" + err);
		})
	},

	getDom: function () {

		let wrapper = document.createElement("div");
		wrapper.classList.add('wrapper');

		//Get weather/cached weather
		this.get5DayForecast().then((data)=>{

			let cityInfo = data.city;
			let weatherForecast = data.list;

			//Truncate list of weather
			if(weatherForecast.length>5)
				weatherForecast = weatherForecast.slice(0,5);

			//Map weather data into something readable
			weatherForecast = weatherForecast.map(data=>{
				return {
					temp: {
						current: this.kelvinToFarenheit(data.main.temp),
						min: this.kelvinToFarenheit(data.main.temp_min),
						max: this.kelvinToFarenheit(data.main.temp_max),
						pressure: this.kelvinToFarenheit(data.main.pressure),
						humidity: this.kelvinToFarenheit(data.main.humidity) //In percent
					},
					weather: data.weather[0]
				}
			});

			this.config.cachedWeather = {
				cityInfo,
				weatherForecast
			};

			return this.config.cachedWeather;
			
		}).then((weather)=>{

			let locationName = document.createElement("div");
			locationName.classList.add('location');
			locationName.textContent = weather.cityInfo.name;

			let weatherBox = document.createElement("div");
			weatherBox.classList.add('weather_wrapper');

			wrapper.appendChild(locationName);

			for(let item of weather.weatherForecast) {

				let weatherBlock = document.createElement("div");
				weatherBlock.classList.add('weather');

				let icon = document.createElement("img");
				icon.classList.add('icon');
				icon.src = `${this.data.path}icons/${this.config.imageMap[item.weather.icon]}.svg`;

				let weatherDesc = document.createElement("div");
				weatherDesc.classList.add('desc');
				weatherDesc.textContent = item.weather.main;

				let tempBlock = document.createElement("div");
				tempBlock.classList.add('temperature');
				
				let currentTemp = document.createElement("p");
				currentTemp.classList.add('current');
				currentTemp.textContent = item.temp.current + " F";

				let minTemp = document.createElement("p");
				minTemp.classList.add('min');
				minTemp.textContent = item.temp.min + " F";

				let maxTemp = document.createElement("p");
				maxTemp.classList.add('max');
				maxTemp.textContent = item.temp.max + " F";

				tempBlock.appendChild(currentTemp);
				tempBlock.appendChild(minTemp);
				tempBlock.appendChild(maxTemp);

				weatherBlock.appendChild(icon);
				weatherBlock.appendChild(weatherDesc);
				weatherBlock.appendChild(tempBlock);

				weatherBox.appendChild(weatherBlock);

			}

			wrapper.appendChild(weatherBox);
			
		});

		return wrapper;
	},

	notificationReceived: function (evt, data) {

		//Toggle modules
		if(evt=="MENU_SWITCH") {
			if(data.module==this.name) {
				Log.info("Selected " + this.name + " module!");
				this.show(500);
			} else {
				this.hide(0);
			}
		}

	},
	socketNotificationReceived: function () {},
});