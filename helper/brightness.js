// current lightstrip brightness; default is 255 (max brightness)
var Brightness = module.exports = {
	value: 255,
	set: function(newValue) {
		Brightness.value = newValue
	}
};