import fCanvas, { createAnimate } from "../../dist/fcanvas.esm.js";

const canvas = new fCanvas();

canvas.setup(() => {
  canvas.width = canvas.windowWidth;
  canvas.height = canvas.windowHeight;

  canvas.append();
});

class App extends fCanvas.CanvasElement {
  offset = createAnimate(
    {
      x: 0,
      y: 0,
    },
    3000,
    "ease"
  );

  draw() {
    this.fill(0);
    this.rect(this.offset.x, this.offset.y, 40, 40);
  }
  update() {
    this.offset.increment();
  }
}

const app = new App();
self.app = app;
canvas.draw(() => {
  app.render();
});

canvas.mouseClicked(() => {
  console.log("click");
  app.offset.add({
    x: canvas.mouseX,
    y: canvas.mouseY,
  });
});
