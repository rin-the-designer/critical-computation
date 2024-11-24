let patternRectW = 40;
let patternRectH = 20;
let mapMouseX = 0;
let mapMouseY = 0;
let moveDirection = 1;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  
  //creating pattern for optical illustion (horizontal)
  patternHorizontal = createGraphics(width,height);
  patternHorizontal.background(255);
  patternHorizontal.fill(0);
  
  //pattern for odd numbered rows
  for (let i = 0; i <= width; i += patternRectW*2){
    for (let j = 0; j <= height; j += patternRectH*2){
      patternHorizontal.rect(i,j,patternRectW,patternRectH);
    }
  }
  
  //pattern for even numbered rows
  for (let i = patternRectW; i <= width; i += patternRectW*2){
    for (let j = patternRectH; j <= height; j += patternRectH*2){
      patternHorizontal.rect(i,j,patternRectW,patternRectH);
    }
  }
  
  //creating pattern for optical illustion (vertical)
  patternVertical = createGraphics(width/2,height/2);
  patternVertical.image(patternHorizontal,0,0);
}

function draw() {
  background(0);
  scale(0.6);
  
  //change cursor to 'grab'
  cursor('grab');
  
  //setting movement when not dragged
  if (moveDirection === 1){
    mapMouseX -= 5;
    mapMouseY -= 5;
  } else {
    mapMouseX += 5;
    mapMouseY += 5;
  }
  
  //changing move direction once it hits corners
  if (mapMouseX <= -width/2){
    moveDirection = -1;
  }
  if (mapMouseX >= width/2){
    moveDirection = 1;
  }
  
  //drawing the horizontal pattern
  push();
  translate(mapMouseX, mapMouseY);
  image(patternHorizontal,-width/2,-height/2);
  
  //drawing the vertical pattern
  push();
  texture(patternVertical);
  rotate(90);
  circle(0, 0, width/2);
  pop();

  pop();
}

//setting movement when dragged
function mouseDragged() {
  mapMouseX = map(constrain(mouseX,0,width),0,width,-width/2,width/2);
  mapMouseY = map(constrain(mouseY,0,width),0,height,-height/2,height/2); 
}

//reset pattern position after mouse release
function mouseReleased() {
  mapMouseX = 0;
  mapMouseY = 0;
  moveDirection = 1;
}