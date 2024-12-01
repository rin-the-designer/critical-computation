let raindrops = [];
let splashes = [];
let drawPlayerUK;
let rainSpeed = 5;
let scoreUK = 0;
let gameOverUK = false;
let rainSpacing = 20;
let firstTimeUK = true;
let hasReached50UK = false;
let showIntroStoryUK = true;
let storyPhaseUK = 0;
let victoryUK = false;

function setupUK() {
  groundLevel = height / 3 * 2;
  drawPlayerUK = new playerUK();
}

function loadSceneUK() {
  // Original image, Big Ben, London by Marcin Nowak, https://unsplash.com/photos/big-ben-london-iXqTqC-f6jI.
  london = loadImage('./assets/images/london.png');
  playerUKimg = loadImage('./assets/images/playerUK.png');
}

function sceneUK() {
  background(london);

  if (showIntroStoryUK && firstTimeUK) {
    displayStoryUK();
    return;
  }

  if (victoryUK) {
    displayVictoryUK();
    return;
  }

  if (!gameOverUK) {
    if (scoreUK >= 50 && !hasReached50UK) {
      victoryUK = true;
      hasReached50UK = true;
      checkGameCompletion();
      return;
    }

    adjustDifficultyUK();

    if (frameCount % rainSpacing === 0) {
      raindrops.push(new raindrop());
    }

    drawPlayerUK.update();
    drawPlayerUK.show();

    for (let i = raindrops.length - 1; i >= 0; i--) {
      raindrops[i].update();
      raindrops[i].show();

      if (raindrops[i].hits(drawPlayerUK)) {
        gameOverUK = true;
      }

      if (raindrops[i].offscreen()) {
        splashes.push(new splash(raindrops[i].x, height));
        raindrops.splice(i, 1);
        scoreUK++;
      }
    }

    for (let i = splashes.length - 1; i >= 0; i--) {
      splashes[i].update();
      splashes[i].show();

      if (splashes[i].finished()) {
        splashes.splice(i, 1);
      }
    }

    displayScoreUK();
  } else {
    displayGameOverUK();
  }
}

function adjustDifficultyUK() {
  if (scoreUK >= 10) {
    rainSpeed = 6;
    rainSpacing = 18;
  }
  if (scoreUK >= 20) {
    rainSpeed = 7;
    rainSpacing = 16;
  }
  if (scoreUK >= 30) {
    rainSpeed = 8;
    rainSpacing = 14;
  }
  if (scoreUK >= 40) {
    rainSpeed = 9;
    rainSpacing = 12;
  }
  if (scoreUK >= 50) {
    rainSpeed = 10;
    rainSpacing = 10;
  }
}

function displayScoreUK() {
  textSize(18);
  textFont(fontRegular);
  fill(0);
  textAlign(LEFT);
  text("Score: " + scoreUK, 10, 20);
}

function displayGameOverUK() {
  background(0, 200);
  textSize(32);
  textFont(fontBold);
  fill(255);
  textAlign(CENTER);
  text("Score: " + scoreUK, width / 2, height / 2 - 32);
  text("Game Over", width / 2, height / 2);
  textSize(18);
  textFont(fontRegular);
  text("'R' to Restart\n'M' to Menu", width / 2, height / 2 + 32);
}

function displayVictoryUK() {
  background(0, 200);
  textSize(32);
  textFont(fontBold);
  fill(255);
  textAlign(CENTER);
  text("Rin didn't get wet!", width / 2, height / 2);
  textSize(18);
  textFont(fontRegular);
  text("'C' to continue\n'N' to next game\n'M' to menu", width / 2, height / 2 + 32);
}

function displayStoryUK() {
  background(0, 200);
  textFont(fontRegular);
  textSize(18);
  fill(255);
  textAlign(CENTER);
  
  switch (storyPhaseUK) {
    case 0:
      text("When Rin was living in London,\nhe didn't really like the weather.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 1:
      text("It was raining a lot of the time.\nMake sure that Rin doesn't get wet by the rain.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 2:
      text("Use", width / 2, height / 2 - 32);
      textFont('Arial');
      text("⏴ ⏵", width / 2, height / 2);
      textFont(fontRegular);
      text("to avoid the rain", width / 2, height / 2 + 32);
      text("'Enter' to start", width / 2, height * 3/4);
      break;
    case 3:
      showIntroStoryUK = false;
      firstTimeUK = false;
      break;
  }
}

function resetGameUK() {
  raindrops = [];
  splashes = [];
  scoreUK = 0;
  gameOverUK = false;
  rainSpeed = 5;
  rainSpacing = 20;
  drawPlayerUK.reset();
  storyPhaseUK = 0;
  showIntroStoryUK = false;
  victoryUK = false;
  drawPlayerUK.x = width / 2;
}

class playerUK {
  constructor() {
    this.x = width / 2;
    this.y = groundLevel - 40;
    this.w = 40;
    this.h = 80;
  }

  update() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
      this.x += 5;
    }
    if (port.opened()) {
      if (mapJoystickX !== 0) {
        this.x += mapJoystickX;
      }
    }
  }

  show() {
    image(playerUKimg, this.x, this.y, this.w, this.h);
  }

  reset() {
    this.x = width / 2;
  }
}

class raindrop {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.w = 10;
    this.h = 20;
  }

  update() {
    this.y += rainSpeed;
  }

  offscreen() {
    return this.y > height;
  }

  hits(drawPlayerUK) {
    return (
      drawPlayerUK.x < this.x + this.w &&
      drawPlayerUK.x + drawPlayerUK.w > this.x &&
      drawPlayerUK.y < this.y + this.h &&
      drawPlayerUK.y + drawPlayerUK.h > this.y
    );
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}

class splash {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.lifespan = 50;

    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: random(-2, 2),
        vy: random(-2, -5),
        alpha: 255
      });
    }
  }

  update() {
    this.lifespan--;

    for (let particle of this.particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.alpha -= 5;
    }
  }

  show() {
    noStroke();
    fill(255, 100);

    for (let particle of this.particles) {
      fill(255, particle.alpha);
      ellipse(particle.x, particle.y, 5, 5);
    }
  }

  finished() {
    return this.lifespan <= 0;
  }
}