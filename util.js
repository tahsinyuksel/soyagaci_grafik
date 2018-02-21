var util = {

	createId: function() {
		// 10000 - 99999
		return Math.floor(Math.random() * 99999) + 10000  
	},

	makeCode: function(max) {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < max; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text;
	}	
};