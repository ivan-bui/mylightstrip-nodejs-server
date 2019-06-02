const ws281x = require('../node-rpi-ws281x-native/lib/ws281x-native')

var brightness = require('./brightness.js');

module.exports = {
	setBrightness: function(userBrightness) {
		if(userBrightness == null) {
			return;
		}

		var tempBrightness = brightness.value;

		while(tempBrightness != userBrightness && tempBrightness >= 0 && tempBrightness < 256) {
			if (userBrightness > tempBrightness) { tempBrightness += 1; }
			if (userBrightness < tempBrightness) { tempBrightness -= 1; }
			ws281x.setBrightness(tempBrightness);
		}
	
		brightness.set(userBrightness)
	}
}
