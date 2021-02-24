// Draws a flower using the canvas API

const canvas = document.getElementById('canvas1')
const context  = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
context.globalCompositeOperation = 'destination-over'

let number = 0
let scale = 10

const colors = ['#e4755b', '#e05f42', '#dc4928', '#c53e20', '#ab361c']

function getRandomColors(isFromArray = false) {
  if(isFromArray) {
    return {
      randomColorA: colors[Math.floor(Math.random() * (colors.length))],
      randomColorB: colors[Math.floor(Math.random() * (colors.length))],
    }
  }
  return {
    randomColorA: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    randomColorB: `#${Math.floor(Math.random()*16777215).toString(16)}`,
  }
}

function drawFlower() {
  let size = 8
  let angle = number * 0.1
  let radius = scale * Math.sqrt(number)
  let positionX = radius * Math.sin(angle) + canvas.width / 2
  let positionY = radius * Math.cos(angle) + canvas.height / 2

  const { randomColorA, randomColorB } = getRandomColors(true)

  context.fillStyle = randomColorA
  context.strokeStyle = randomColorB
  context.lineWidth = 2
  context.beginPath()
  context.arc(positionX, positionY, size, 0, Math.PI * 2)
  context.closePath()
  context.fill()
  context.stroke()

  number++
}

function animate() {
  drawFlower()
  if(number > 900) return
  requestAnimationFrame(animate)
}

animate()