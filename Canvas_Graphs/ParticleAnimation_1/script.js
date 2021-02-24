const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []
const mouse = {
    x: null,
    y: null,
    radius: 75,
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
})

ctx.fillStyle = 'white'
ctx.font = '30px Verdana'
ctx.fillText('Daniel', 0, 30)
const textCoordiantes = ctx.getImageData(0, 0, 100, 100)

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 3
        this.baseX = this.x
        this.baseY = this.y
        this.density = (Math.random() * 10) + 1
    }
    draw(ctx) {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
    update(mouse) {
        const deltaX = mouse.x - this.x
        const deltaY = mouse.y - this.y
        const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
        const forceDirectionX = deltaX / distance
        const forceDirectionY = deltaY / distance
        const maxDistance = mouse.radius
        const force = (maxDistance - distance) / maxDistance
        const directionX = forceDirectionX * force * this.density
        const directionY = forceDirectionY * force * this.density

        if (distance < mouse.radius) {
            this.x -= directionX
            this.y -= directionY
        } else {
            if (this.x !== this.baseX) {
                const deltaX = this.x - this.baseX
                this.x -= deltaX / 10
            }
            if (this.y !== this.baseY) {
                const deltaY = this.y - this.baseY
                this.y -= deltaY / 10
            }
        }
    }
}

function init() {
    particles = []
    const spread = 10
    const offsetX = 20
    const offsetY = 20
    for (let y1 = 0, y2 = textCoordiantes.height; y1 < y2; y1++) {
        for (let x1 = 0, x2 = textCoordiantes.width; x1 < x2; x1++) {
            const rgbaOpacityLimit = 128
            const skippedIndex = (y1 * 4 * textCoordiantes.width) + (x1 * 4) + 3
            if (textCoordiantes.data[skippedIndex] > rgbaOpacityLimit) {
                const positionX = x1 * spread + offsetX
                const positionY = y1 * spread + offsetY
                particles.push(new Particle(positionX, positionY))
            }
        }
    }
}

init()

function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            const deltaX = particles[a].x - particles[b].x
            const deltaY = particles[a].y - particles[b].y
            let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            if (distance < 20) {
                const opacity = 1 - distance / 50
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(particles[a].x, particles[a].y)
                ctx.lineTo(particles[b].x, particles[b].y)
                ctx.stroke()
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw(ctx)
        particles[i].update(mouse)
    }
    connect()
    requestAnimationFrame(animate)
}

animate()