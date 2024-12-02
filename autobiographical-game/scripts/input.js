//Keyboards
function keyPressed() {
  if (key === 'c' || key === 'C') {
    connectBtnClick();
  }

  if (sceneNum === 0) {
    if (key === 'Enter') {
      if (showIntro) {
        if (storyPhaseIntro === 0) {
          storyPhaseIntro = 1;
        } else if (storyPhaseIntro === 1) {
          storyPhaseIntro = 2;
        } else if (storyPhaseIntro === 2) {
          storyPhaseIntro = 3;
        }
      } else if (showOutro) {
        if (storyPhaseOutro === 0) {
          storyPhaseOutro = 1;
        } else if (storyPhaseOutro === 1) {
          storyPhaseOutro = 2;
        } else if (storyPhaseOutro === 2) {
          storyPhaseOutro = 3;
        }
      }
    }
    if (key === 'f' || key === 'F') {
      finishedGame = true;
      showOutro = true;
    }
  }

  if (sceneNum === 10){
    if (key === 'm' || key === 'M') {
      sceneNum = 0;
      resetGameUK();
    }
    if (gameOverUK && (key === 'r' || key === 'R')) {
      resetGameUK();
    }
    if (key === 'Enter') {
      if (storyPhaseUK === 0) {
        storyPhaseUK = 1;
      } else if (storyPhaseUK === 1) {
        storyPhaseUK = 2;
      } else if (storyPhaseUK === 2) {
        storyPhaseUK = 3;
      }
    }
    if (victoryUK){
      if (key === 'c' || key === 'C') {
        victoryUK = false;
      }
      if (key === 'n' || key === 'N') {
        sceneNum = 20;
        resetGameUK();
      }
    }
  }

  if (sceneNum === 20){
    if (key === 'm' || key === 'M') {
      sceneNum = 0;
      resetGameZA();
    }
    if (gameOverZA && (key === 'r' || key === 'R')) {
      resetGameZA();
    }
    if (key === 'Enter') {
      if (storyPhaseZA === 0) {
        storyPhaseZA = 1;
      } else if (storyPhaseZA === 1) {
        storyPhaseZA = 2;
      } else if (storyPhaseZA === 2) {
        storyPhaseZA = 3;
      }
    }
    if (victoryZA){
      if (key === 'c' || key === 'C') {
        victoryZA = false;
      }
      if (key === 'n' || key === 'N') {
        sceneNum = 30;
        resetGameZA();
      }
    }
  }

  if (sceneNum === 30){
    if (key === 'm' || key === 'M') {
      sceneNum = 0;
      resetGameKR();
    }
    if (gameOverKR && (key === 'r' || key === 'R')) {
      resetGameKR();
    }
    if (keyCode === 32) {
      blowing = true;
    }
    if (key === 'Enter') {
      if (storyPhaseKR === 0) {
        storyPhaseKR = 1;
      } else if (storyPhaseKR === 1) {
        storyPhaseKR = 2;
      } else if (storyPhaseKR === 2) {
        storyPhaseKR = 3;
      }
    }
    if (victoryKR){
      if (key === 'c' || key === 'C') {
        victoryKR = false;
      }
      if (key === 'n' || key === 'N') {
        sceneNum = 50;
        resetGameKR();
      }
    }
  }

  if (sceneNum === 50){
    if (key === 'm' || key === 'M') {
      sceneNum = 0;
      resetGameUS();
    }
    if (keyCode === UP_ARROW && drawPlayerUS.onGround()) {
      drawPlayerUS.jump();
    }
    if (keyCode === DOWN_ARROW && !drawPlayerUS.onGround()) {
      gravity = 2;
    } else {
      gravity = 0.6;
    }
    if (keyCode === DOWN_ARROW) {
      drawPlayerUS.w = 80;
      drawPlayerUS.h = 40;
    }
    if (gameOverUS && (key === 'r' || key === 'R')) {
      resetGameUS();
    }
    if (key === 'Enter') {
      if (storyPhaseUS === 0) {
        storyPhaseUS = 1;
      } else if (storyPhaseUS === 1) {
        storyPhaseUS = 2;
      } else if (storyPhaseUS === 2) {
        storyPhaseUS = 3;
      }
    }
    if (victoryUS){
      if (key === 'c' || key === 'C') {
        victoryUS = false;
      }
      if (key === 'n' || key === 'N') {
        sceneNum = 10;
        resetGameUS();
      }
    }
  }
}

function keyReleased() {
  if (sceneNum === 30){
    if (keyCode === 32) {
      blowing = false;
    }
  }
  if (sceneNum === 50){
    if (keyCode === DOWN_ARROW) {
      gravity = 0.6;
      drawPlayerUS.h = 80;
      drawPlayerUS.w = 40;
    }
  }
}

//Mouse
function mouseClicked() {
  if (sceneNum === 0 && !showIntro && !showOutro && mouseY > height * 2 / 3 && mouseY < height * 7 / 8) {
    if (mouseX > width/8*0 && mouseX < width/8*2){
      sceneNum = 10;
    }
    if (mouseX > width/8*2 && mouseX < width/8*4){
      sceneNum = 20;
    }
    if (mouseX > width/8*4 && mouseX < width/8*6){
      sceneNum = 30;
    }
    // if (mouseX > width/10*6 && mouseX < width/10*8){
    //   sceneNum = 40;
    // }
    if (mouseX > width/8*6 && mouseX < width/8*8){
      sceneNum = 50;
    }
  }
}

function arduinoJoystick(){
  if (!isArduinoCompatible() || !port || !port.opened()) return;

  let str = port.readUntil("\n");
  if (str.length > 0) {
    joystickXYZ = split(str,",");
    joystickX = float(joystickXYZ[0]);
    joystickY = float(joystickXYZ[1]);
    joystickZ = joystickXYZ[2];
  }
  
  if (joystickX < 10 && joystickX > -10) {
    mapJoystickX = 0;
  }
  
  if (joystickX < 20 && joystickX >= 10){
    mapJoystickX = 2;
  }
  
  if (joystickX > -20 && joystickX <= -10){
    mapJoystickX = -2;
  }
  
  if (joystickX < 30 && joystickX >= 20){
    mapJoystickX = 3;
  }
  
  if (joystickX > -30 && joystickX <= -20){
    mapJoystickX = -3;
  }
  
  if (joystickX < 40 && joystickX >= 30){
    mapJoystickX = 4;
  }
  
  if (joystickX > -40 && joystickX <= -30){
    mapJoystickX = -4;
  }
  
  if (joystickX <= 50 && joystickX >= 40){
    mapJoystickX = 5;
  }
  
  if (joystickX >= -50 && joystickX <= -40){
    mapJoystickX = -5;
  }

  if (joystickY < 10 && joystickY > -10) {
    mapJoystickY = 0;
  }
  
  if (joystickY < 20 && joystickY >= 10){
    mapJoystickY = 2;
  }
  
  if (joystickY > -20 && joystickY <= -10){
    mapJoystickY = -2;
  }
  
  if (joystickY < 30 && joystickY >= 20){
    mapJoystickY = 3;
  }
  
  if (joystickY > -30 && joystickY <= -20){
    mapJoystickY = -3;
  }
  
  if (joystickY < 40 && joystickY >= 30){
    mapJoystickY = 4;
  }
  
  if (joystickY > -40 && joystickY <= -30){
    mapJoystickY = -4;
  }
  
  if (joystickY <= 50 && joystickY >= 40){
    mapJoystickY = 5;
  }
  
  if (joystickY >= -50 && joystickY <= -40){
    mapJoystickY = -5;
  }
}