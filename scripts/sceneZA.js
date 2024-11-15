let drawPlayerZA;
let baboons = [];
let baboonSpeed = 2;
let scoreZA = 0;
let gameOverZA = false;
let baboonSpacing = 60;

function loadSceneZA() {
  baboonImg = loadImage('/assets/images/baboon.png');
}

function setupZA() {
  drawPlayerZA = new playerZA();
}

function sceneZA() {
  background(85, 107, 47);

  if (!gameOverZA) {
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
  fill(0);
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

function resetGameZA() {
  baboons = [];
  scoreZA = 0;
  gameOverZA = false;
  baboonSpeed = 2;
  baboonSpacing = 60;
  drawPlayerZA.reset();
}

class playerZA {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.w = 30;
    this.h = 30;
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
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
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
      this.y = -40;
    } else if (edge === 'bottom') {
      this.x = random(width);
      this.y = height + 40;
    } else if (edge === 'left') {
      this.x = -40;
      this.y = random(height);
    } else if (edge === 'right') {
      this.x = width + 40;
      this.y = random(height);
    }

    this.d = 40;
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
      this.x < -this.d * 2 || this.x > width + this.d * 2 ||
      this.y < -this.d * 2 || this.y > height + this.d * 2
    );
  }

  hits(drawPlayerZA) {
    let playerZACenterX = drawPlayerZA.x + drawPlayerZA.w/2;
    let playerZACenterY = drawPlayerZA.y + drawPlayerZA.h/2;
    let playerZARadius = drawPlayerZA.h * sqrt(2) / 2;
    let distFromBaboon = dist(playerZACenterX, playerZACenterY, this.x, this.y);
    return distFromBaboon < this.d / 2 + playerZARadius;
  }

  show() {
    circle(this.x, this.y - this.d, this.d);
  }
}