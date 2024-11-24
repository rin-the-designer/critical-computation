let dataScreenTime = [
  ['Column1', 'Column2', 'Column3', 'Column4', 'Column5', 'Column6', 'Column7'], //Data Header
  [416, 50, 84, 120, 10, 10, 10], //Oct 11
  [265, 15, 60, 78, 65, 1, 10], //Oct 12
  [440, 30, 168, 94, 1, 57, 33], //Oct 13
  [211, 3, 60, 114, 3, 3, 31], //Oct 14
  [214, 3, 66, 60, 5, 1, 35], //Oct 15
  [363, 30, 60, 76, 67, 6, 57], //Oct 16
  [126, 1, 89, 60, 6, 0, 25] //Oct 17
];

let numDays = dataScreenTime.length - 1;
let numCategories = dataScreenTime[0].length;
let sumRowN = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(6);
  
  //Push sum of each row to sumRowN
  for (let i = 1; i <= numDays; i++) {
    sumRowN.push(sumArray(dataScreenTime[i]));
  }
}

function draw() {
  background(40);
  
  let barWidth = width / numDays;
  
  let colorMapping = {
    'Column1': color('#084594'),
    'Column2': color('#2171B5'),
    'Column3': color('#4292C6'),
    'Column4': color('#6BAED6'),
    'Column5': color('#9ECAE1'),
    'Column6': color('#C6DBEF'),
    'Column7': color('#DEEBF7')
  };

  for (let i = 1; i <= numDays; i++){
    let cumulativeHeight = 0;
    let total = sumRowN[i - 1];
    
    for (let j = 0; j < numCategories; j++){
      let rectHeight = dataScreenTime[i][j];
      let category = dataScreenTime[0][j];
      let normalizedHeight = map(rectHeight, 0, total, 0, height);
      
      fill(colorMapping[category]);
      rect((i - 1) * barWidth, height - cumulativeHeight - normalizedHeight, barWidth, normalizedHeight);
      cumulativeHeight += normalizedHeight;
    }
  }
  
  //Shuffle column data
  for (let i = 1; i <= numDays; i++) {
    dataScreenTime[i] = shuffle(dataScreenTime[i]);
  }
}

//Acknowledgement: GPT 4o, Make a function called sumArray to sum up each row in the dataScreenTime array.
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}