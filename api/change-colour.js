const express = require('express');
const router = express.Router();
const ws281x = require('../node-rpi-ws281x-native/lib/ws281x-native');
const helper = require('../helper/brightness-helper.js');

const colour = {
	"red" : {"r": 255, "g": 0, "b": 0},
	"orange" : {"r": 255, "g": 140, "b": 0},
	"yellow" : {"r": 255, "g": 215, "b": 0},
	"green" : {"r": 0, "g": 128, "b": 0},
	"blue" : {"r": 0, "g": 0, "b": 255},
	"purple" : {"r": 127, "g": 0, "b": 255},
	"pink" : {"r": 255, "g": 0, "b": 255},
	"white" : {"r": 255, "g": 255, "b": 255},
	"off" : {"r": 0, "g": 0, "b": 0}
};

var timer;
var userColour;
var NUM_LEDS = 75;
var pixelData = new Uint32Array(NUM_LEDS);
var red = 0, green = 0, blue = 0;

ws281x.init(NUM_LEDS);


// trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});


// change color by name
router.post('/', function(req, res) { 
	var newColour = req.body.colour

	if (userColour == newColour) {
		res.end();
		return;
	}
	
	if(!newColour) {
		setColour(colour[white]);
	} else if (newColour == 'rainbow'){
		animationLoop();
	} else {
		setColour(colour[newColour]);
	}
	
	res.status(204).end();
});


// change color by RGB value
router.post('/rgb', function(req, res) {
	var r = Math.floor(req.body.r * 255);
	var g = Math.floor(req.body.g * 255);
	var b = Math.floor(req.body.b * 255);
	var userBrightness = Math.floor(req.body.brightness * 255);
	var colour = {"r": r, "g": g, "b": b};

	setColour(colour);
	helper.setBrightness(userBrightness);

	res.status(204).end();
});


function setColour(colour) {
	if(colour == null) {
		return;
	}	
                    
	if(timer){ 
		clearInterval(timer); 
	}

	while(red != colour.r || green != colour.g || blue != colour.b){
		if ( red < colour.r) { red += 1; }
		if ( red > colour.r) { red -= 1; }

		if ( green < colour.g) { green += 1; }
		if ( green > colour.g) { green -= 1; }

		if ( blue < colour.b) { blue += 1; }
		if ( blue > colour.b) { blue -= 1; }

		for(var i = 0; i < NUM_LEDS; i++) {
			pixelData[i] = rgb2Int(red, green, blue);
		}
		ws281x.render(pixelData);
	}	
	userColour = colour;
}


function animationLoop() {
	var offset = 0;
	timer = setInterval(function () {
	  for (var i = 0; i < NUM_LEDS; i++) {
	    pixelData[i] = colorwheel((offset + i) % 256);
	  }
	
	  offset = (offset + 1) % 256;
	  ws281x.render(pixelData);
	}, 1000 / 30);
	userColour = 'rainbow';
}


// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colorwheel(pos) {
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}


function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}


module.exports = router;
