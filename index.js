import fCanvas, { setup, draw } from "./src/index.js"

const canvas = new fCanvas()
const canvas2 = new fCanvas()

class App extends fCanvas.Element {
  draw() {
    this.fill("red")
    this.circle(100, 100, 50)
  }
}

const app = new App()

setup(() => {
  canvas.append()
  canvas2.append()
})

draw(() => {
  canvas.clear()
  canvas2.clear()
  canvas.run(app)
  canvas2.run(app)
})