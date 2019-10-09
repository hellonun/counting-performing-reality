
let millisecond;
let m;
let s;
let number = 1;
let d = 1000;

function preload() {
  counting = loadSound("counting.mp3", loaded);
}

function loaded() {
  counting.play(0, 1, 20, 4, 64);
  // note: ([startTime], [rate], [amp], [cueStart], [duration])
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let voice = new p5.Speech();
  // TEXT 
  millisecond = millis();
  if (frameCount % 500 == 0) {
    d = d - 200;
  } else if (frameCount % 800 == 0) {
    d = d + 400;
  }
  // print(d);

  m = (millisecond / d);
  m = str(m);
  var splitString = split(m, '.');
  m1 = splitString[0];
  m1 = int(m1);
  if (m1 <10) {
  m1 = str(m1);
    m1 = "0" + m1;
  } else {
  m1 = str(m1);
  }
  m2 = splitString[1];
  m2 = int(m2)
  m2 = str(m2/10000000000000);
  var splitString2 = split(m2, '.');
  m2 = splitString2[0];
    
  if (frameCount % 2 == 0) {
    background(0);
    fill(255);
    textSize(50);
    text(m1 + ":" + m2, width / 2, height / 2);
  }

  //   if (frameCount % 2 == 0) {
  //   fill(255);
  //   textSize(100);
  //   text(str(60 -(millisecond/1000)), width / 4, height / 4 *3);
  // }

  // COMPUTER SPEED
  let r = ceil(random(45, 75));
  if (frameCount % r == 0) {
    voice.setVolume(0.7);
    voice.speak(number);
    number = number + 1;
  }

  if (millisecond > 1000 * 64) {
    background(0);
    voice.cancel();
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(240);
    osc.amp(0);
    osc.start();
    osc.amp(0.2, 0.1);
  }
  // print (millisecond);
  masterVolume(0.4);
}