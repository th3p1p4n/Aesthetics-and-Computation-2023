const step = (lindenmayerString) => {
  return [...lindenmayerString]
    .map(letter => rules[letter])
    .join('');
};

const expand = (iterations, lindenmayerString) => {
  let expandedString = lindenmayerString;
  for (let i = 0; i < iterations; i++) {
    expandedString = step(expandedString);
  }
  return expandedString;
};

// Here, 
// F and G both mean "draw forward", 
// + means "turn left by angle", and 
// − means "turn right by angle".
const drawToPoints = (lindenmayerString) => {
  let startingPoint = [0, 0];
  let rotation = 0;
  let lineLength = 10;
  let points = [startingPoint];

  const moveForward = () => {
    const lastPoint = points[points.length - 1];

    const dx = Math.cos(rotation) * lineLength;
    const dy = Math.sin(rotation) * lineLength;

    points.push([lastPoint[0] + dx, lastPoint[1] + dy]);
  };
  
  const theRightThing = {
    'F': moveForward,
    'G': moveForward,
    '+': () => {
      rotation = rotation - angle * Math.PI / 180;
    },
    '-': () => {
      rotation = rotation + angle * Math.PI / 180;
    }
  };

  [...lindenmayerString]
    .forEach(letter => {
      const doTheRightThing = theRightThing[letter];
      doTheRightThing();
    });

  return points;
};

const rules = ({
  'F': 'F+G',
  'G': 'F-G',
  '-': '-',
  '+': '+'
});

const iterations = 10;
const start = 'F';

const expansion = expand(iterations, start);

const angle = 90;
const points = drawToPoints(expansion)

// make an svg polyline
const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
polyline.setAttribute('points', points.join(' '));
polyline.setAttribute('fill', 'none');
polyline.setAttribute('stroke', 'black');
polyline.setAttribute('stroke-width', '1px');

// add the polyline to the svg
const svg = document.querySelector('svg');
svg.appendChild(polyline);

