import fCanvas from "../src/index.js";

const canvas = new fCanvas();

class App extends fCanvas.EAnimate {
  draw() {
    // console.log( this );
    // debugger
    this.fill(0);
    this.circle(this.x, this.y, 10);
  }
  update() {
    this.draw();
    this.addFrame();
  }
}

const app = new App({
  time: 1000,
});

app.$.on("done", () => {
  // alert("done")
  app.set(app.x, app.y, app.z);
});

canvas.setup(() => {
  canvas.width = canvas.windowWidth;
  canvas.height = canvas.windowHeight;

  canvas.append();
});

canvas.draw(() => {
  canvas.run(app);
});

canvas.mouseClicked(() => {
  // if (app.done) {
    app.moveImmediate(canvas.mouseX, canvas.mouseY);
  // }
});
