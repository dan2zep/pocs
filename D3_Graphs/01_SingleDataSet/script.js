import makeDemo from './makeDemo.js'

(() => {
    const chart = document.querySelector('#chart1')
    const data = [31, 2, 4, 5, 64, 4, 54]
    const chartDemo = makeDemo(data)
    chart.appendChild(chartDemo)
})()