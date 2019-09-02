

Module.register("menu_sample", {

	// Default module config.
	defaults: {},

	start: function () {
		Log.info("Starting module: " + this.name);

	},
	getDom: function () {

		let wrapper = document.createElement("div");
		wrapper.textContent = "Menu Item";
		
		return wrapper;
	},

	notificationReceived: function (evt, data) {

		//Toggle modules
		if(evt=="MENU_SWITCH") {
			if(data.module==this.name) {
				Log.info("Selected " + this.name + " module!");
				this.show(300);
			} else {
				this.hide(300);
			}
		}

	},
	socketNotificationReceived: function () {},
});