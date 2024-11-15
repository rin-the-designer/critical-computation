let raindrops = [];
let splashes = [];
let drawPlayerUK;
let rainSpeed = 5;
let scoreUK = 0;
let gameOverUK = false;
let rainSpacing = 20;

function setupUK() {
  groundLevel = height / 3 * 2;
  drawPlayerUK = new playerUK();
}

function loadSceneUK() {
  // Original image, Big Ben, London by Marcin Nowak, https://unsplash.com/photos/big-ben-london-iXqTqC-f6jI.
  london = loadImage('/assets/images/london.png');
}

function sceneUK() {
  background(london);

  if (!gameOverUK) {
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

function resetGameUK() {
  raindrops = [];
  splashes = [];
  scoreUK = 0;
  gameOverUK = false;
  rainSpeed = 5;
  rainSpacing = 20;
  drawPlayerUK.reset();
}

class playerUK {
  constructor() {
    this.x = width / 2;
    this.y = groundLevel - 40;
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