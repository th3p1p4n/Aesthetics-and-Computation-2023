//NOISE LIBRARY: https://github.com/josephg/noisejs

"use strict";

const axiom = "X"; // starting str
let outString = "";
let iterations;
let lineDistance;
let currentAngle;
let stateStack;
let startingPoint;
let points = [];
const angle = 25;
const rules = {
  X: "F+[[X]-X]-F[-FX]+X",
  F: "FF",
  "+": "+",
  "-": "-",
  "]": "]",
  "[": "[",
};

const addToString = (newTxt) => {
  outString = outString + newTxt + "\n";
};

const transformString = (state) => {
  let transformed = "";
  for (let i = 0; i < state.length; i++) {
    const letter = state[i];
    transformed += rules[letter];
  }
  return transformed;
};

const display = (svgData) => {
  // display on page AND as plaintext to copy into a file
  let place = document.querySelector("#place");
  place.innerHTML = svgData;
  let cleanedData = svgData.replace(/</g, "&lt");
  document.querySelector("#svg-data").innerHTML = cleanedData;
};

const interpretByLetter = {
  F: () => {
    const currentPosition = points.slice(-1)[0];
    const nextPoint = {
      x:
        currentPosition.x +
        lineDistance * Math.cos((currentAngle * Math.PI) / 180),
      y:
        currentPosition.y +
        lineDistance * Math.sin((currentAngle * Math.PI) / 180),
    };

    points.push(nextPoint);
  },
  X: () => {},
  "+": () => {
    currentAngle += 45;
  },
  "-": () => {
    currentAngle -= 25;
  },
  "[": () => {
    stateStack.push({
      position: points.slice(-1)[0],
      angle: currentAngle,
    });
  },
  "]": () => {
    const lastState = stateStack.pop();
    points.push(lastState.position);
    currentAngle = lastState.angle;
  },
};

const draw = (genStr) => {
  outString = `<svg version="1.1" width="2000px" height="2000px" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="darkgray"/>`; // beginning tags

  //setup
  startingPoint = { x: 200, y: 100 };
  currentAngle = 45;
  lineDistance = 1;
  stateStack = [];
  points = [startingPoint];

  // generate points using input string
  for (let i = 0; i < genStr.length; i++) {
    const letter = genStr[i];

    const interpret = interpretByLetter[letter];
    interpret();
  }

  //drawpolyline(points); <-- won't work on its own, but something like this.
  // alternatively, a 2d array of paths [[a,b],[a,b],[a,b]]..
  // more demo stuff from class on myCourses
  addToString(
    ` <polyline fill="none" stroke="black" stroke-width="1" points="`
  );
  for (let i = 0; i < points.length; i++) {
    addToString(`${points[i].x},${points[i].y} `);
  }
  // #,# #,# #,#...
  addToString(`" />`);

  addToString("</svg>"); // closing tag
  display(outString);
};

const generate = () => {
  // setup
  let genStr = axiom;
  iterations = document.querySelector("#iterations").value;

  // image generation
  for (let i = 0; i < iterations; i++) {
    console.log(genStr);

    genStr = transformString(genStr);
  }
  console.log(genStr);

  draw(genStr);
};

window.onload = generate;
document.querySelector("#generate").onclick = generate;
