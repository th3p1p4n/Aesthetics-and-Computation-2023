//NOISE LIBRARY: https://github.com/josephg/noisejs

"use strict";

// num of tiles across and up/down
let width;
let height;
// width of one tile (baseTile)
let tileWidth = 30;
// params for a singular tile; adjust as-needed.
let rectColor;
let rectFill = "transparent";
let lineColor;
let baseTile;
//other things shhhhhh
let tiles;
let outString = "";

class tile {
  x;
  y;
  rotation;
  base;
  constructor(x, y, chaos, baseRotation, baseTile) {
    this.base = baseTile;
    this.x = x;
    this.y = y;
    this.rotation = chaos + baseRotation;
  }
  draw() {
    console.log(
      `Drew a tile: x=${this.x} y=${this.y} rotation=${this.rotation}`
    );
    addToString(
      `<g transform="
      rotate(${this.rotation} ${this.x + tileWidth / 2} ${
        this.y + tileWidth / 2
      }) 
      translate(${this.x} ${this.y})">
      ${this.base}</g>`
    );
  }
}

const addToString = (newTxt) => {
  outString = outString + newTxt + "\n";
};

const loadParams = () => {
  width = document.querySelector("#width").value; // adds 1 for margin reasons.
  height = document.querySelector("#height").value;
  rectColor = document.querySelector("#box-color").value;
  lineColor = document.querySelector("#squiggle-color").value;

  if (document.querySelector("#show-boxes").checked) {
    baseTile = `<rect fill="${rectFill}" stroke="${rectColor}" width="30" height="30"/>
    <path
       style="fill:${lineColor}"
       d="M 0.04363027,0.04363027 H 4.930221 V 4.9738512 h 5.148372 v 5.1047418 h 4.973852 v 4.973852 h 4.84296 v 4.973851 h 5.061112 v 4.930221 h 4.973851 v 5.104742 h -0.916236 v -4.057616 h -4.973851 v -4.79933 H 19.06643 V 15.837789 H 14.2671 V 10.733047 H 9.0314667 V 5.9337173 H 3.9703549 V 0.91623575 H 0.08726055"
       id="path876" />`;
  } else {
    baseTile = `<path
    style="fill:${lineColor}"
    d="M 0.04363027,0.04363027 H 4.930221 V 4.9738512 h 5.148372 v 5.1047418 h 4.973852 v 4.973852 h 4.84296 v 4.973851 h 5.061112 v 4.930221 h 4.973851 v 5.104742 h -0.916236 v -4.057616 h -4.973851 v -4.79933 H 19.06643 V 15.837789 H 14.2671 V 10.733047 H 9.0314667 V 5.9337173 H 3.9703549 V 0.91623575 H 0.08726055"
    id="path876" />`;
  }
};

const generate = () => {
  // setup
  loadParams();
  tiles = [];
  noise.seed(Math.random());

  // beginning tags
  outString = `<svg version="1.1" width="${
    width * tileWidth + 2 * tileWidth
  }px" height="${
    height * tileWidth + 2 * tileWidth
  }px" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="white"/>`;

  // image generation
  let chaosMultiplier = 1;
  for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
      let rotation = 0;
      let noiseVar = noise.perlin2(j / 10, i / 10);
      if (noiseVar > 0.5) {
        rotation = 270;
      } else if (noiseVar > 0.0) {
        rotation = 180;
      } else if (noiseVar > -0.5) {
        rotation = 90;
      } else {
        rotation = 0;
      }
      tiles.push(
        new tile(
          j * tileWidth,
          i * tileWidth,
          chaosMultiplier * Math.random(),
          rotation,
          baseTile
        )
      );
    }
    chaosMultiplier++;
  }

  // image drawing
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].draw();
  }

  // closing tag
  addToString("</svg>");

  // display on page AND as plaintext to copy into a file
  let place = document.querySelector("#place");
  place.innerHTML = outString;
  let cleanedOutString = outString.replace(/</g, "&lt");
  document.querySelector("#svg-data").innerHTML = cleanedOutString;
};

window.onload = () => {
  document.querySelector("#generate").onclick = generate;
  generate();
};
