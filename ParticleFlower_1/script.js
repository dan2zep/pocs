import ParticleCluster from './ParticleCluster.js'

const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function generateConcentricCircle() {

    function getRadiusSpacing({ stepQty, offset }) {
        const spacing = []
        for (let i = 0; i <= stepQty; i++) {
            spacing.push(i * offset)
        }
        return spacing
    }

    const linearSpacing = getRadiusSpacing({
        stepQty: 5,
        offset: 100,
    })

    for (let i = 0; i < linearSpacing.length; i++) {
        getRadiusSpacing
    }
}

const aux = generateConcentricCircle()
console.log(aux)
// console.log(
//     (new ParticleCluster({ x: 25, y: 25, radius: 25 }))
//         .draw(ctx)
// )