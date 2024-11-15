//Keyboards
function keyPressed() {
  if (key === 'm' || key === 'M'){
    sceneNum = 0;
  }

  if (sceneNum === 1){
    if (gameOverUK && key === 'r' || key === 'R') {
      resetGameUK();
    }
  }

  if (sceneNum === 2){
    if (gameOverZA && key === 'r' || key === 'R') {
      resetGameZA();
    }
  }

  if (sceneNum === 3){
    if (gameOverKR && key === 'r' || key === 'R') {
      resetGameKR();
    }
    if (keyCode === 32) {
      blowing = true;
    }
  }

  if (sceneNum === 5){
    if (keyCode === UP_ARROW && drawPlayerUS.onGround()) {
      drawPlayerUS.jump();
    }
    if (keyCode === DOWN_ARROW && !drawPlayerUS.onGround()) {
      gravity = 2;
    } else {
      gravity = 0.6;
    }
    if (keyCode === DOWN_ARROW) {
      drawPlayerUS.w = 40;
      drawPlayerUS.h = 20;
    }
    if (gameOverUS && key === 'r' || key === 'R') {
      resetGameUS();
    }
  }
}

function keyReleased() {
  if (sceneNum === 3){
    if (keyCode === 32) {
      blowing = false;
    }
  }
  if (sceneNum === 5){
    if (keyCode === DOWN_ARROW) {
      gravity = 0.6;
      drawPlayerUS.h = 40;
      drawPlayerUS.w = 20;
    }
  }
}

//Mouse
function mouseClicked() {
  if (sceneNum === 0){
    if (mouseX > width/10*0 && mouseX < width/10*2){
      sceneNum = 1;
    }
    if (mouseX > width/10*2 && mouseX < width/10*4){
      sceneNum = 2;
    }
    if (mouseX > width/10*4 && mouseX < width/10*6){
      sceneNum = 3;
    }
    // if (mouseX > width/10*6 && mouseX < width/10*8){
    //   sceneNum = 4;
    // }
    if (mouseX > width/10*8 && mouseX < width/10*10){
      sceneNum = 5;
    }
  }
}