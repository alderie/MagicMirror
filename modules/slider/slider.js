Module.register("slider", {

	// Default module config.
	defaults: {
		updateInterval: 1000 * 60, //Minute Update Interval
	},

	getScripts: function () {
		return [this.file("hammer.min.js")];
	},

	// Define required scripts.
	getStyles: function () {
		return ["slider_style.css"];
	},

	start: function () {
		Log.info("Starting module: " + this.name);

		//TODO: TIMING

		//setInterval(function() {
		//	self.updateDom(self.config.fadeSpeed);
		//}, this.config.updateInterval);

	},

	getDom: function () {

		let wrapper = document.createElement("div");

		let cont = document.createElement("div");
		let box = document.createElement("div");
		let label = document.createElement('div');

		box.classList.add("drag");
		cont.classList.add("drag-container");
		label.classList.add("drag-label");
		label.textContent = "50";

		//let hammertime = new Hammer(cont, {});
		cont.addEventListener('touchmove', function (ev) {
			//console.log(box.parentElement);
			if (ev.target == box || ev.target==cont) {
				cont.classList.add('dragging');
				let posY = cont.getBoundingClientRect().top;
				let touchY = ev.touches[0].clientY;
				let rawString = box.style.height || "300px";
				let height = rawString.substring(0, rawString.length - 2);
				height = parseInt(height);
				
				box.style.height = ((touchY - posY)) + "px";
				
				if (touchY - posY < 300 && touchY - posY > 0) {
					label.textContent = Math.floor(100 * (touchY - posY) / 300);
					label.style.top = ((touchY - posY)-15) + "px";
				}

				if (touchY - posY > 300) {
					box.style.height = "300px";
					label.textContent = "100";
				}
				if (touchY - posY < 0) {
					box.style.height = "0px";
					label.textContent = "0";
				}

			}
		});
		
		cont.addEventListener('touchend', function(ev){
			cont.classList.remove('dragging');
		});

		cont.appendChild(box);
		wrapper.appendChild(cont);
		wrapper.appendChild(label);
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