let drawPlayerZA;
let baboons = [];
let baboonSpeed = 2;
let scoreZA = 0;
let gameOverZA = false;
let baboonSpacing = 60;
let firstTimeZA = true;
let hasReached50ZA = false;
let showIntroStoryZA = true;
let storyPhaseZA = 0;
let victoryZA = false;

function loadSceneZA() {
  capetown = loadImage('./assets/images/capetown.png');
  playerZAimg = loadImage('./assets/images/playerZA.png');
  baboonImg = loadImage('./assets/images/baboon.png');
}

function setupZA() {
  drawPlayerZA = new playerZA();
}

function sceneZA() {
  background(capetown);

  if (showIntroStoryZA && firstTimeZA) {
    displayStoryZA();
    return;
  }

  if (victoryZA) {
    displayVictoryZA();
    return;
  }

  if (!gameOverZA) {
    if (scoreZA >= 50 && !hasReached50ZA) {
      victoryZA = true;
      hasReached50ZA = true;
      checkGameCompletion();
      return;
    }

    adjustDifficultyZA();

    if (frameCount % baboonSpacing === 0) {
      baboons.push(new baboon());
    }

    drawPlayerZA.update();
    drawPlayerZA.show();

    for (let i = baboons.length - 1; i >= 0; i--) {
      baboons[i].update();
      baboons[i].show();

      if (baboons[i].hits(drawPlayerZA)) {
        gameOverZA = true;
      }

      if (baboons[i].offscreen()) {
        baboons.splice(i, 1);
        scoreZA++;
      }
    }

    displayScoreZA();
  } else {
    displayGameOverZA();
  }
}

function adjustDifficultyZA() {
  if (scoreZA >= 10) {
    baboonSpeed = 3;
    baboonSpacing = 50;
  }
  if (scoreZA >= 20) {
    baboonSpeed = 4;
    baboonSpacing = 40;
  }
  if (scoreZA >= 30) {
    baboonSpeed = 5;
    baboonSpacing = 30;
  }
}

function displayScoreZA() {
  textSize(18);
  textFont(fontRegular);
  fill(255);
  textAlign(LEFT);
  text("Score: " + scoreZA, 10, 20);
}

function displayGameOverZA() {
  background(0, 200);
  textSize(32);
  textFont(fontBold);
  fill(255);
  textAlign(CENTER);
  text("Score: " + scoreZA, width / 2, height / 2 - 32);
  text("Game Over", width / 2, height / 2);
  textSize(18);
  textFont(fontRegular);
  text("'R' to Restart\n'M' to Menu", width / 2, height / 2 + 32);
  console.log('ZA score: ', scoreZA);
}

function displayVictoryZA() {
  background(0, 200);
  textSize(32);
  textFont(fontBold);
  fill(255);
  textAlign(CENTER);
  text("Rin is safe!", width / 2, height / 2);
  textSize(18);
  textFont(fontRegular);
  text("'C' to continue\n'N' to next game\n'M' to menu", width / 2, height / 2 + 32);
}

function displayStoryZA() {
  background(0, 200);
  textFont(fontRegular);
  textSize(18);
  fill(255);
  textAlign(CENTER);
  
  switch (storyPhaseZA) {
    case 0:
      text("When Rin was traveling Cape Town,\nhe was chased by baboons.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 1:
      text("It was a life threatening experience for him.\nMake sure that he runs away from the baboons.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 2:
      text("Use", width / 2, height / 2 - 32);
      textFont('Arial');
      text("⏶ ⏴ ⏷ ⏵", width / 2, height / 2);
      textFont(fontRegular);
      text("to run away", width / 2, height / 2 + 32);
      text("'Enter' to start", width / 2, height * 3/4);
      break;
    case 3:
      showIntroStoryZA = false;
      firstTimeZA = false;
      break;
  }
}

function resetGameZA() {
  baboons = [];
  scoreZA = 0;
  gameOverZA = false;
  baboonSpeed = 2;
  baboonSpacing = 60;
  drawPlayerZA.reset();
  storyPhaseZA = 0;
  showIntroStoryZA = false;
  victoryZA = false;
  drawPlayerZA.x = width / 2;
  drawPlayerZA.y = height / 2;
}

class playerZA {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.w = 50;
    this.h = 50;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height - this.h) {
      this.y += this.speed;
    }
    if (isArduinoCompatible() && port.opened()) {
      if (mapJoystickX !== 0) {
        this.x += mapJoystickX;
      }
      if (mapJoystickY !== 0) {
        this.y += mapJoystickY;
      }
    }
  }

  show() {
    image(playerZAimg, this.x, this.y, this.w, this.h);
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
  }
}

class baboon {
  constructor() {
    const edge = random(['top', 'bottom', 'left', 'right']);
    if (edge === 'top') {
      this.x = random(width);
      this.y = -50;
    } else if (edge === 'bottom') {
      this.x = random(width);
      this.y = height + 50;
    } else if (edge === 'left') {
      this.x = -50;
      this.y = random(height);
    } else if (edge === 'right') {
      this.x = width + 50;
      this.y = random(height);
    }

    this.w = 50;
    this.h = 50;
    this.targetX = drawPlayerZA.x;
    this.targetY = drawPlayerZA.y;
    this.angle = atan2(this.targetY - this.y, this.targetX - this.x);
  }

  update() {
    this.x += baboonSpeed * cos(this.angle);
    this.y += baboonSpeed * sin(this.angle);
  }

  offscreen() {
    return (
      this.x < -this.w || this.x > width + this.w ||
      this.y < -this.h || this.y > height + this.h
    );
  }

  hits(drawPlayerZA) {
    let playerZACenterX = drawPlayerZA.x + drawPlayerZA.w/2;
    let playerZACenterY = drawPlayerZA.y + drawPlayerZA.h/2;
    let playerZARadius = drawPlayerZA.h * sqrt(2) / 2;
    let baboonCenterX = this.x + this.w/2;
    let baboonCenterY = this.y + this.h/2;
    let baboonRadius = this.w * sqrt(2) / 3;
    let distFromBaboon = dist(playerZACenterX, playerZACenterY, baboonCenterX, baboonCenterY);
    return distFromBaboon < baboonRadius + playerZARadius;
  }

  show() {
    image(baboonImg, this.x, this.y, this.w, this.h);
  }
}