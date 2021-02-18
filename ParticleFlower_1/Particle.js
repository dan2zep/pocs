export default class Particle {
    #stroke = {
        color: 'white',
        width: 4,
    }
    #origin = { x: 0, y: 0 }
    #radius
    #color
    constructor({ x, y, radius, color }) {
        this.x = x
        this.y = y
        this.#origin = { x: x, y: y }
        this.#radius = radius
        this.#color = color
    }
    draw(ctx) {
        ctx.fillStyle = this.#color
        ctx.strokeStyle = this.#stroke.color
        ctx.lineWidth = this.#stroke.width
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.#radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    }
}
