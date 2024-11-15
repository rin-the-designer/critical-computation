let drawPlayerKR;
let particles = [];
let particleSpeed = 1.5;
let maxFails = 5;
let failCount = 0;
let scoreKR = 0;
let gameOverKR = false;
let particleSpawnRate = 60;
let blowing = false;

function loadsceneKR() {
  heartImg = loadImage('/assets/images/heart.png');
}

function setupKR() {
  drawPlayerKR = new playerKR();
}

function sceneKR() {
  background(200);

  if (!gameOverKR) {
    if (frameCount % particleSpawnRate === 0) {
      particles.push(new Particle());
    }

    adjustDifficultyKR();

    drawPlayerKR.update();
    drawPlayerKR.show();

    for (let i = particles.length - 1; i >= 0; i--) {
      if (blowing && drawPlayerKR.isUnder(particles[i])) {
        particles[i].blowAway();
      }

      particles[i].update();
      particles[i].show();

      if (particles[i].offscreen()) {
        if (particles[i].blown) {
          scoreKR++;
        } else {
          failCount++;
        }
        particles.splice(i, 1);
      }
    }

    if (failCount >= maxFails) {
      gameOverKR = true;
    }

    displayScoreKR();
    displayLivesKR();
  } else {
    displayGameOverKR();
  }
}

function adjustDifficultyKR() {
  if (scoreKR >= 10) {
    particleSpeed = 2.0; 
    particleSpawnRate = 50;
  }
  if (scoreKR >= 20) {
    particleSpeed = 2.5;
    particleSpawnRate = 40;
  }
  if (scoreKR >= 30) {
    particleSpeed = 3.0;
    particleSpawnRate = 30;
  }
}

function displayScoreKR() {
  textSize(18);
  textFont(fontRegular);
  fill(0);
  textAlign(LEFT);
  text("Score: " + scoreKR, 10, 20);
}

function displayLivesKR() {
  for (let i = 0; i < maxFails - failCount; i++) {
    image(heartImg, width - (i + 1) * 30, 10, 20, 20);
  }
}

function displayGameOverKR() {
  background(0, 200);
  textSize(32);
  textFont(fontBold);
  fill(255);
  textAlign(CENTER);
  text("Score: " + scoreKR, width / 2, height / 2 - 32);
  text("Game Over", width / 2, height / 2);
  textSize(18);
  textFont(fontRegular);
  text("'R' to Restart\n'M' to Menu", width / 2, height / 2 + 32);
}

function resetGameKR() {
  particles = [];
  scoreKR = 0;
  failCount = 0;
  gameOverKR = false;
  maxFails = 5;
  blowing = false;
}

class playerKR {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.w = 20;
    this.h = 40;
  }

  update() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
      this.x += 5;
    }
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
    if (blowing) {
      fill(0, 255, 0, 150);
      rect(this.x, this.y - 20, this.w, 20);
    }
  }

  isUnder(particle) {
    return particle.x > this.x && particle.x < this.x + this.w;
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.r = random(5, 15);
    this.speed = particleSpeed;
    this.blown = false;
  }

  update() {
    if (!this.blown) {
      this.y += this.speed;
    } else {
      this.y -= this.speed * 2;
    }
  }

  blowAway() {
    this.blown = true;
  }

  offscreen() {
    return this.y < -this.r || this.y > height + this.r;
  }

  show() {
    fill(this.blown ? 0 : 150, 150, 150, 200);
    ellipse(this.x, this.y, this.r * 2);
  }
}