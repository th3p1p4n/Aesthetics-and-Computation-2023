//NOISE LIBRARY: https://github.com/josephg/noisejs

"use strict";

// num of tiles across and up/down
let width;
let height;
// hex size (https://www.omnicalculator.com/math/hexagon)
let side = 57;
let shortDiag = 98;
let longDiag = side * 2;
// params for a singular tile; adjust as-needed.
let color;
let baseTile;
let testTile = `<path stroke="#0F0" fill="#112d5a" d="M49.363448015713 0L98.726896031426 28.5L98.726896031426 85.5L49.363448015713 114L0 85.5L0 28.5Z"></path> <path stroke-width="10" stroke="#F00" d="M49.363448015713 0L98.726896031426 28.5"></path>`;
//other things shhhhhh
let tiles;
let outString = "";
let useNoise;

class tile {
  x;
  y;
  rotation;
  base;
  constructor(x, y, rotation, base) {
    this.base = base;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }
  draw() {
    console.log(
      `Drew a tile: x=${this.x} y=${this.y} rotation=${this.rotation}`
    );
    addToString(
      `<g transform="
      rotate(${this.rotation} ${this.x + shortDiag / 2} ${
        this.y + longDiag / 2
      }), 
      translate(${this.x} ${this.y})">
      ${this.base}</g>`
    );
  }
}

const addToString = (newTxt) => {
  outString = outString + newTxt + "\n";
};

const loadParams = () => {
  width = document.querySelector("#width").value;
  height = document.querySelector("#height").value;
  color = document.querySelector("#color").value;
  useNoise = document.querySelector("#use-noise").checked;
  if (document.querySelector("#test").checked) {
    baseTile = testTile;
  } else {
    baseTile = `
    <g
    id="g5551"
    style="fill:#000000"
    transform="rotate(180,49.288933,56.883403)">
   <path
      style="fill:none;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 92.873135,90.320896 C 63.388517,41.583392 54.869825,36.515249 -0.28358208,35.873134"
      id="path1578" />
   <path
      style="fill:none;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 80.207221,96.514743 C 55.685288,54.583209 41.920327,49.231483 -0.33009509,49.865488"
      id="path1578-8" />
   <path
      style="fill:none;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 68.653965,103.96296 C 45.975316,67.277699 36.889459,63.202093 -0.11469424,63.836097"
      id="path1578-8-3" />
   <path
      style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 55.736396,110.58282 C 40.856259,85.808003 32.479356,78.18762 -0.12927416,77.970878"
      id="path1578-8-3-2" />
 </g>
 <g
    id="g5551-7"
    style="fill:#000000"
    transform="translate(0.06972855,-0.2136891)">
   <path
      style="fill:none;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 92.731344,89.328359 C 90.041274,84.597666 90.749402,79.830956 90.623931,76.00714 M 89.914975,37.865349 c -0.125472,-6.234264 -0.073,-8.798702 2.40999,-13.160804"
      id="path1578-3" />
   <path
      style="fill:none;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 80.632595,96.08937 C 77.091777,89.940767 78.18983,85.422191 78.188425,79.010688 M 77.47947,35.90621 C 77.194484,30.345453 76.477278,23.652624 79.881917,17.872611"
      id="path1578-8-44" />
   <path
      style="fill:none;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 66.668891,104.38834 C 60.457171,93.252406 61.728756,84.153658 61.896956,75.919049 m 0.992537,-47.358208 c 1.586111,-6.958489 1.677729,-11.299446 5.798735,-17.844486"
      id="path1578-8-3-5" />
   <path
      style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 55.311023,112.14252 C 51.228659,105.49868 48.895275,102.05094 47.53197,94.851153 m 3.828358,-78.977612 c 0.08722,-3.2921 0.376453,-4.100601 4.844526,-11.9365846"
      id="path1578-8-3-2-8" />
 </g>
 <g
    id="g5551-1"
    style="fill:#000000"
    transform="translate(0.06973127,0.28257934)">
   <path
      style="fill:none;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="m 42.480325,110.52613 c 2.306084,-3.92505 8.496319,-26.770491 5.308348,-38.897037 M 14.442202,37.996595 C 9.691087,35.892931 13.96559,35.395603 -0.14179105,35.589552"
      id="path1578-9" />
   <path
      style="fill:none;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 30.419569,103.39162 C 42.337934,83.012314 34.405401,49.656856 -0.046513,49.723697"
      id="path1578-8-4" />
   <path
      style="fill:none;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 17.759797,96.093561 C 25.424431,83.370983 21.434235,63.485675 -0.11469424,63.552515"
      id="path1578-8-3-1" />
   <path
      style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:6.91276;stroke-dasharray:none;stroke-opacity:1"
      d="M 5.7309665,88.676103 C 8.8582922,83.610242 6.9569679,77.904038 0.01251687,77.970878"
      id="path1578-8-3-2-7" />
 </g>`;
  }
};

const generate = () => {
  // setup
  loadParams();
  tiles = [];
  noise.seed(Math.random());

  // beginning tags
  outString = `<svg version="1.1" width="${width * shortDiag}px" height="${
    height * longDiag
  }px" xmlns="http://www.w3.org/2000/svg">`; //<rect width="100%" height="100%" fill="white"/>

  // image generation
  for (let i = 0; i <= height + 1; i++) {
    for (let j = -1; j <= width; j++) {
      let rotation = 0;
      let noiseVar = noise.perlin2(j / 10, i / 10);
      if (useNoise) {
        if (noiseVar > 0.6) {
          rotation = 300;
        } else if (noiseVar > 0.3) {
          rotation = 240;
        } else if (noiseVar > 0.0) {
          rotation = 180;
        } else if (noiseVar > -0.3) {
          rotation = 120;
        } else if (noiseVar > -0.6) {
          rotation = 60;
        } else {
          rotation = 0;
        }
      } else {
        let rand = Math.random() * (1 - -1) + -1;
        if (rand > 0.6) {
          rotation = 300;
        } else if (rand > 0.3) {
          rotation = 240;
        } else if (rand > 0.0) {
          rotation = 180;
        } else if (rand > -0.3) {
          rotation = 120;
        } else if (rand > -0.6) {
          rotation = 60;
        } else {
          rotation = 0;
        }
      }
      let offset = () => {
        if (i % 2 == 1) {
          return side * 0.86;
        }
        return 0;
      };
      tiles.push(
        new tile(
          j * shortDiag + offset(),
          i * (shortDiag - 0.2 * side) - side, // shifts up by 1/2 tile to avoid untiled upper border
          rotation,
          baseTile
        ) //x (incl. offset),y,rotation,base
      );
    }
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
