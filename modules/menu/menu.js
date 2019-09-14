

Module.register("menu", {

	// Default module config.
	defaults: {
		open:false,
		activeModule: 'menu_weather', //Module active by default
		menuItems: [ //List of modules with their display name and their module name
			{
				name: 'Weather',
				module: 'menu_weather' 
			},
			{
				name: 'Lights',
				module: 'lights' 
			},
			{
				name: 'Media',
				module: 'media' 
			}, {
				name: 'Slider',
				module: 'slider'
			}
		]
	},

	getScripts: function () {
		return [];//return [this.file("hammer.min.js")];
	},

	// Define required scripts.
	getStyles: function () {
		return ["menu.css"];
	},

	start: function () {
		Log.info("Starting module: " + this.name);
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

			if(item.module==this.config.activeModule)
				menuItem.classList.add('pressed');

			menuItem.addEventListener('touchstart', (evt)=>{

				for(let subItem of menuItems)
					subItem.classList.remove('pressed');
				
				if(item.module!=this.config.activeModule) {
					this.config.activeModule = item.module;
					this.sendNotification('MENU_SWITCH', {
						module: item.module
					});
				}

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

	notificationReceived: function (evt) {
		if(evt=="MODULE_DOM_CREATED"){
			//Enable active module by default
			this.sendNotification('MENU_SWITCH', {
				module: this.config.activeModule
			});
		}
	},
	socketNotificationReceived: function () {},
});