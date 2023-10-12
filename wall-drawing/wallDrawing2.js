// USE P5JS WEB EDITOR.

let canvasWidth = 600;
let canvasHeight = 600;
let numLines = 400;
let colors = ["#FF4136", "#0074D9", "#2ECC40", "#FFDC00"];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < numLines; i++) {
    let colorIndex = int(random(0, colors.length));
    stroke(colors[colorIndex]);
    drawLine();
  }
}

function drawLine() {
  let x1 = random(0, width);
  let y1 = random(0, height);
  let x2 = random(0, width);
  let y2 = random(0, height);

  // use a Bezier curve instead of a straight line
  let cx1 = random(0, width);
  let cy1 = random(0, height);
  let cx2 = random(0, width);
  let cy2 = random(0, height);

  // adjust curve tightness to make it more or less curved
  let tightness = random(-2, 2);
  bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
}
