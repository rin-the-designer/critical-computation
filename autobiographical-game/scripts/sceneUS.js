let drawPlayerUS;
let gravity = 0.6;
let jumpForce = -14;
let obstacles = [];
let obstacleSpacing = 120;
let scoreUS = 0;
let gameOverUS = false;
let speedMultiplier = 1;
let obstacle1;
let firstTimeUS = true;
let hasReached50US = false;
let showIntroStoryUS = true;
let storyPhaseUS = 0;
let victoryUS = false;

function loadSceneUS() {
  obstacle1 = loadImage('/assets/images/rat1.png');
  playerUSimg = loadImage('/assets/images/playerUS.png');
}

function setupUS() {
  groundLevel = height / 3 * 2
  drawPlayerUS = new playerUS();
}

function sceneUS() {
  background(255);
  
  if (showIntroStoryUS && firstTimeUS) {
    displayStoryUS();
    return;
  }

  if (victoryUS) {
    displayVictoryUS();
    return;
  }
  
  if(!gameOverUS) {
    adjustDifficultyUS();
    
    //line
    rect(0, height/3*2, width, 2);

    //playerUS
    drawPlayerUS.update();
    drawPlayerUS.show();
    
    //obstacle
    if (frameCount % obstacleSpacing === 0) {
      obstacles.push(new obstacle(speedMultiplier));
    }
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();
      
      //check collision
      if (obstacles[i].hits(drawPlayerUS)) {
        gameOverUS = true;
      }

      //Acknowledgement: GPT 4o helped me count the scores and come up with the logic to define if the 'playerUS' has passed the 'obstacle', and delete the 'obstacle' when it goes off the screen.
      if (!obstacles[i].passed && obstacles[i].x + obstacles[i].w < drawPlayerUS.x) {
        scoreUS++;
        obstacles[i].passed = true;
      }
      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }
    
    if (sceneNum === 50 && port.opened()) {
      if (mapJoystickY < 0) {
        drawPlayerUS.jump();
      }
      if (mapJoystickY > 0 && drawPlayerUS.onGround()) {
        gravity = 2;
      } else {
        gravity = 0.6;
      }
      if (mapJoystickY > 0) {
        drawPlayerUS.w = 80;
        drawPlayerUS.h = 40;
      } else {
        drawPlayerUS.w = 40;
        drawPlayerUS.h = 80;
      }
    }

    //scoreUS
    displayScoreUS();
  } else {
    //game over
    displayGameOverUS();
  }
}

function adjustDifficultyUS() {
  if (scoreUS >= 0){
    speedMultiplier = 1;
    obstacleSpacing = 120;
  }
  if (scoreUS >= 10) {
    speedMultiplier = 1.5;
    obstacleSpacing = 90;
  } 
  if (scoreUS >= 20) {
    speedMultiplier = 2;
    obstacleSpacing = 70;
  } 
  if (scoreUS >= 30) {
    speedMultiplier = 2.5;
    obstacleSpacing = 50;
  }
}

function displayScoreUS() {
  textSize(18);
  textFont(fontRegular);
  fill(0);
  textAlign(LEFT);
  text("Score: " + scoreUS, 10, 20);
}

function displayGameOverUS() {
  background(0, 200);
  textSize(32);
  textFont(fontBold);
  fill(255);
  textAlign(CENTER);
  text("Score: " + scoreUS, width / 2, height / 2 - 32);
  text("Game Over", width / 2, height / 2);
  textSize(18);
  textFont(fontRegular);
  text("'R' to Restart\n'M' to Menu", width / 2, height / 2 + 32);
}

function displayVictoryUS() {
  background(0, 200);
  textSize(32);
  textFont(fontBold);
  fill(255);
  textAlign(CENTER);
  text("No more rats for today!", width / 2, height / 2);
  textSize(18);
  textFont(fontRegular);
  text("'C' to continue\n'N' to next game\n'M' to menu", width / 2, height / 2 + 32);
}

function displayStoryUS() {
  background(0, 200);
  textFont(fontRegular);
  textSize(18);
  fill(255);
  textAlign(CENTER);
  
  switch (storyPhaseUS) {
    case 0:
      text("Now that I'm living in New York,\nOne thing I really want to avoid\nare the rats.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 1:
      text("I think I see at least one of them\nevery week.\nMake sure to jump over them.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 2:
      text("Use", width / 2, height / 2 - 32);
      textFont('Arial');
      text("⏶ ⏷", width / 2, height / 2);
      textFont(fontRegular);
      text("to jump or slide", width / 2, height / 2 + 32);
      text("'Enter' to start", width / 2, height * 3/4);
      break;
    case 3:
      showIntroStoryUS = false;
      firstTimeUS = false;
      break;
  }
}

function resetGameUS() {
  obstacles = [];
  scoreUS = 0;
  gameOverUS = false;
  speedMultiplier = 1;
  obstacleSpacing = 120;
  drawPlayerUS.reset();
  storyPhaseUS = 0;
  showIntroStoryUS = false;
  victoryUS = false;
}

class playerUS {
  constructor() {
    this.x = 50;
    this.y = groundLevel;
    this.w = 40;
    this.h = 80;
    this.vy = 0;
  }
  
  //velocity y
  jump() {
    this.vy = jumpForce;
  }
  
  //check if 'playerUS' is on ground level
  onGround() {
    return this.y >= groundLevel;
  }
  
  update() {
    this.y += this.vy;
    this.vy += gravity;
    
    if (this.y > groundLevel) {
      this.y = groundLevel;
      this.vy = 0;
    }
  }
  
  show() {
    image(playerUSimg, this.x, this.y - this.h, this.w, this.h);
  }

  reset() {
    this.y = groundLevel;
    this.vy = 0;
  }
}

class obstacle {
  constructor(speedMultiplier) {
    this.x = width;
    
    if (scoreUS >= 20) {
      this.y = groundLevel - random([0, 40]);
    } else {
      this.y = groundLevel;
    }
    
    this.w = 60;
    this.h = 20;
    this.speed = 5 * speedMultiplier;
    this.passed = false; //165 | acknowledgement: check Line 62
  }
  
  update() {
    this.x -= this.speed;
  }
  
  //173~175 | acknowledgement: check Line 62
  offscreen() {
    return this.x < -this.w;
  }
  
  //check if playerUS hits the obstacle
  hits(drawPlayerUS) {
    return(
      drawPlayerUS.x <= this.x + this.w - 10 &&
      drawPlayerUS.x + drawPlayerUS.w >= this.x + 10 &&
      drawPlayerUS.y <= this.y &&
      drawPlayerUS.y + drawPlayerUS.h >= this.y - this.h
    );
  }
  
  show() {
    image(obstacle1, this.x, this.y - this.h, this.w, this.h);
  }
}