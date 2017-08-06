var Gpio = require('onoff').Gpio,
  pir = new Gpio(17, 'in', 'both');
  
const THIRTY_SECONDS = 30 * 1000,
      BUSY           = true,
      VACANT         = false;
      
var pir_log = [],
    last_status = VACANT;
  
  
setInterval(function(){
  if( 0 == pir_log.length ){
    if( BUSY === last_status ){
      notify( VACANT );
    }
    last_status = VACANT;
  }
  else{
    last_status = BUSY;
  }
  pir_log = [];
}, THIRTY_SECONDS );   

pir.watch(function(err, value) {
  if (err) exit();
  
  if(value == 1){
    if( 0 == pir_log.length && VACANT === last_status){
      notify(BUSY);
    }
    pir_log.push(value)
  }
});

console.log('Restroom Attendant at your service.');

function exit() {
  pir.unexport();
  process.exit();
}

function notify( status ){
  what = ( BUSY === status ) ? 'Busy' : 'Vacant';
  console.log( 'Restroom is ' + what );
}
