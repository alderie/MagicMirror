//import { Module, } from "module";

Module.register("test_module", {
	defaults: {foo: "I'm alive."},
	start: function () {
		this.count = 0;

		//<BAD PRACTICE TO CONTROL DRAWING!> Start is called before everything is rendered.

		//Lets the timer update and call the count every 1000ms
		let timer = setInterval(()=>{
			//Calls the getDom() function again. DO NOT CALL DIRECTLY!!! Use updateDom() instead.
			this.updateDom();
			this.count++;
		}, 1000);
	},
	getDom: function() {
		//Creates a div element in the HTML with the class of myContent
		var element = document.createElement("div");
		element.className = "myContent";
		element.innerHTML = "Hello, World!" + this.config.foo + this.config.bruh;

		//Create a paragraph of HTML type <p> with the ID of COUNT and the inner HTML being the count.
		let subElement = document.createElement("p");
		subElement.innerHTML = "Count: " + this.count;
		subElement.id = "COUNT";

		//Adds the subElement to the original element
		element.appendChild(subElement);
		return element;
	  },
	notificationReceived: function() {},
	socketNotificationReceived: function() {},
});