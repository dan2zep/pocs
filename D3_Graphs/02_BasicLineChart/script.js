// The code doesn't render, most likely because the methods for drawing are inside a class
// and not in the main script, not sure a 100% but it ouwld be the only difference with the original example

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
        },
        identifier: '#chart',
        accessors: {
            xAxis: dataPoint => dataPoint.date,
            yAxis: dataPoint => dataPoint.temperatureMax,
        },
    })

    canvasDrawer.preDraw()
    canvasDrawer.drawScales(dataset)
    canvasDrawer.drawData(dataset)
}

drawLineChart()