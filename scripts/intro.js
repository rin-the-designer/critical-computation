let scene0_text = 0;
let menuItems = [
  { xMultiplier: 1, flag: '🇬🇧', countryCode: 'UK', state: 'enabled' },
  { xMultiplier: 3, flag: '🇿🇦', countryCode: 'ZA', state: 'enabled' },
  { xMultiplier: 5, flag: '🇰🇷', countryCode: 'KR', state: 'enabled' },
  { xMultiplier: 7, flag: '🇫🇷', countryCode: 'FR', state: 'disabled' },
  { xMultiplier: 9, flag: '🇺🇸', countryCode: 'US', state: 'enabled' }
];

function intro() {
  background(0);
  textAlign(CENTER);

  textSize(scene0_text);
  textFont(fontBold);
  fill(255);
  text("Adventure of Rin", width/2, height/2);
  
  if (scene0_text < 36) {
    scene0_text += 0.5;
  } else {
    scene0_text = 36;
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
  let x = width / 10 * item.xMultiplier;
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
    text(flag + '\n' + countryCode, width / 10 * xMultiplier, height / 4 * 3);
  } else if (state === 'hovered') {
    fill('red');
    text(flag + '\n' + countryCode + '\n▲', width / 10 * xMultiplier, height / 4 * 3);
  } else {
    fill(255);
    text(flag + '\n' + countryCode, width / 10 * xMultiplier, height / 4 * 3);
  }
}