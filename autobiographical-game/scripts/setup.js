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

// Helper function to detect Safari and mobile devices
function isArduinoCompatible() {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return !isSafari && !isMobile;
}

// Load webserial library dynamically if browser is compatible
function loadWebSerial() {
  if (isArduinoCompatible()) {
    const script = document.createElement('script');
    script.src = './libs/p5.webserial.js';
    script.onload = () => {
      setupArduino();
    };
    document.head.appendChild(script);
  }
}

function setupArduino() {
  if (!isArduinoCompatible()) return;
  
  port = createSerial();
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }
}

function connectBtnClick() {
  if (!isArduinoCompatible()) return;
  
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

// Call loadWebSerial when the script loads
loadWebSerial();