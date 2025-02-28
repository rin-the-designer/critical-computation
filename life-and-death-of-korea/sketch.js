let currentDiameter;
let initialDiameter;
let currentIndex = 0;
let isDecreasing = true;
let lastUpdateTime = 0;
const updateInterval = 1000;

let targetDiameter;
let animationProgress = 1;
let progressX = 0;
let startTime;
let isProgressBarVisible = true;
let lastMouseMoveTime = 0;
let initialDisplayEndTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initialDiameter = windowWidth * 0.1;
  currentDiameter = initialDiameter;
  targetDiameter = currentDiameter;

  // find max diameter
  maxInfo = runAnalysis();
  startTime = millis();
  // progress bar display time (hide after 5 seconds)
  initialDisplayEndTime = millis() + 5000;
}

function draw() {
  background(0);

  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;

  // update progress bar - modified to use currentIndex directly
  let progressX = map(
    currentIndex,
    0,
    deathBirthData.length - 1,
    0,
    windowWidth
  );

  // update animation progress
  if (animationProgress < 1) {
    animationProgress += 0.03;
    currentDiameter = lerp(currentDiameter, targetDiameter, animationProgress);
  }

  // check if progress bar is visible
  if (millis() < initialDisplayEndTime) {
    isProgressBarVisible = true;
  } else if (millis() - lastMouseMoveTime > 3000) {
    // hide progress bar
    isProgressBarVisible = false;
  }

  if (millis() - lastUpdateTime >= updateInterval && animationProgress >= 1) {
    if (currentIndex < deathBirthData.length) {
      if (isDecreasing) {
        targetDiameter =
          currentDiameter -
          (deathBirthData[currentIndex].deaths / 10000) * (windowWidth * 0.001);
      } else {
        targetDiameter =
          currentDiameter +
          (deathBirthData[currentIndex].births / 10000) * (windowWidth * 0.001);
        currentIndex++;
      }
      isDecreasing = !isDecreasing;
      lastUpdateTime = millis();
      animationProgress = 0;
    } else {
      currentIndex = 0;
      currentDiameter = initialDiameter;
      targetDiameter = initialDiameter;
    }
  }

  // draw circle
  fill(255);
  noStroke();
  circle(centerX, centerY, currentDiameter);

  // draw progress bar when visible
  if (isProgressBarVisible) {
    stroke(255, 136, 0);
    strokeWeight(16);
    line(progressX, 0, progressX, windowHeight);
    noStroke();
  }

  // display current year and month
  if (currentIndex < deathBirthData.length) {
    const data = deathBirthData[currentIndex];
    fill(255);
    textSize(32);
    textAlign(CENTER, BOTTOM);
    text(`${data.year}.${data.month}`, centerX, windowHeight - 32);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initialDiameter = windowWidth * 0.3;
}

function mouseMoved() {
  isProgressBarVisible = true;
  lastMouseMoveTime = millis();
}
