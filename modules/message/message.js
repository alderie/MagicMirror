Module.register("message",{

	// Default module config.
	defaults: {
        message: ["Good Morning!", "Good Afternoon!", "Good Evening!", "Good Night!"],
        updateInterval: 1000 * 60, //Minute Update Interval
	},

	getScripts: function() {
        return [this.file("moment-with-locales.js")];
	},

	// Define required scripts.
	getStyles: function() {
		return ["style.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        //TODO: TIMING
        
        setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
        }, this.config.updateInterval);
        
    },

    

    getDom: function() {

        let wrapper = document.createElement("div");
        let text = document.createElement("div");
        let time = document.createElement("div");
        let date = document.createElement("div");

        text.classList.add('message-box');
        time.classList.add('time');
        date.classList.add('date');

        let currentTime = moment().format("LT");
        let currentDate = moment().format("LL");
        time.textContent = currentTime;
        date.textContent = currentDate;

        let morning = moment().isAfter(moment({h: 0, m: 0})) && moment().isBefore(moment({h: 12, m: 0}));
        let dayTime = moment().isAfter(moment({h: 12, m: 0})) && moment().isBefore(moment({h: 17, m: 0}));
        let evening = moment().isAfter(moment({h: 17, m: 0})) && moment().isBefore(moment({h: 21, m: 0}));
        let night = moment().isAfter(moment({h: 21, m: 0})) && moment().isBefore(moment({h: 24, m: 0}));

        Log.info(morning, dayTime, evening, night);

        if(morning)
            text.textContent = this.config.message[0];
        if(dayTime)
            text.textContent = this.config.message[1];
        if(evening)
            text.textContent = this.config.message[2];
        if(night)
            text.textContent = this.config.message[3];

        wrapper.appendChild(date)
        wrapper.appendChild(time);
        wrapper.appendChild(text);
        
        return wrapper;
    },

    notificationReceived: function() {},
	socketNotificationReceived: function() {},
});
