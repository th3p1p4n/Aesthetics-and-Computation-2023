const jscad = require('@jscad/modeling')
const { polygon } = jscad.primitives
const { extrudeLinear } = jscad.extrusions

function main () {
    const poly = polygon({ points: [[0,0],[2,4],[3,4],[5,0],[4,0],[3.5,1],[1.5,1],[1,0]] })
    const hole = polygon({points: [[2,2],[2.5,3],[3,2]]})
    const comp = 
    return extrudeLinear({ height: 5, twistAngle: Math.PI / 4, twistSteps: 10 }, poly)
}

module.exports = { main }
