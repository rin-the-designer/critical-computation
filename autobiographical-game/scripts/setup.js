let sceneNum = 0;
let groundLevel;
let fontRegular;
let fontBold;
let fontUTF;
let port;
let connectBtn;
let btnContainer;

let joystickXYZ;
let joystickX;
let joystickY;
let joystickZ;
let mapJoystickX;
let mapJoystickY;

function setupArduino(){
  port = createSerial();

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }

  // btnContainer = createDiv();
  // btnContainer.id('btnContainer');
  // connectBtn = createButton('Connect to Arduino');
  // connectBtn.parent(btnContainer);
  // connectBtn.id('connectBtn');
  // connectBtn.mousePressed(connectBtnClick);
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}