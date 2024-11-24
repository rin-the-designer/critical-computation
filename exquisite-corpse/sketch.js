let state = 'Default';
let timer = 0;
let hearts = [];
let redValue = 255;
let redChanger = -1;

function preload() {
  neueDisplay = loadFont('/assets/NeueDisplay-Ultra.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  textFont(neueDisplay);
  angleMode(DEGREES);
}

function draw() {
  orbitControl();
  lights();
  scale(0.6);

  if (state === 'Fish') {
    background(255, 182, 193);
    handleTimer();
    drawHearts();
  } else if (state === 'Plastic') {
    handleRedFlash();
    handleTimer();
  } else {
    background(230);
  }

  drawPenguin();
  
  push();
  fill(200);
  ellipse(-150,-400,200,120);
  triangle(-50,-400,0,-460,0,-340);
  translate(0,0,0.1);
  fill(0);
  circle(-220,-415,16);
  textAlign(CENTER);
  textSize(18);
  text('press 1',-140,-395);
  pop();
  
  push();
  fill(200);
  rectMode(CENTER);
  rect(150,-400,200,100,16);
  translate(0,0,0.1);
  triangle(250,-440,300,-400,250,-360);
  rect(300,-400,20,30)
  fill(0);
  textAlign(CENTER);
  textSize(18);
  text('press 2',150,-395);
  pop();
}

// State change timer
function handleTimer() {
  timer++;
  if (timer % 60 === 0 && hearts.length < 5) {
    let heartWidth = 500 + hearts.length * 200;
    let heartColor = color(255, 182 - hearts.length * 30, 193 - hearts.length * 30);
    
    //Acknowledgement: ChatGPT 4o guided me on pushing values to heart.
    hearts.push({ width: heartWidth, color: heartColor, zPos: -300 - hearts.length });
  }

  if (timer > 360) {
    state = 'Default';
    hearts = [];
    timer = 0;
  }
}

// Function to draw the hearts
function drawHearts() {
  for (let i = 0; i < hearts.length; i++) {
    let heart = hearts[i];
    push();
    fill(heart.color);
    translate(0, 0, heart.zPos);
    drawHeart(heart.width);
    pop();
  }
}

//Code reference: https://editor.p5js.org/ronikaufman/sketches/zyrZpaSQl
function drawHeart(size) {
  let x = 100;
  let y;

  x += 0.3;
  y = 3 * (cos(x) + sin(x / 2)) + size / 2;
  
  translate(0,-200)
  rotateZ(45)
  square(0, 0, y);
  circle(y / 2, 0, y);
  circle(0, y / 2, y);
}

function handleRedFlash() {
  background(redValue, 0, 0);
  redValue += redChanger * 6;
  if (redValue <= 100 || redValue >= 255) {
    redChanger *= -1;
  }
}

// Draw buttons
// function drawButton(x, y, buttonColor, textContent, textColor) {
//   textAlign(CENTER);
//   textSize(8);
//   push();
//   fill(buttonColor);
//   translate(x, y);
//   box(100, 50, 50);
//   pop();
//   push();
//   fill(textColor);
//   translate(0, 0, 25.1);
//   text(textContent, x, y);
//   pop();
// }

// Keypress function
function keyPressed() {
  if (key === '1') {
    state = 'Fish';
    timer = 0;
  } else if (key === '2') {
    state = 'Plastic';
    timer = 0;
  }
}

//Draw penguin
function drawPenguin() {
  //The New School sweater
  patternBody = createGraphics(100, 200);
    patternBody.background(50);
    patternBody.rectMode(CENTER);
    patternBody.textAlign(CENTER);
    patternBody.noStroke();
    patternBody.fill(255,0,0);  
    patternBody.textSize(32);
    patternBody.text('N',50,80);
    patternBody.rect(50,84,16,4);
    patternBody.rect(50,92,16,4);
  
  //Penguin head pattern
  patternHead = createGraphics(300,300);
    patternHead.background(100);
    patternHead.noStroke();
    patternHead.fill(255);
    patternHead.ellipse(150,200,100,200);
    patternHead.fill(0);
    patternHead.ellipse(130,150,3,10);
    patternHead.ellipse(170,150,3,10);
    patternHead.fill(100);
    patternHead.ellipse(150,160,20,20);
    patternHead.triangle(130,100,170,100,150, 160);
    patternHead.fill(255,100,100,180);
    patternHead.ellipse(120,180,20,20);
    patternHead.ellipse(180,180,20,20);
  
  //Head---------------------------------------------------
  push();
    push();
    texture(patternHead);
    rotateY(180);
    translate(0,-180)
    sphere(100);
    pop();
    
    //Scarf
    push();
    fill(253,217,34);
    translate(0,-90);
    rotateX(90);
    torus(80,25);
    pop();
    push();
    fill(253,217,34);
    translate(50,-40,60);
    cylinder(24,80);
    pop();
  pop();
  
  //Body---------------------------------------------------
  push();
    fill(50);
    quad(-75,-100,50,75,-100,50,120,100,50,-120,100,50);
    quad(-75,-100,50,-75,-100,-50,-120,100,-50,-120,100,50);
    quad(75,-100,50,75,-100,-50,120,100,-50,120,100,50);
    quad(-75,-100,-50,75,-100,-50,120,100,-50,-120,100,-50);
    quad(-75,-100,50,-75,-100,-50,75,-100,-50,75,-100,50);
    quad(-120,100,50,-120,100,-50,120,100,-50,120,100,50);

    texture(patternBody);
    beginShape();
    vertex(-75,-100,50,0,0);
    vertex(75,-100,50,100,0);
    vertex(75,100,50,100,200);
    vertex(-75,100,50,0,200);
    endShape();
  pop();
  
  //Arms---------------------------------------------------
  push();
    fill(50);

    //Arm Left
    push();
    translate(80,-60);
    rotate(-60);
    cylinder(20,88);
    pop();

    push();
    translate(120,-10);
    rotate(-15);
    cylinder(20,80);
    pop();

    push();
    translate(130,32,24);
    rotateX(60);
    rotateZ(-5);
    cylinder(20,80);
    pop();

    //Arm Right
    push();
    translate(-80,-60);
    rotate(60);
    cylinder(20,88);
    pop();

    push();
    translate(-120,-10);
    rotate(15);
    cylinder(20,80);
    pop();

    push();
    translate(-130,32,24);
    rotateX(60);
    rotateZ(5);
    cylinder(20,80);
    pop();
  pop();
  
  //Hands---------------------------------------------------
  push();
    fill(100);

    //Hand Left
    push();

    translate(133,50,50);
    rotateX(60);
    rotateZ(-5);
    cylinder(8,60);
    pop();

    push();
    translate(135,70,90);
    rotateX(60);
    rotateY(90)
    rotateZ(-5);
    torus(16,10);
    pop();

    //Hand Right
    push();
    translate(-133,50,50);
    rotateX(60);
    rotateZ(5);
    cylinder(8,60);
    pop();

    push();
    translate(-135,70,90);
    rotateX(60);
    rotateY(90)
    rotateZ(5);
    torus(16,10);
    pop();
  pop();
  
  //Pants---------------------------------------------------
  push();
    fill(100);
    translate(0,150);
    box(236,100,96);

    fill(50);

    push();
    translate(0,15,0);
    box(8,72,98);
    pop();

    push();
    translate(-115,0,45);
    box(8,102,8);
    pop();

    push();
    translate(115,0,45);
    box(8,102,8);
    pop();

    push();
    translate(-115,0,-45);
    box(8,102,8);
    pop();

    push();
    translate(115,0,-45);
    box(8,102,8);
    pop();
  
    push();
    translate(0,47,45);
    box(236,8,8);
    pop();
  
    push();
    translate(0,47,-45);
    box(236,8,8);
    pop();

    push();
    translate(-115,47,0);
    box(8,8,96);
    pop();
  
    push();
    translate(115,47,0);
    box(8,8,96);
    pop();
  pop();
  
  //Legs---------------------------------------------------
  push();
    fill(253,217,34);
    
    //Right Leg
    push();
    translate(-60,215);
    cylinder(30,30);
    pop();
  
    push();
    translate(-80,222,40);
    rotateX(90);
    rotateZ(30);
    cylinder(8,40);
    pop();

    push();
    translate(-60,222,40);
    rotateX(90);
    cylinder(8,40);
    pop();
  
    push();
    translate(-40,222,40);
    rotateX(90);
    rotateZ(-30);
    cylinder(8,40);
    pop();
    
    beginShape();
    vertex(-70,230.1,0);
    vertex(-50,230.1,0);
    vertex(-30,230.1,55);
    vertex(-90,230.1,55);
    endShape();
    
    //Left Leg
    push();
    translate(60,215);
    cylinder(30,30);
    pop();
  
    push();
    translate(80,222,40);
    rotateX(90);
    rotateZ(-30);
    cylinder(8,40);
    pop();

    push();
    translate(60,222,40);
    rotateX(90);
    cylinder(8,40);
    pop();
  
    push();
    translate(40,222,40);
    rotateX(90);
    rotateZ(30);
    cylinder(8,40);
    pop();
  
    beginShape();
    vertex(70,230.1,0);
    vertex(50,230.1,0);
    vertex(30,230.1,55);
    vertex(90,230.1,55);
    endShape();
  pop();
}