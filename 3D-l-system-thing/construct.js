const jscad = require("@jscad/modeling");
const { cuboid } = jscad.primitives;
const { intersect } = jscad.booleans;
const { translate, rotateX, rotateZ, scale } = jscad.transforms;
const { degToRad } = jscad.utils;

class Dodecahedron {
  constructor(scale = 1, position = [0, 0, 0]) {
    this.h = scale;
    this.position = position;
  }
  build() {
    let cuboid1 = cuboid({ size: [20, 20, 10] });
    for (let i = 0; i <= 4; i++) {
      // loop i from 0 to 4, and intersect results
      // make a cube, rotate it 116.565 degrees around the X axis,
      // then 72*i around the Z axis
      cuboid1 = intersect(
        cuboid1,
        rotateZ(
          i * degToRad(72),
          rotateX(degToRad(116.565), cuboid({ size: [20, 20, 10] }))
        )
      );
    }
    cuboid1 = scale([this.h, this.h, this.h], cuboid1);
    cuboid1 = translate(this.position, cuboid1);
    return cuboid1;
  }
}

//const scaleDown = 0.382;
const Phi = 1.618034; //(1 + Math.sqrt(5)) / 2;
const ScaleDown = 0.2; // https://www.bellaard.com/snippets/Sierpinski%20dodecahedron/
const Iterations = 1;
let shapes = [new Dodecahedron()];

const expand = (iterations) => {
  let newShapes = [];
  for (let i = 0; i < shapes.length; i++) {
    /*add a new dodecahedron for each corner of an existing dodecahedron (a dodecahedron has 20 corners)
      https://en.wikipedia.org/wiki/Regular_dodecahedron#:~:text=Stereographic%20projection-,Cartesian%20coordinates,-%5Bedit%5D
      (±1, ±1, ±1)
      (0, ±ϕ, ±1/ϕ)
      (±1/ϕ, 0, ±ϕ)
      (±ϕ, ±1/ϕ, 0)

      edge length = 2/ϕ = √5 − 1   ==>   = 2/scldwn?
    */
    for (let i = 0; i < 20; i++) {
      //(±1, ±1, ±1)
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [1, 1, 1]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [-1, -1, -1]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [-1, -1, 1]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [-1, 1, -1]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [1, -1, -1]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [1, 1, -1]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [-1, 1, 1]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [1, -1, 1]));
      //(0, ±ϕ, ±1/ϕ)
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [0, Phi, 1/Phi]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [0, -Phi, 1/Phi]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [0, Phi, -1/Phi]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [0, -Phi, -1/Phi]));
      //(±1/ϕ, 0, ±ϕ)
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [1/Phi, 0, Phi]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [1/Phi, 0, -Phi]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [-1/Phi, 0, Phi]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [-1/Phi, 0, -Phi]));
      //(±ϕ, ±1/ϕ, 0)
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [Phi, 1/Phi, 0]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [-Phi, 1/Phi, 0]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [Phi, -1/Phi, 0]));
      newShapes.push(new Dodecahedron(ScaleDown / iterations, [-Phi, -1/Phi, 0]));
    }
  }
  shapes = newShapes;
};

const main = () => {
  let step = Iterations;
  while (step > 0) {
    expand(step);
    step--;
  }
  let renderArr = [];
  for (let i = 0; i < shapes.length; i++) {
    renderArr.push(shapes[i].build());
  }
  return renderArr;
};

module.exports = { main };
