import fCanvas, { random, Vector } from "../src/index.js";

const canvas = new fCanvas();
const points = [];

let current;
let prev;
let precent = 0.5;
let frame = 0;

canvas.setup(() => {
  canvas.noClear();
  [canvas.width, canvas.height] = [canvas.windowWidth, canvas.windowHeight];
  canvas.append();

  const napha = 5;
  for (let index = 0; index < napha; index++) {
    const angle = (Math.PI * 2 * index) / napha;
    const vector = new Vector(
      Math.min(canvas.width, canvas.height) / 2,
      Math.min(canvas.width, canvas.height) / 2
    );
    vector.rotate(angle);
    points.push(vector);
  }

  reset();

  current = new Vector(random(canvas.width), random(canvas.height));
});

function reset() {
  canvas.restore();
  canvas.clear();
  canvas.background(0);
  canvas.save();

  canvas.translate(canvas.width / 2, canvas.height / 2);

  // canvas.restore();
}

class App extends fCanvas.Element {
  draw() {
    for (let index = 0; index < 1000; index++) {
      this.lineWidth(1);
      this.stroke(255);

      const vectorNext = random(points);

      if (vectorNext !== prev) {
        current.lerp(vectorNext, precent);
        this.point(current.x, current.y);
      }

      prev = vectorNext;
    }
  }
}

const app = new App();

canvas.draw(() => {
  if (frame % 100 === 0) {
    reset();
  }

  frame++;
  canvas.run(app);
});
