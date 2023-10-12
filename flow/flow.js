// copied from https://github.com/anvaka/oflow

// FlowZone class represents a single zone in the optical flow field
class FlowZone {
  constructor(x, y, u, v, xInd, yInd) {
    this.x = x; // x-coordinate of the top-left corner of the zone in the image
    this.y = y; // y-coordinate of the top-left corner of the zone in the image
    
    // For u and v, positive value indicates motion to the right, 
    // and a negative value indicates motion to the left
    this.u = u; // horizontal component of the optical flow vector for the zone
    this.v = v; // vertical component of the optical flow vector for the zone
    
    this.xInd = xInd; // horizontal index of the zone in the grid of zones
    this.yInd = yInd; // vertical index of the zone in the grid of zones
  }
}

// FlowCalculator class calculates optical flow between two frames
class FlowCalculator {
  constructor(step, xYscaling, cameraHandler) {
    this.step = step;
    this.xYscaling = xYscaling;
    this.cameraHandler = cameraHandler;
    this.previousPixels = null;

    this.averageFlow = [];
    this.zones = [];
  }

  hasData() {
    return this.zones.length > 0;
  }

  // Main function to calculate the optical flow
  calculate() {
    // Return null if the camera is not ready
    if (!this.cameraHandler.isReady()) {
      return null;
    }

    const w = this.cameraHandler.capture.width;
    const h = this.cameraHandler.capture.height;

    // Copy previous frame pixels
    this.previousPixels = copyImage(this.cameraHandler.getPixels(), this.previousPixels);
    this.cameraHandler.loadPixels();

    const newImage = this.cameraHandler.getPixels();
    const oldImage = this.previousPixels;

    // Initialize variables
    const zones = [];
    const step = this.step;
    const winStep = step * 2 + 1;

    let A2, A1B2, B1, C1, C2;
    let u, v, uu, vv;
    uu = vv = 0;
    const wMax = w - step - 1;
    const hMax = h - step - 1;
    let globalY, globalX, localY, localX;

    const scaledXStep = Math.trunc(winStep * this.xYscaling);
    let x = -1;
    let y = -1;

    // Iterate through the image pixels
    for (globalY = step + 1; globalY < hMax; globalY += winStep) {
      y++;
      x = -1;
      for (globalX = step + 1; globalX < wMax; globalX += scaledXStep) {
        x++;
        A2 = A1B2 = B1 = C1 = C2 = 0;

        // Calculate gradients and coefficients
        for (localY = -step; localY <= step; localY++) {
          for (localX = -step; localX <= step; localX++) {
            const address = (globalY + localY) * w + globalX + localX;

            const gradX = (newImage[(address - 1) * 4]) - (newImage[(address + 1) * 4]);
            const gradY = (newImage[(address - w) * 4]) - (newImage[(address + w) * 4]);
            const gradT = (oldImage[address * 4]) - (newImage[address * 4]);

            A2 += gradX * gradX;
            A1B2 += gradX * gradY;
            B1 += gradY * gradY;
            C2 += gradX * gradT;
            C1 += gradY * gradT;
          }
        }

        const delta = (A1B2 * A1B2 - A2 * B1);

        // Calculate optical flow for the current zone
        if (delta !== 0) {
          // System is not singular - solving by Kramer method
          const Idelta = step / delta;
          const deltaX = -(C1 * A1B2 - C2 * B1);
          const deltaY = -(A1B2 * C2 - A2 * C1);

          u = deltaX * Idelta;
          v = deltaY * Idelta;
        } else {
          // Singular system - find optical flow in gradient direction
          const norm = (A1B2 + A2) * (A1B2 + A2) + (B1 + A1B2) * (B1 + A1B2);
          if (norm !== 0) {
            const IGradNorm = step / norm;
            const temp = -(C1 + C2) * IGradNorm;

            u = (A1B2 + A2) * temp;
            v = (B1 + A1B2) * temp;
          } else {
            u = v = 0;
          }
        }

        // Add the calculated optical flow zone to the zones array
        if (-winStep < u && u < winStep && -winStep < v && v < winStep) {
          uu += u;
          vv += v;
          zones.push(new FlowZone(globalX, globalY, u, v, x, y));
        }
      }
    }

    // Calculate the average optical flow components u and v
    this.zones = zones;
    this.averageFlow = [u / zones.length, v / zones.length];
  };
}

// Function to copy an image's pixel data
function copyImage(src, dst) {
  let n = src.length;
  if (!dst || dst.length != n) dst = new src.constructor(n);
  while (n--) dst[n] = src[n];
  return dst;
}
