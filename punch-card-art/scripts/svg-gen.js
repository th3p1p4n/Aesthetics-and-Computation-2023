//NOISE LIBRARY: https://github.com/josephg/noisejs

"use strict";

window.onload = generate;
document.querySelector("#generate").onclick = generate;

//image parameters
let width;
let height;
let stringColor;
let stringWidth;
let bgColor;
let pointColor;
let zoom;
let points;
let outString = "";

// helpers
class point {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    addToString(
      `<circle cx="${this.x}" cy="${this.y}" r="2.5" fill="${pointColor}"/>`
    );
    console.log(`Drew a point: x=${this.x} y=${this.y}`);
  }
}
const addToString = (newTxt) => {
  outString = outString + newTxt + "\n";
};
const drawString = (point1, point2) => {
  addToString(
    `<line x1="${point1.x}" y1="${point1.y}" x2="${point2.x}" y2="${point2.y}" stroke="${stringColor}" stroke-width="${stringWidth}"/>`
  );
};

function generate() {
  // setup
  width = document.querySelector("#width").value;
  height = document.querySelector("#height").value;
  stringColor = document.querySelector("#string-color").value;
  stringWidth = document.querySelector("#string-width").value;
  bgColor = document.querySelector("#bg-color").value;
  pointColor = document.querySelector("#point-color").value;
  zoom = document.querySelector("#zoom").value;
  points = [];
  noise.seed(Math.random());

  // beginning tags
  outString = `<svg version="1.1" width="${width}px" height="${height}px" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${bgColor}"/>`;

  // image generation
  points.push(new point(-10, -10));
  for (let i = 1; i < height / 10; i++) {
    for (let j = 1; j < width / 10; j++) {
      if (noise.perlin2(j / zoom, i / zoom) > 0) {
        points.push(new point(j * 10, i * 10));
      }
    }
  }
  points.push(new point(width + 10, height + 10));

  for (let i = 0; i < points.length; i++) {
    points[i].draw();
  }
  let on = true;
  for (let i = 0; i < points.length - 1; i++) {
    if (on) {
      drawString(points[i], points[i + 1]);
      on = false;
    } else on = true;
  }

  // closing tag
  addToString("</svg>");

  // display on page AND as plaintext to copy into a file
  let place = document.querySelector("#place");
  place.innerHTML = outString;
  let cleanedOutString = outString.replace(/</g, "&lt");
  document.querySelector("#svg-data").innerHTML = cleanedOutString;
}
