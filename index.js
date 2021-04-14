import MyCanvas, { setup, draw } from "./src/index.js"

const canvas = new MyCanvas()
const canvas2 = new MyCanvas()

class App extends MyCanvas.Element {
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