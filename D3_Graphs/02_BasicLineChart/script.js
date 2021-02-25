// import dimensions from './dimensions.js'
// import drawCanvas from './drawCanvas.js'
import CanvasDrawer from './CanvasDrawer.js'

async function drawLineChart() {

    const dataset = await d3.json('./data.json')

    const canvasDrawer = new CanvasDrawer({
        width: window.innerWidth * 0.9,
        height: 400,
        margin: {
            top: 15,
            bottom: 40,
            left: 60,
            right: 15,
        }
    })

    // const dateParser = d3.timeParse('%Y-%m-%d')
    // const yAccessor = d => d.temperatureMax
    // const xAccessor = d => dateParser(d.date)

    // const wrapper = drawCanvas('#chart', dimensions)
}

drawLineChart()