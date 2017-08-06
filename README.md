# Restroom Attendant pi-bot.
 
This bot is designed to keep track of the current status of the restroom and to notify the proper channels when the status changes. I use [passive infrared sensors](https://en.wikipedia.org/wiki/Passive_infrared_sensor) to detect motion since they are cheap, easy to use, and they're not creepy like a camera.
 
__NOTE:__ Many PIR sensors have a couple of knobs that allow you to adjust the sensitivity and time-delay. These settings may vary depending on your environment.

### Hardware
* Raspberry pi
* PIR sensor
* Breadboard
* Jumper cables

### Wiring
![Breadboard](/docs/breadboard.jpg "Wiring PIR sensor to Raspberry Pi.")

### TODO:
 - Swap to [pi zero](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) instead of pi 3.
 - Design inconspicuous project housing.
 - Fine tune bathroom status algorithm.
 - Install.