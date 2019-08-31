

Module.register("menu", {

	// Default module config.
	defaults: {
		updateInterval: 1000 * 60,  //Minute Update Interval
		open:false,
		menuItems: [
			{
				name: 'Calendar',
				module: 'calendar' 
			},
			{
				name: 'Lights',
				module: 'lights' 
			},
			{
				name: 'Media',
				module: 'media' 
			}
		]
	},

	getScripts: function () {
		return [this.file("hammer.min.js")];
	},

	// Define required scripts.
	getStyles: function () {
		return ["menu.css"];
	},

	start: function () {
		Log.info("Starting module: " + this.name);

		//TODO: TIMING

		//setInterval(function() {
		//	self.updateDom(self.config.fadeSpeed);
		//}, this.config.updateInterval);

	},

	toggleClass(controller,state){
		if(state)
			controller.classList.add('active');
		else
			controller.classList.remove('active');
	},

	getDom: function () {

		let wrapper = document.createElement("div");
		let container = document.createElement("div");
		let controller = document.createElement("div");
		let menuLabel = document.createElement("div");
		let menu = document.createElement("div");

		//Decorative
		let stripe = document.createElement("div");
		stripe.classList.add('stripe-bar');

		let menuItems = [];

		container.appendChild(controller);
		menu.classList.add('menu');
		wrapper.classList.add('wrapper');
		menuLabel.textContent = "menu";
		menuLabel.classList.add('menu-label');

		for(let item of this.config.menuItems) {
			let menuItem = document.createElement("div");
			menuItem.classList.add("menu-item");
			menuItem.textContent = item.name;
			menuItem.addEventListener('touchstart', (evt)=>{

				for(let subItem of menuItems)
					subItem.classList.remove('pressed');
				

				menuItem.classList.add('pressed');
			});

			menuItems.push(menuItem);

			menu.appendChild(menuItem);
		}

		controller.classList.add('controller');
		
		container.addEventListener('touchstart', (ev)=>{
			this.config.open = !this.config.open;
			this.toggleClass(controller,this.config.open);
			this.toggleClass(menu, this.config.open);
			this.toggleClass(menuLabel, this.config.open);
		});

		wrapper.appendChild(stripe);
		wrapper.appendChild(container);
		wrapper.appendChild(menuLabel);
		wrapper.appendChild(menu);
		
		
		return wrapper;
	},

	notificationReceived: function () {},
	socketNotificationReceived: function () {},
});