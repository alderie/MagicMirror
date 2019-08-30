Module.register("slider", {

	// Default module config.
	defaults: {
        updateInterval: 1000 * 60, //Minute Update Interval
	},

	getScripts: function() {
        return [this.file("hammer.min.js")];
	},

	// Define required scripts.
	getStyles: function() {
		return ["slider_style.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        //TODO: TIMING
        
        //setInterval(function() {
		//	self.updateDom(self.config.fadeSpeed);
        //}, this.config.updateInterval);
        
    },

    getDom: function() {

        let wrapper = document.createElement("div");

        let cont = document.createElement("div");
        let box = document.createElement("div");
        let label = document.createElement('div');

        box.classList.add("drag");
        cont.classList.add("drag-container");
        label.classList.add("drag-label");
        label.textContent = "50";

        
        
        let hammertime = new Hammer(cont, {});
        cont.addEventListener('touchmove', function(ev){


            if(ev.target == box) {
                let posY = cont.getBoundingClientRect().top;
                let touchY = ev.touches[0].clientY;
                let rawString = box.style.height || "300px";
                let height = rawString.substring(0, rawString.length-2);
                height = parseInt(height);

                console.log(posY,touchY);
                box.style.height = ((touchY-posY)) + "px";
                if(touchY-posY<300 && touchY-posY>0) {
                    label.textContent = Math.floor(100*(touchY-posY)/300);
                }
                
                if(touchY-posY>300)
                    box.style.height =  "300px";
                if(touchY-posY<0)
                    box.style.height = "0px";
                
            }
        })
        cont.appendChild(box);
        wrapper.appendChild(cont);
        wrapper.appendChild(label);
        return wrapper;
    },

    notificationReceived: function() {},
	socketNotificationReceived: function() {},
});
