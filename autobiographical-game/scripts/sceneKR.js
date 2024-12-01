let drawPlayerKR;
let particles = [];
let particleSpeed = 1.5;
let maxFails = 5;
let failCount = 0;
let scoreKR = 0;
let gameOverKR = false;
let particleSpawnRate = 60;
let blowing = false;
let firstTimeKR = true;
let hasReached50KR = false;
let showIntroStoryKR = true;
let storyPhaseKR = 0;
let victoryKR = false;
let dustOpacity = 100;

function loadsceneKR() {
  // Original image, Seoul Gwanghwamun Gate by Felix Fuchs, https://unsplash.com/photos/cars-and-people-near-building-during-day-fEyw6zOKGSo.
  seoul = loadImage('./assets/images/seoul.png');
  playerKRimg1 = loadImage('./assets/images/playerKR-1.png');
  playerKRimg2 = loadImage('./assets/images/playerKR-2.png');
  heartImg = loadImage('./assets/images/heart.png');
}

function setupKR() {
  drawPlayerKR = new playerKR();
}

function sceneKR() {
  background(seoul);
  push();
  fill(255, 120, 0, dustOpacity);
  rect(0, 0, width, height);
  pop();

  if (showIntroStoryKR && firstTimeKR) {
    displayStoryKR();
    return;
  }

  if (victoryKR) {
    displayVictoryKR();
    return;
  }

  if (!gameOverKR) {
    if (scoreKR >= 50 && !hasReached50KR) {
      victoryKR = true;
      hasReached50KR = true;
      checkGameCompletion();
      return;
    }

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
          dustOpacity -= 2.5;
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

function displayVictoryKR() {
  background(0, 200);
  textSize(32);
  textFont(fontBold);
  fill(255);
  textAlign(CENTER);
  text("That is some fresh air!", width / 2, height / 2);
  textSize(18);
  textFont(fontRegular);
  text("'C' to continue\n'N' to next game\n'M' to menu", width / 2, height / 2 + 32);
}

function displayStoryKR() {
  background(0, 200);
  textFont(fontRegular);
  textSize(18);
  fill(255);
  textAlign(CENTER);
  
  switch (storyPhaseKR) {
    case 0:
      text("When Rin got back to Seoul\nafter leaving South Africa,\nKorea started to suffer from\nmicrodust pollution.", width / 2, height * 3/8);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 1:
      text("The sky of Seoul wasn't like it was before.\nPlease help Rin get rid of the microdust.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 2:
      text("Use", width / 4, height / 2 - 32);
      textFont('Arial');
      text("⏴ ⏵", width / 4, height / 2);
      textFont(fontRegular);
      text("to move", width / 4, height / 2 + 32);
      text("Use", width * 3 / 4, height / 2 - 32);
      text("'Space'", width * 3 / 4, height / 2);
      text("to blow particles", width * 3 / 4, height / 2 + 32);
      text("'Enter' to start", width / 2, height * 3/4);
      break;
    case 3:
      showIntroStoryKR = false;
      firstTimeKR = false;
      break;
  }
}

function resetGameKR() {
  particles = [];
  scoreKR = 0;
  failCount = 0;
  gameOverKR = false;
  maxFails = 5;
  blowing = false;
  storyPhaseKR = 0;
  showIntroStoryKR = false;
  victoryKR = false;
  dustOpacity = 100;
  drawPlayerKR.x = width / 2;
}

class playerKR {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.w = 40;
    this.h = 80;
    this.x2 = 50;
  }

  update() {
    if (scoreKR < 20) {
      if (keyIsDown(LEFT_ARROW) && this.x > 0) {
        this.x -= 5;
      }
      if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
        this.x += 5;
      }
    } else if (scoreKR >= 20 && scoreKR < 40) {
      if (keyIsDown(LEFT_ARROW) && this.x > 0) {
        this.x -= 7.5;
      }
      if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
        this.x += 7.5;
      }
    } else if (scoreKR >= 40) {
      if (keyIsDown(LEFT_ARROW) && this.x > 0) {
        this.x -= 10;
      }
      if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
        this.x += 10;
      }
    }
    if (port.opened()) {
      if (mapJoystickX !== 0) {
        this.x += mapJoystickX;
      }
      if (joystickZ == 0) {
        blowing = true;
      } else if (joystickZ == 1) {
        blowing = false;
      }
    }
  }

  show() {
    if (!blowing) {
      image(playerKRimg1, this.x, this.y, this.w, this.h);
      fill(255);
      rect(this.x, this.y + 30, this.w, 20);
    } else if (blowing) {
      image(playerKRimg2, this.x, this.y, this.w, this.h);
      fill(255);
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
    fill(255, this.blown ? 255 : 120, this.blown ? 255 : 0, this.blown ? 50 : 200);
    ellipse(this.x, this.y, this.r * 2);
  }
}