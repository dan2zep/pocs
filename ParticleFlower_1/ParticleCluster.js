import Particle from './Particle.js'

export default class ParticleCluster {
    constructor({ x, y, radius }) {
        this.x = x
        this.y = y
        this.cluster = []
        this.radius = radius
        this.#init()
    }
    #init() {
        const particleCount = this.#getRandomNumberInRange({ min: 2, max: 6 })
        for (let i = 0; i < particleCount; i++) {
            this.cluster.push(new Particle({
                x: this.#getRandomNumberInRange({ max: this.radius }) + this.x,
                y: this.#getRandomNumberInRange({ max: this.radius }) + this.y,
                radius: 5,
                color: 'red',
            }))
        }
    }

    #getRandomNumberInRange({ min = 0, max }) {
        const randomNumber = Math.random() * (max - min) + min
        return Math.round(randomNumber);
    }

    draw(ctx) {
        for (const particle of this.cluster) {
            particle.draw(ctx)
        }
        return this
    }
}