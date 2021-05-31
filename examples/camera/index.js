import fCanvas, { Camera, keyPressed } from "../../dist/fcanvas.esm.js";

const canvas = new fCanvas();
const camera = new Camera();
const VIEWPORT_WIDTH = canvas.windowWidth * 10;
const VIEWPORT_HEIGHT = 1000;

canvas.setup(() => {
  canvas.width = canvas.windowWidth;
  canvas.height = canvas.windowHeight;

  canvas.append();
  camera.setViewport(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  camera.setViewBox(0, 0, canvas.width, canvas.height);
  camera.setCursor(100, 100, 50, 50);
});

class App extends fCanvas.Element {
  draw() {
    for (let index = 0; index < VIEWPORT_WIDTH / 10; index++) {
      if (camera.inViewBox(index * 10, 100, 5, 5)) {
        this.rect(camera.followX(index * 10), camera.followY(100), 5, 5);
        this.fill(index === 99 ? "red" : 0);
      }
    }

    ///draw cursor
    this.circle(camera.cursor.x, camera.cursor.y, 25);
    this.fill("blue");

    this.circle(100, 200, 25);
    this.fill("blue");

    const image = this.getImageData(0, 0, this.$parent.width, this.$parent.height)

    this.$parent.clear()

    this.putImageData(image, 0, 0)
  }
}
const app = new App();

canvas.draw(() => {
  // canvas.run(app);

  canvas.run(app);
});

keyPressed(({ code }) => {
  switch (code) {
    case "ArrowRight":
      camera.cx += 2;
      break;
    case "ArrowLeft":
      camera.cx -= 2;
      break;
    case "ArrowUp":
      camera.cy -= 2;
      break;
    case "ArrowDown":
      camera.cy += 2;
      break;
  }
  console.log(camera);
});
