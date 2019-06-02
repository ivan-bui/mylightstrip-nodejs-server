const express = require('express');
const router = express.Router();
const helper = require('../helper/brightness-helper.js');

var brightness = require('../helper/brightness.js');


// return current lightstrip brightness
router.get('/', function(req, res) {
	res.json({ "brightness": brightness.value });
});


// set lightstrip brightness
router.post('/', function(req, res) {	
	var userBrightness = Math.floor(req.body.brightness * 255);
	helper.setBrightness(userBrightness);

	res.status(204).end();
});


module.exports = router;
