// USE P5JS WEB EDITOR.

//adjust the following as needed.
let colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00"];
let canvasWidth = 300;
let canvasHeight = 200;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  strokeWeight(10);
}

function draw() {
  for (let i = 0; i < (width * height) / 100000; i++) {
    // draw 100 lines per 10000 pixels
    let x1 = random(width);
    let y1 = random(height);
    let x2 = x1 + random(-50, 50);
    let y2 = y1 + random(-50, 50);
    let c = color(random(colors)); // choose a random color from the colors array
    stroke(c);
    noFill(); // disable fill
    curve(
      x1,
      y1,
      random(width),
      random(height),
      random(width),
      random(height),
      x2,
      y2
    );
  }
}
