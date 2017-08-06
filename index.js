/**
 * Restroom Attendant pi-bot.
 *
 * This Raspberry pi bot was designed to fix a small inconvencience at my work place. In an office with about 12 
 * employees and only one restroom tucked away out of site, our coworkers needs to use said restroom often overlapped.  
 * Many times I found myself going back and forth to my desk after seeing the "Occupied" sign on the restroom door. 
 *
 * This bot is designed to keep track of the current status of the restroom and to notify the proper channels when the
 * status changes. I use passive infrared sensors to detect motion since they are cheap and easy to use, theyre also 
 * less creepy than a camera.
 *
 * NOTE: Most PIR sensors have a couple of knobs that allow you to adjust the sensitivity and time-delay. These settings
 * may vary depending on your environment.
 */
// Include dependencies.
var Gpio = require('onoff').Gpio;

// Define Constants.
const THIRTY_SECONDS = 30 * 1000,
      BUSY           = true,
      VACANT         = false;
      
// Initialize vars
var pir_sensor  = new Gpio(17, 'in', 'both'), // Pin connected to a passive infrared sensor to detect motion.
    pir_log     = [],
    last_status = VACANT;
  
// Check logs every 30 seconds to ensure bathroom is vacant before sending out a notification.
setInterval(function(){
  if( 0 == pir_log.length ){
    // Only send out notification if the last polled status was busy.
    if( BUSY === last_status ){ notify( VACANT ) }
    last_status = VACANT;
  }
  else{
    last_status = BUSY;
  }
  pir_log = []; // Clear logs and start poll again
}, THIRTY_SECONDS );   

// Watch pir sensor for motion,
pir_sensor.watch(function(err, value) {
  if (err) exit();
  
  if(value == 1){
    // Only send out notification if the last polled status was Vacant.
    if( 0 == pir_log.length && VACANT === last_status){ notify(BUSY) }
    pir_log.push(value) // Send to logs.
  }
});

console.log('Restroom Attendant at your service.');

/**
 * Destroy variables gracefully on exit.
 */
function exit() {
  pir_sensor.unexport();
  process.exit();
}

/**
 * Send status notification.
 *
 * Currently writes to log, but in future updates this will connect to your favorite notification system.
 * 
 * @param  {bool} status The current bathroom status.True for Busy, false for Vacant.
 */
function notify( status ){
  what = ( BUSY === status ) ? 'Busy' : 'Vacant';
  console.log( 'Restroom is ' + what );
}
