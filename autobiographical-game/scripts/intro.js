let textSizeIntro = 0;
let rinSizeW = 1;
let rinSizeH = 2;
let menuItems = [
  { xMultiplier: 1, flag: '🇬🇧', countryCode: 'UK', state: 'enabled' },
  { xMultiplier: 3, flag: '🇿🇦', countryCode: 'ZA', state: 'enabled' },
  { xMultiplier: 5, flag: '🇰🇷', countryCode: 'KR', state: 'enabled' },
  //{ xMultiplier: 7, flag: '🇫🇷', countryCode: 'FR', state: 'disabled' },
  { xMultiplier: 7, flag: '🇺🇸', countryCode: 'US', state: 'enabled' }
];
let columns = 8;
let firstTimeIntro = true;
let firstTimeOutro = true;
let showIntro = true;
let showOutro = false;
let storyPhaseIntro = 0;
let storyPhaseOutro = 0;

function loadSceneIntro() {
  rin = loadImage('./assets/images/rin.png');
}

function intro() {
  background(0);

  if (showIntro && firstTimeIntro) {
    displayStoryIntro();
    return;
  }

  if (showOutro && firstTimeOutro && !firstTimeIntro) {
    displayStoryOutro();
    return;
  }

  image(rin, width / 2 - rinSizeW / 2, height / 4 - rinSizeH / 2, rinSizeW, rinSizeH);
  if (rinSizeW < 40 && rinSizeH < 80) {
    rinSizeW += 0.5;
    rinSizeH += 1;
  } else {
    rinSizeW = 40;
    rinSizeH = 80;
  }

  textAlign(CENTER);
  textSize(textSizeIntro);
  textFont(fontBold);
  fill(255);
  text("Adventure of Rin", width/2, height/2);
  
  if (textSizeIntro < 36) {
    textSizeIntro += 0.5;
  } else {
    textSizeIntro = 36;
    for (let item of menuItems) {
      if (item.state === 'enabled' && mouseOverMenuItem(item)) {
        item.state = 'hovered';
      } else if (item.state === 'hovered' && !mouseOverMenuItem(item)) {
        item.state = 'enabled'; // Reset to enabled if no longer hovered
      }
      menuItem(item.xMultiplier, item.flag, item.countryCode, item.state);
    }
  }
}

function mouseOverMenuItem(item) {
  let x = width / columns * item.xMultiplier;
  let y = height / 4 * 3;
  let itemWidth = 50;
  let itemHeight = 50;

  return mouseX > x - itemWidth / 2 && mouseX < x + itemWidth / 2 && mouseY > y - itemHeight / 2 && mouseY < y + itemHeight / 2;
}

function menuItem(xMultiplier, flag, countryCode, state) {
  textAlign(CENTER);
  textSize(24);
  textFont('Arial');
  textStyle(BOLD);
  
  if (state === 'disabled') {
    fill(100);
    text(flag + '\n' + countryCode, width / columns * xMultiplier, height / 4 * 3);
  } else if (state === 'hovered') {
    fill('#D1975D');
    text(flag + '\n' + countryCode + '\n▲', width / columns * xMultiplier, height / 4 * 3);
  } else {
    fill(255);
    text(flag + '\n' + countryCode, width / columns * xMultiplier, height / 4 * 3);
  }
}

function displayStoryIntro() {
  background(0, 200);
  textFont(fontRegular);
  textSize(18);
  fill(255);
  textAlign(CENTER);
  
  switch (storyPhaseIntro) {
    case 0:
      text("Rin lived in a few countries.\nAll of them had something he wanted to avoid.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 1:
      text("Make sure Rin avoids everything\nand keep him safe.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 2:
      text("Reach a score of 50\non every game to win.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 3:
      showIntro = false;
      firstTimeIntro = false;
      break;
  }
}

function displayStoryOutro() {
  background(0, 200);
  textFont(fontRegular);
  textSize(18);
  fill(255);
  textAlign(CENTER);
  
  switch (storyPhaseOutro) {
    case 0:
      text("You have saved Rin from.\neverything he wanted to avoid.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 1:
      text("Thank you for saving Rin.\nHe is going to move on.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 2:
      text("If you want you can try saving him again\nwith a higher score.", width / 2, height / 2);
      text("'Enter' to continue", width / 2, height * 3/4);
      break;
    case 3:
      showOutro = false;
      firstTimeOutro = false;
      break;
  }
}