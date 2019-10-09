let wid = 600;
let hei = 600;

function preload() {
  for (i = 1; i < 7; i++) {
    sounds.push(loadSound(i + ".mp3"));
  }
  print(sounds);
}

function setup() {
  createCanvas(1800, 1125);
  frameRate(30);
}

function draw() {
  background(0);
  fill(255);
  // text(width, 300, 20);
  // text(height, 300, 40);
  noStroke();
  push();
  translate(600, 262.5);
  // NORMAL 
  nor++;

  // SINE
  sineVal = sin(radians(nor));
  sineVal = map(sineVal, -1, 1, 0, 2); // set interval
  sine = sine + sineVal;

  // SQUARE
  if (nor % 100 == 0) { // set interval
    if (squVal == 0) {
      squVal = 2;
    } else {
      squVal = 0;
    }
  }
  squ = squ + squVal;

  // TRIANGLE
  if (nor % 100 == 0) { // set interval
    triVal = 0;
  } else {
    triVal = map(nor % 100, 0, 100, 0, 2);
  }
  tri = tri + triVal;

  // NOISE
  xoff = xoff + noiMul;
  noiVal = noise(xoff) * 2; // set interval
  noi = noi + noiVal;

  // RANDOM
  ranVal = random(0, 2); // set interval
  ran = ran + ranVal;

  all.push(nor, sine, squ, tri, noi, ran);
  plot.push(norVal, sineVal, squVal, triVal, noiVal, ranVal);
  if (norVals.length < wid / 2) {
    norVals.push(norVal);
    sineVals.push(sineVal);
    squVals.push(squVal);
    triVals.push(triVal);
    noiVals.push(noiVal);
    ranVals.push(ranVal);
  } else {
    norVals.push(norVal);
    sineVals.push(sineVal);
    squVals.push(squVal);
    triVals.push(triVal);
    noiVals.push(noiVal);
    ranVals.push(ranVal);
    norVals.splice(0, 1);
    sineVals.splice(0, 1);
    squVals.splice(0, 1);
    triVals.splice(0, 1);
    noiVals.splice(0, 1);
    ranVals.splice(0, 1);
  }

  if (nor > 1) {
    all.splice(0, 6);
    plot.splice(0, 6);
  }

  for (i = 0; i < all.length; i++) {
    textSize(textsi);
    s = round(all[i]) % 100;
    m = floor(all[i] / 100);

    if (i == 0 && frameCount % 6000 == 0) {
      nor = 0;
      sine = 0;
      squ = 0;
      tri = 0;
      noi = 0;
      ran = 0;
      all.splice(0, 6)
      all.push(0, 0, 0, 0, 0, 0);
      h = h + 1;
    }

    // TEXT FORMAT
    if (s < 10) {
      stext = "0" + s;
    } else {
      stext = s;
    }

    if (m < 10) {
      mtext = "0" + m;
    } else {
      mtext = m;
    }

    if (h < 10) {
      htext = "0" + h;
    } else {
      htext = h;
    }


    fill(255);
    text(htext + ":" + mtext + ":" + stext, 0, (i * 100) + 50);

    if (mouseX > width / 2) {
      frate = map(mouseX, width / 2, width, 20, 100);
      frameRate(frate);
      if (mouseX > width - 200) { // play every xx frame
        prate = 20;
      } else {
        prate = 100;
      }
      if ((round(all[i]) % prate) < frate / 10) { // if one second
        fill(255, 0, 0);
        text(htext + ":" + mtext + ":" + stext, 0, (i * 100) + 50);
        if ((round(all[i]) % prate) == 0) {
          if (sounds[i].isPlaying() == 0) { // if not already playing
            if (mouseX > width - 200 && mouseX < width - 10) {
              sounds[floor(random(i))].play();
            }
            sounds[i].play();
          }
        }
      }
    } else {
      frameRate(20);
    }
  }


  // print (mouseX, width-200);

  // PLAYYYYY SOUNDSSSSS
  // for (i = 0; i < all.length; i++) {
  //   if (mouseX > wid / 2) {
  //     if (i != 2) {
  //       if ((round(all[i]) % 100) <5) { // if one second
  //         sounds[i].play();
  //         fill(255, 0, 0);
  //         text(htext + ":" + mtext + ":" + stext, 0, (i * 100) + 50);
  //       } else {   
  //       } 
  //     }
  //   }
  // }


  //VISUALS
  for (i = 0; i < plot.length; i++) {
    x = norVals.length + moveLine;
    y = (i * 100) + map(plot[i], 0, 2, 80, 20);
    strokeWeight(10);
    stroke(255);
    point(x, y);
    noStroke();
    textSize(13);
    text(plot[i], x + 5, y - 5);
  }

  // print (sineVals);
  // DRAW GRAPH
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (i = 0; i < norVals.length; i++) {
    x = i + moveLine;
    ynorVals = 0 + map(norVals[i], 0, 2, 80, 20);
    vertex(x, ynorVals);
  }
  endShape();

  beginShape();
  for (i = 0; i < norVals.length; i++) {
    x = i + moveLine;
    ysineVals = 100 + map(sineVals[i], 0, 2, 80, 20);
    vertex(x, ysineVals);
  }
  endShape();

  beginShape();
  for (i = 0; i < norVals.length; i++) {
    x = i + moveLine;
    ysquVals = 200 + map(squVals[i], 0, 2, 80, 20);
    vertex(x, ysquVals);
  }
  endShape();

  beginShape();
  for (i = 0; i < norVals.length; i++) {
    x = i + moveLine;
    ytriVals = 300 + map(triVals[i], 0, 2, 80, 20);
    vertex(x, ytriVals);
  }
  endShape();

  beginShape();
  for (i = 0; i < norVals.length; i++) {
    x = i + moveLine;
    ynoiVals = 400 + map(noiVals[i], 0, 2, 80, 20);
    vertex(x, ynoiVals);
  }
  endShape();

  beginShape();
  for (i = 0; i < norVals.length; i++) {
    x = i + moveLine;
    yranVals = 500 + map(ranVals[i], 0, 2, 80, 20);
    vertex(x, yranVals);
  }
  endShape();
  pop();
  if (mouseX > width - 10) {
    background(0);
    for (i = 0; i < 6; i++) {
      if (i != 0) {
        sounds[i].setVolume(0);
      }
    }
  }
}