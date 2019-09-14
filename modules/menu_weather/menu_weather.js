Module.register("menu_weather", {

	// Default module config.
	defaults: {
		location: "Washington"
	},

	start: function () {
		Log.info("Starting module: " + this.name);

	},

	getScripts: function() {
		return ["jquery.min.js"]
	},


	req: function({url, options}) {
		return new Promise((resolve,reject)=>{
			
			
			let formatted = "?";

			if(options) {
				for(let key in options)
					formatted+=`${key}=${options[key]}&`;
			} else {
				formatted = "";
			}


			$.ajax({
				method: 'GET',
				url: url + formatted,
				jsonp: "callback",
				dataType: "jsonp",
				success: function(data){
					resolve(data);
				},
				failure: function(data){
					reject(data);
				}
			})
			

			//xhttp.setRequestHeader("Content-Type","application/javascript");
			//xhttp.setRequestHeader("Access-Control-Allow-Origin","http://www.example.com");
			//xhttp.setRequestHeader("Access-Control-Allow-Headers","x-requested-with, x-requested-by");
			//xhttp.setRequestHeader("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36");
			//supported in new browsers...do JSONP based stuff in older browsers...figure out how

			//xhttp.send();
		});

	},

	getLocationWOEID: function() {
		return this.req({
			url: "https://www.metaweather.com/api/location/search",
			options: {
				query: this.config.location
			}
		});
	},

	getWeatherData: function() {

	},

	getDom: function () {

		let wrapper = document.createElement("div");

		this.getLocationWOEID().then(function(data){
			console.log(data);
		});

		wrapper.textContent = "Menu Item";
		
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