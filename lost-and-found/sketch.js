let body;
let triangularPlane;
let pattern;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  blendMode(BLEND);
  
  //define custom shape - triangularPlane (triangle used instead, see line88)
  //triangularPlane = new p5.Geometry();
    //let v0 = createVector(0, 80, 0);
    //let v1 = createVector(0, 70, 0);
    //let v2 = createVector(5, 80, 0);
    //triangularPlane.vertices.push(v0, v1, v2);
  
  //define custom texture - pattern
  pattern = createGraphics(600, 600);
    pattern.background(60);
    pattern.fill(255,140);
    pattern.noStroke();
    let plaidVerticalWidth = ['2', '4', '6'];
    let plaidHorizontalWidth = ['5', '15', '25'];
    push();
    for(let plaidVertical = 0; plaidVertical < 600; plaidVertical += random(15,20)){
      pattern.rect(plaidVertical, 0, random(plaidVerticalWidth), 600);
    }
    pop();
    for(let plaidHorizontal = 0; plaidHorizontal < 600; plaidHorizontal += random(40,80)){
      pattern.rect(0, plaidHorizontal, 600, random(plaidHorizontalWidth));
    }
}

function draw() {
  background(240);
  lights();
  noStroke();
  orbitControl();
  
  //support rods
  push();
  stroke(0);
  strokeWeight(2);
  line(0,-108,0,0,-8,121);
  line(0,-108,0,0,-8,-121);
  line(0,-108,0,120,-8,0);
  line(0,-108,0,-120,-8,0);
  line(0,-108,0,85,-8,85);
  line(0,-108,0,-85,-8,85);
  line(0,-108,0,85,-8,-85);
  line(0,-108,0,-85,-8,-85);
  pop();
  
  //cone, black
  push();
  rotateX(180);
  texture(pattern);
  translate(0,60);
  cone(120,100,9,1,false);
  pop();
  
  //rod, silver
  push();
  fill(235);
  cylinder(2,240);
  pop();
  
  //handle, straight, black
  push();
  fill(60);
  translate(0, 110, 0);
  cylinder(5, 40);
  pop();
  
  //button, oval, black, gray outline
  push();
  fill(100);
  translate(0, 104, 4);
  ellipsoid(3.2, 6.4, 1.75);
  pop();
  
  push();
  fill(60);
  translate(0, 104, 4);
  ellipsoid(3, 6, 2);
  pop();
  
  //notch, triangular
  push();
  fill(235);
  triangle(0, 80, 0, 70, 5, 80);
  //model(triangularPlane);
  pop();  
}