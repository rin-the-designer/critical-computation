//preloading font
function preload() {
  bebasNeue = loadFont('/BebasNeue-Regular.ttf');
}

//setting up canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont(bebasNeue);
  textAlign(CENTER);
  rectMode(CENTER);
}

//predifined values for variables
R = 242;
G = 146;
B = 33;
A = 75;
bgG = 200;
bgB = 255;

let beerOriginalWidth = 50;
let beerOriginalHeight = 150;

let sojuOriginalWidth = 36;
let sojuOriginalHeight = 100;

//drawing on canvas
function draw() {
  background(0);
  
  //setting variables to make life easier
  widthSixth = width / 6;
  heightHalf = height / 2;

  //create sky
  R -= 0.07;
  G -= 0.05;
  B -= 0.05;
  bgG -= 0.10;
  bgB -= 0.10;

  sky = createGraphics(widthSixth * 2, height);
  sky.background(0,bgG,bgB);
  sky.noStroke();
  sky.fill(R, G, B, A);
  
  for (let i = 1; i <= 8; i++) {
    sky.ellipse(widthSixth, height, widthSixth * i);
  }
  
  image(sky, 0, 0);
  
  //setting time numbers
  fill(255);
  let m = floor(millis() / 1000 * 4);
  let beerTime = m/20;
  let sojuTime = m/30;
  
  if (m >= 240){
    m = 240;
  }
  if (beerTime >= 12){
    beerTime = 12;
  }
  if (sojuTime >= 8){
    sojuTime = 8;
  }
  
  //drawing the beer & soju bottles
  drawBeerBottles(floor(beerTime));
  drawSojuBottles(floor(sojuTime));
  
  //displaying time numbers
  textSize(48);
  text(`${nf(m, 3, 0)} Min`, widthSixth, height / 2);
  text(`${nf(beerTime, 1, 1)} Bottles`, widthSixth * 3, height / 2);
  text(`${nf(sojuTime, 1, 1)} Bottles`, widthSixth * 5, height / 2);
  
  //displaying fixed text
  textSize(20);
  text('time', widthSixth, 40);
  text('beer time', widthSixth * 3, 40);
  text('soju time', widthSixth * 5, 40);
  
  //line dividing sections
  push();
  stroke(255);
  strokeWeight(6);
  line(widthSixth * 2, 0, widthSixth * 2, height);
  line(widthSixth * 4, 0, widthSixth * 4, height);
  pop();
}

//Acknowledgement: ChatGPT 4o guided me on drawing bottles on a specific timing at a specific location. Changes were made to the GPT code to better define the actual available space, and better represent the scales.

//draw beer bottles
function drawBeerBottles(count) {
  //area for bottle
  let startX = width / 3;
  let endX = (2 * width) / 3;
  let startY = height / 20;
  let endY = height / 20 * 19;
  
  let colCount = 3;
  let rowCount = 4;

  //available space for beer bottles
  let availableWidth = (endX - startX) / colCount;
  let availableHeight = (endY - startY) / rowCount;

  //aspect ratio
  let beerScaleFactor = min(availableWidth / beerOriginalWidth, availableHeight / beerOriginalHeight) * 0.6;
  
  let beerWidth = beerOriginalWidth * beerScaleFactor;
  let beerHeight = beerOriginalHeight * beerScaleFactor;
  
  //display bottles on count
  let displayedBottles = min(count, 12);

  for (let i = 0; i < displayedBottles; i++) {
    let col = i % colCount;
    let row = floor(i / colCount);
    
    let bottleX = startX + col * availableWidth + availableWidth / 2;
    let bottleY = startY + row * availableHeight + availableHeight / 2;
    
    drawBeerBottle(bottleX, bottleY, beerWidth, beerHeight);
  }
}

function drawBeerBottle(x, y, beerWidth, beerHeight) {
  push();
  //define component height
  let bottleBodyHeight = beerHeight * 0.6;
  let bottleNeckHeight = beerHeight * 0.25;
  let bottleCapHeight = beerHeight * 0.05;
  
  //bottle body
  fill(78, 40, 0, 200);
  rect(x, y, beerWidth, bottleBodyHeight, 4);
  rect(x, y - bottleBodyHeight / 2 - bottleNeckHeight / 2, beerWidth * 0.4, bottleNeckHeight, 2);
  rect(x, y - bottleBodyHeight / 2 - bottleNeckHeight - bottleCapHeight / 2, beerWidth * 0.45, bottleCapHeight, 2);
  
  //bottle label
  fill(255);
  rect(x, y, beerWidth, bottleBodyHeight * 0.4);
  
  fill(0);
  textSize(20);
  text('beer', x, y + 4);
  
  pop();
}


//draw soju bottles
function drawSojuBottles(count) {
  // Define the area for bottles: from widthSixth*4 to widthSixth*6 (third third of window)
  let startX = (2 * width) / 3;
  let endX = width;
  let startY = height / 20;
  let endY = height / 20 * 19;
  
  let colCount = 2;
  let rowCount = 4;

  //available space for soju bottles
  let availableWidth = (endX - startX) / colCount;
  let availableHeight = (endY - startY) / rowCount;

  //aspect ratio
  let sojuScaleFactor = min(availableWidth / sojuOriginalWidth, availableHeight / sojuOriginalHeight) * 0.5;
  
  let sojuWidth = sojuOriginalWidth * sojuScaleFactor;
  let sojuHeight = sojuOriginalHeight * sojuScaleFactor;
  
  //display bottles on count
  let displayedBottles = min(count, 8);

  for (let i = 0; i < displayedBottles; i++) {
    let col = i % colCount;
    let row = floor(i / colCount);
    
    let bottleX = startX + col * availableWidth + availableWidth / 2;
    let bottleY = startY + row * availableHeight + availableHeight / 2;
    
    drawSojuBottle(bottleX, bottleY, sojuWidth, sojuHeight);
  }
}

function drawSojuBottle(x, y, sojuWidth, sojuHeight) {
  push();
  //define component height
  let bottleBodyHeight = sojuHeight * 0.6;
  let bottleNeckHeight = sojuHeight * 0.25;
  let bottleCapHeight = sojuHeight * 0.1;
  
  //bottle body
  fill(0, 125, 23, 200);
  rect(x, y, sojuWidth, bottleBodyHeight, 4);
  rect(x, y - bottleBodyHeight / 2 - bottleNeckHeight / 2, sojuWidth * 0.4, bottleNeckHeight, 2);
  rect(x, y - bottleBodyHeight / 2 - bottleNeckHeight - bottleCapHeight / 2, sojuWidth * 0.42, bottleCapHeight, 2);
  
  //bottle label
  fill(255);
  rect(x, y, sojuWidth, bottleBodyHeight * 0.4);
  
  fill(0);
  textSize(20);
  text('soju', x, y + 4);
  
  pop();
}