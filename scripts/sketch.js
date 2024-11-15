function preload() {
  fontRegular = loadFont('/assets/fonts/Silkscreen-Regular.ttf');
  fontBold = loadFont('/assets/fonts/Silkscreen-Bold.ttf');
  loadSceneUK();
  loadsceneKR();
  loadSceneUS();
}

function setup() {
  createCanvas(600, 400);
  noStroke();

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
      sceneUK();
      break;
    case 2:
      sceneZA();
      break;
    case 3:
      sceneKR();
      break;
    case 4:
      sceneFR();
      break;
    case 5:
      sceneUS();
      break;
  }
}