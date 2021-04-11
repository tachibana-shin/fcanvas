import MyCanvas, { setup } from "./src/index.js";
const canvas = new MyCanvas();

class App extends MyCanvas.Element {
  draw() {
     //// clear
  }
}

const app = new App();

setup(() => {
  canvas.append();
  canvas.width = canvas.windowWidth;
  canvas.height = canvas.windowHeight;
});
