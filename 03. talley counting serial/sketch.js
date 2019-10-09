// SERIAL STUFF
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/tty.wchusbserial1410'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data
let x = 1;
let px;

let all;
let nums = [];
let vals = [0, 0, 0, 0, 0, 0];
let speech;
let vs = ['Karen', 'Google UK English Male', 'Fred', 'Victoria', 'Mei-Jia', 'Paulina']


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  //SERIAL STUFF 
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName); // open a serial port
  speech = new p5.Speech(voiceReady);

  function voiceReady() {

  }
}

function serialEvent() {
  inData = serial.readLine();
}

// function serialEvent() {
//   // read a string from the serial port:
//   var inString = serial.readLine();
//   // check to see that there's actually a string there:
//   if (inString.length > 0 ) {
//   // convert it to a number:
//   inData = Number(inString);
//   }
// }

function serialError(err) {
  // println('Something went wrong with the serial port. ' + err);
}


function draw() {
  background(0);

  all = str(inData);
  all = split(all, ",");
  if (all.length > 1) {
    nums.push(all);
  }

  if (nums.length > 2) {
    nums.splice(0, 1); // 2 values in array
    for (i = 0; i < 6; i++) {
      if (nums[1][i] == 1 && nums[1][i] != nums[0][i]) { // check if same
        vals[i] = vals[i] + int(nums[1][i]);
        speech.setRate(1.4)
        speech.setVoice(vs[i]);
        // print (vs[i]);
        if (mouseX > width / 2) {
          speech.speak(vals[i]);
        }
      }
    }
  }
  if (mouseX > width / 2) {
    for (i = 0; i < vals.length; i++) {
      fill(255);
      textSize(45);
      text(vals[i], width / 7 * (i + 1), height / 2);
    }
  }
}