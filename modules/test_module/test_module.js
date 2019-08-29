//import { Module, } from "module";

Module.register("test_module", {
	defaults: {foo: "I'm alive."},
	start: function () {},
	getDom: function() {
		var element = document.createElement("div");
		element.className = "myContent";
		element.innerHTML = "Hello, World!" + this.config.foo;
		return element;
	  },
	notificationReceived: function() {},
	socketNotificationReceived: function() {},
});