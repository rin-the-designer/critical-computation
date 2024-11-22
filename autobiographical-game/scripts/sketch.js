function preload() {
  fontRegular = loadFont('./assets/fonts/Silkscreen-Regular.ttf');
  fontBold = loadFont('./assets/fonts/Silkscreen-Bold.ttf');
  loadSceneIntro();
  loadSceneUK();
  loadSceneZA();
  loadsceneKR();
  loadSceneUS();
}

function setup() {
  createCanvas(600, 400);
  noStroke();
  setupArduino();

  setupUK();
  setupZA();
  setupKR();
  setupUS();
}

function draw() {
  switch (sceneNum) {
    case 0:
      intro();
      break;
    case 1:
      introSceneUK();
      break;
    case 10:
      sceneUK();
      break;
    case 20:
      sceneZA();
      break;
    case 30:
      sceneKR();
      break;
    case 40:
      sceneFR();
      break;
    case 50:
      sceneUS();
      break;
  }
  arduinoJoystick();
  // if (!port.opened()) {
  //   connectBtn.html('Connect to Arduino');
  // } else {
  //   connectBtn.html('Disconnect');
  // }
}