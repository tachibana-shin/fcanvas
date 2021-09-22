import fCanvas, { Animate } from "../../dist/fcanvas.esm.js";

const canvas = new fCanvas();

canvas.setup(() => {
  canvas.width = canvas.windowWidth;
  canvas.height = canvas.windowHeight;

  canvas.append();
});

class App extends fCanvas.CanvasElement {
  offset = new Animate([0, 0], 3000, "ease");

  draw() {
    this.fill(0);
    this.rect(this.offset[0], this.offset[1], 40, 40);
  }
  update() {
    this.offset.action();
  }
}

const app = new App();
self.app = app;
canvas.draw(() => {
  app.render()
});

canvas.mouseClicked(() => {
  console.log("click");
  app.offset.add([canvas.mouseX, canvas.mouseY]);
});
