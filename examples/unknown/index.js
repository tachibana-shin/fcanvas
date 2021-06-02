import fCanvas from "../../dist/fcanvas.esm.js";

const canvas = new fCanvas();

canvas.setup(() => {
  [canvas.width, canvas.height] = [canvas.windowWidth, canvas.windowHeight];

  canvas.append();
});

class App extends fCanvas.Element {
  setup() {
     return {
        object
     }
  }

  update() {
     this.state++       
  }
}

const app = canvas.createElement(() => {
  canvas.background(0);
});

canvas.draw(() => {
  canvas.run(app);
});
