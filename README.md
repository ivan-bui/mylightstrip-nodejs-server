# My Lightstrip

### Background

Originally, I started this project to learn how to create an Alexa skill. I also used this opportunity to create an iOS companion app.

Taking inspiration from the Philips Hue product line, the Alexa skill and iOS app enables the user to change the colour and brightness of a WS2812 light strip.



### About

The Raspberry Pi is running an Express.js server to handle the API requests. It will parse the request and write the data to the WS2812 light strip via the PWM GPIO pin.
A DDNS was also used to allow remote access (Alexa skill is AWS Lambda hosted)
  
