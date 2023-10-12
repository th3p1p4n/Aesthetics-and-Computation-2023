/* Ripped off from https://editor.p5js.org/kylemcdonald/sketches/rJg3gPc3Q */

let capture;
var previousPixels;
let flow;
let w = 1280;
let h = 720;
let step = 15;

let pastFrames = [];
const framesToAverage = 30; //3
const denoiseMagnitude = 20; //0

let uMotionGraph, vMotionGraph;

const xZones = 12;
const yZones = 36;
let xDist = 390 / xZones;
let yDist = 1215 / yZones;

let points = [];
//let previous = [];

function setup() {
  p5.disableFriendlyErrors = true;
  createCanvas(390, 1215);

  captureHandler = new CameraHandler(w, h);
  flow = new FlowCalculator(step, yZones / xZones, captureHandler);

  colorMode(RGB);
  background(0, 0, 0, 240);
}

function draw() {
  /**
   * flowResult should look like
   * {
   *   u: 0.28585382711526114,
   *   v: 0.0640638999577491,
   *   zones: [
   *     { x, y, u, v, xInd, yInd},
   *     <and more FlowZone objects>
   *   ]
   * }
   */
  flow.calculate();

  if (!flow.hasData()) {
    return;
  }

  // previous.push(points);
  // for (let j = 0; j < previous.length; j++) {
  //   drawingContext.shadowBlur = j;
  //   drawingContext.shadowColor = color(255, 255, 0);
  //   drawingContext.color = color(255, 255, int(200 / j));
  //   for (let i = 0; i < previous.length - 1; i++) {
  //     stroke(255, 255, 255, 150);
  //     strokeWeight(3);
  //     line(
  //       previous[j][i].x,
  //       previous[j][i].y,
  //       previous[j][i + 1].x,
  //       previous[j][i + 1].y
  //     );
  //   }
  // }

  points = flow.zones.filter((zone) => {
    return zone.u >= 20 || zone.v >= 20;
  });
  points = points.map((zone) => {
    return {
      x: zone.xInd * xDist,
      y: zone.yInd * yDist,
      u: zone.u,
      v: zone.v,
    };
  });

  noStroke();
  drawingContext.shadowBlur = 0;
  drawingContext.fillStyle = color(0, 0, 0, 25);
  rect(0, 0, 390, 1215);

  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color(255, 255, 0);
  drawingContext.color = color(255, 255, 200);
  for (let i = 0; i < points.length - 1; i++) {
    stroke(255, 255, 255, 255);
    strokeWeight(3);
    line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }
}
