let face_distance;
let pupil_size;
let pupil_size_default;
let face_size;
let face_size_default;
let alert;
let face_color;

//loading alert sound
function preload() {
  soundFormats('mp3');
  alert = loadSound('alert.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  face_size_default = height/3;
  cursor(HAND);
}

function draw() {
  background(220);
  pupil_size_default = face_size_default/6;
  
  //instruction text
  textAlign(CENTER);
  textStyle(BOLD);
  text('Press ↓ or ↑',width/2,height*0.9);
  text('to change size',width/2,height*0.9+16)
  
  //interaction on arrow up/down
  if (keyIsDown(DOWN_ARROW) === true) {
    face_size_default -= 10;
    if (face_size_default <= width*0.1) {
      face_size_default = width*0.1;
    }
  }
  if (keyIsDown(UP_ARROW) === true) {
    face_size_default += 10;
    if (face_size_default >= width*1.2) {
      face_size_default = width*1.2;
    }
  }

  face_distance = constrain(dist(width/2,height/2,mouseX,mouseY), 0, sqrt(sq(width)+sq(height)));
  
  //trigger for alert
  if (face_distance <= face_size_default*0.65) {
    pupil_size = random(pupil_size_default*0.4, pupil_size_default*0.6);
    face_size = random(face_size_default*0.9, face_size_default)
    alert.play();
    face_color = '#ff3c00';
  } else {
    pupil_size = pupil_size_default;
    face_size = face_size_default;
    alert.stop();
    face_color = '#ffae00';
  }
  
  //persoanl zone
  push();
  circle(width/2,height/2,face_size_default*1.3);
  pop();
  
  //face
  push();
  fill(face_color);
  circle(width/2,height/2,face_size);
  pop();
  
  //sclera
  push();
  fill('white');
  circle(width/2-pupil_size_default,height/2,pupil_size_default*2);
  circle(width/2+pupil_size_default,height/2,pupil_size_default*2);
  pop();
  
  //pupil move | reference: https://editor.p5js.org/sam/sketches/X5XbYo1Um
  let pupil_x = map(constrain(mouseX,0,width),0,width,pupil_size_default*-0.4,pupil_size_default*0.4);
  let pupil_y = map(constrain(mouseY,0,height),0,height,pupil_size_default*-0.4,pupil_size_default*0.4);
  
  //pupil
  push();
  fill('black');
  circle(width/2-pupil_size_default+pupil_x,height/2+pupil_y,pupil_size);
  circle(width/2+pupil_size_default+pupil_x,height/2+pupil_y,pupil_size);
  pop();
}