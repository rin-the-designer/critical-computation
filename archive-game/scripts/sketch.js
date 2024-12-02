let groundLevel;
let rins = [];

function preload() {
  rin1 = loadImage('./assets/images/rin1.png');
  rin2 = loadImage('./assets/images/rin2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  groundLevel = windowHeight - 80;
  cursor('grab');
  
  // Add initial Rin at the center of the screen
  rins.push({
    x: windowWidth / 2 - 20,  // Center horizontally
    y: groundLevel,           // Place on ground
    velocity: 0,
    horizontalSpeed: 3        // Start moving right
  });
}

function draw() {
  background(240);
  
  // Update and draw all stored rins
  for (let rin of rins) {
    // Apply gravity if not on ground
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

  // Draw preview Rin under mouse if mouse is in canvas
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    drawRin(mouseX - 20, mouseY - 5, 3); // Using rin2 (facing right) for preview
  }
}

function drawRin(x, y, horizontalSpeed) {
  // Use rin2 when moving right, rin1 when moving left
  let rinSprite = horizontalSpeed > 0 ? rin2 : rin1;
  image(rinSprite, x, y, 40, 80);
}

function mouseClicked() {
  // Only add Rin if click is within canvas
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    rins.push({ 
      x: mouseX - 20, // Center horizontally (40/2 = 20)
      y: mouseY - 5, // Center vertically (80/2 = 40)
      velocity: 0,
      horizontalSpeed: random([-3, 3]) // Random initial direction, either -3 or 3
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