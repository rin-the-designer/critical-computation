let groundLevel;
let rins = [];
let isMobile = false;

function preload() {
  rin1 = loadImage('./assets/images/rin1.png');
  rin2 = loadImage('./assets/images/rin2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  groundLevel = windowHeight - 80;
  cursor('grab');
  
  // Check if device is mobile
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Add initial Rin at the center of the screen
  rins.push({
    x: windowWidth / 2 - 20,
    y: groundLevel,
    velocity: 0,
    horizontalSpeed: 3
  });
}

function draw() {
  background(240);
  
  // Update and draw all stored rins
  for (let rin of rins) {
    // Apply gravity
    if (rin.y < groundLevel) {
      rin.velocity += 0.5;
      rin.y += rin.velocity;
    } else {
      rin.y = groundLevel;
      rin.velocity = 0;
    }

    // Move horizontally and check wall collisions
    rin.x += rin.horizontalSpeed;
    if (rin.x <= 0 || rin.x >= width - 40) {
      rin.horizontalSpeed *= -1;
    }
    
    drawRin(rin.x, rin.y, rin.horizontalSpeed);
  }

  // Draw preview Rin under mouse if mouse is in canvas and not on mobile
  if (!isMobile && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    drawRin(mouseX - 20, mouseY - 5, 3);
  }
}

function drawRin(x, y, horizontalSpeed) {
  let rinVersion = horizontalSpeed > 0 ? rin2 : rin1;
  image(rinVersion, x, y, 40, 80);
}

function mouseClicked() {
  // Only add Rin if click is within canvas
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    rins.push({ 
      x: mouseX - 20,
      y: mouseY - 5,
      velocity: 0,
      horizontalSpeed: random([-3, 3])
    });
  }
  return false;
}

function mousePressed() {
  cursor('grabbing');
}

function mouseReleased() {
  cursor('grab');
}