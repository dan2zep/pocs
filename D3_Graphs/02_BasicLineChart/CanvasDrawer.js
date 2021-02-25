export default class CanvasDrawer {

    constructor({
        width,
        height,
        margin,
        identifier,
    }) {
        this.width = width
        this.height = height
        this.margin = margin
        this.identifier = identifier
        this.dimensions = {
            boundedHeight: this.height - this.margin.top - this.margin.bottom,
            boundedWidth: this.width - this.margin.left - this.margin.right,
        }
        this.bound = this.init()
    }

    init() {
        const wrapper = d3.select(this.identifier)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
        const translateCommand = `translate(
            ${this.width}px,
            ${this.height}px
            )`
        const bound = wrapper.append('g')
            .style('transform', translateCommand)
        return bound
    }
}