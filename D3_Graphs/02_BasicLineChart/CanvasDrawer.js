export default class CanvasDrawer {

    #accessors
    #scales

    #dateParse(date) {
        return d3.timeParse('%Y-%m-%d')(date)
    }

    constructor({
        width,
        height,
        margin,
        identifier,
        accessors,
    }) {
        this.width = width
        this.height = height
        this.margin = margin
        this.identifier = identifier
        this.dimensions = {
            boundedHeight: this.height - this.margin.top - this.margin.bottom,
            boundedWidth: this.width - this.margin.left - this.margin.right,
        }
        this.#accessors = {
            xAxis: (dataField) => this.#dateParse(accessors.xAxis(dataField)),
            yAxis: accessors.yAxis,
        }
    }

    preDraw() {
        const wrapper = d3.select(this.identifier)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
        const translateCommand = `translate(
            ${this.width}px,
            ${this.height}px
            )`
        this.bounds = wrapper.append('g')
            .style('transform', translateCommand)
    }

    drawScales(dataset) {
        this.#scales = {
            yAxis: d3.scaleLinear()
                .domain(d3.extent(dataset, this.#accessors.yAxis))
                .range([this.dimensions.boundedHeight, 0]),
            xAxis: d3.scaleTime()
                .domain(d3.extent(dataset, this.#accessors.xAxis))
                .range([0, this.dimensions.boundedWidth]),
        }
    }

    drawData(dataset) {
        const lineGenerator = d3.line()
            .x(d => this.#scales.xAxis(this.#accessors.xAxis(d)))
            .y(d => this.#scales.yAxis(this.#accessors.yAxis(d)))

        const line = this.bounds.append('path')
            .attr('d', lineGenerator(dataset))
            .attr('fill', 'none')
            .attr('stroke', '#af9358')
            .attr('stroke-width', 2)
    }
}
