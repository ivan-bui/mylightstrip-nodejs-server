const express = require('express');
const bodyParser = require('body-parser');
const colourRouter = require('./api/change-colour.js');
const brightnessRouter = require('./api/change-brightness.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/lightstrip/colour', colourRouter);
app.use('/lightstrip/brightness', brightnessRouter);

var server = app.listen(8085, '192.168.1.150');
console.log("Server is running")