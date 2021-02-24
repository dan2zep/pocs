const canvas = document.getElementById('main-canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []
const mouse = {
    x: null,
    y: null,
    radius: 150,
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
})

ctx.fillStyle = 'white'
ctx.font = '30px Verdana'
// ctx.fillText('DANIEL', 0, 120)
const pixelData = ctx.getImageData(0, 0, 100, 100)

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 3
        this.baseX = this.x
        this.baseY = this.y
        this.density = (Math.random() * 30) + 1
    }
    draw(ctx) {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
    update(mouse) {
        const differenceX = mouse.x - this.x
        const differenceY = mouse.y - this.y
        const distance = Math.sqrt(Math.pow(differenceX, 2) + Math.pow(differenceY, 2))
        if (distance < 100) {
            this.size = 50
        } else {
            this.size = 3
        }
    }
}

function init() {
    particles = []
    for (let i = 0; i < 1000; i++) {
        const randomX = Math.random() * canvas.width
        const randomY = Math.random() * canvas.height
        particles.push(new Particle(randomX, randomY))
    }
}

init()

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw(ctx)
        particles[i].update(mouse)
    }
    requestAnimationFrame(animate)
}

animate()