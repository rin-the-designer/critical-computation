//Keyboards
function keyPressed() {
  if (key === 'c' || key === 'C') {
    connectBtnClick();
  }

  if (key === 'm' || key === 'M'){
    sceneNum = 0;
    resetGameUK();
    resetGameZA();
    resetGameKR();
    resetGameUS();
  }

  if (sceneNum === 10){
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
        sceneNum = 60;
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
  if (sceneNum === 0 && mouseY > height * 2 / 3 && mouseY < height * 7 / 8) {
    if (mouseX > width/10*0 && mouseX < width/10*2){
      sceneNum = 1;
    }
    if (mouseX > width/10*2 && mouseX < width/10*4){
      sceneNum = 20;
    }
    if (mouseX > width/10*4 && mouseX < width/10*6){
      sceneNum = 30;
    }
    // if (mouseX > width/10*6 && mouseX < width/10*8){
    //   sceneNum = 40;
    // }
    if (mouseX > width/10*8 && mouseX < width/10*10){
      sceneNum = 50;
    }
  }
  if (sceneNum === 1){
    sceneNum = 10;
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