import fCanvas, { random, range, keyPressed } from "../../dist/fcanvas.esm.js";

const canvas = new fCanvas();

canvas.setup(() => {
  [canvas.width, canvas.height] = [canvas.windowWidth, canvas.windowHeight];

  canvas.append();

  // fCanvas.Point3DCenter.persistent = canvas.width * 0.8;
  canvas.noDesync();
});

class Point extends fCanvas.Point3DCenter {
  width = 40;
  height = 40;
  constructor(x, y, z) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const dots = [];

dots.push(new Point(100, 100, 0));
dots.push(new Point(200, 100, 0));
dots.push(new Point(200, 200, 0));
dots.push(new Point(100, 200, 0));

const app = canvas.createElement(function () {
  this.stroke(0);
  this.begin();
  this.line(dots[0].x, dots[0].y, dots[1].x, dots[1].y);
  this.line(dots[1].x, dots[1].y, dots[2].x, dots[2].y);
  this.line(dots[2].x, dots[2].y, dots[3].x, dots[3].y);
  this.line(dots[3].x, dots[3].y, dots[0].x, dots[0].y);
  this.close();
});

self.dots = dots;

canvas.draw(() => {
  canvas.run(app);
});

keyPressed(({ code }) => {
  switch (code) {
    case "ArrowUp":
      dots.forEach((dot) => {
        dot.y *= canvas.cos(10);
      });
      break;
    case "ArrowDown":
      dots.forEach((dot) => {
        dot.y *= canvas.cos(-10 );
      });
      break;
  }
});
