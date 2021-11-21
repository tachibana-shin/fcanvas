# fCanvas
Library for canvas 2 HTML 5
[View docs](https://tachibana-shin.github.io/fcanvas)

Example:
``` ts
import { createCanvas, Block } from "fcanvas"

const canvas = createCanvas()

canvas.setup(() => {
  canvas.append()
})

class App extends Block {
  draw() {
    this.circle(
      this.instance.mouseX ?? 0,
      this.instance.mouseY ?? 0,
      50
    )
    if (this.instance.mouseIsPressed) {
      this.fill("red")
    } else {
      this.stroke("green")
    }
  }
}

const app = new App()

canvas.draw(() => {
  app.render()
})
```