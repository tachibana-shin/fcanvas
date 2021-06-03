import fCanvas, { createElement, keyPressed } from "../../dist/fcanvas.esm.js";

const canvas = new fCanvas();

canvas.setup(() => {
  [canvas.width, canvas.height] = [canvas.windowWidth, canvas.windowHeight];

  canvas.append();

  // fCanvas.Point3DCenter.persistent = canvas.width * 0.8;
  canvas.noDesync();

  // fCanvas.Point3DCenter.persistent = canvas.width * 0.8;
});

const x = 300;
const y = 300;
const z = 0;
const points = [];

points.push(new fCanvas.Point3DCenter(x + 0, y + 0, z + 100));
points.push(new fCanvas.Point3DCenter(x + 100, y + 0, z + 100));
points.push(new fCanvas.Point3DCenter(x + 100, y + 100, z + 100));
points.push(new fCanvas.Point3DCenter(x + 0, y + 100, z + 100));

points.push(new fCanvas.Point3DCenter(x + 0, y + 0, z + 0));
points.push(new fCanvas.Point3DCenter(x + 100, y + 0, z + 0));
points.push(new fCanvas.Point3DCenter(x + 100, y + 100, z + 0));
points.push(new fCanvas.Point3DCenter(x + 0, y + 100, z + 0));

const app = createElement(function () {
  this.begin();
  this.move(points[4].x, points[4].y);
  this.to(points[5].x, points[5].y);
  this.to(points[6].x, points[6].y);
  this.to(points[7].x, points[7].y);
  this.to(points[4].x, points[4].y);

  this.move(points[4].x, points[4].y);
  this.to(points[0].x, points[0].y);

  this.move(points[5].x, points[5].y);
  this.to(points[1].x, points[1].y);

  this.move(points[6].x, points[6].y);
  this.to(points[2].x, points[2].y);

  this.move(points[7].x, points[7].y);
  this.to(points[3].x, points[3].y);

  this.move(points[4].x, points[4].y);
  this.to(points[0].x, points[0].y);

  this.move(points[0].x, points[0].y);
  this.to(points[1].x, points[1].y);
  this.to(points[2].x, points[2].y);
  this.to(points[3].x, points[3].y);
  this.to(points[0].x, points[0].y);
  this.stroke();

  this.close();
});

canvas.draw(() => {
  canvas.run(app);
});

keyPressed(({ code }) => {
  switch (code) {
    case "ArrowUp":
      points.forEach((point) => {
        point.z++;
      });
      break;
    case "ArrowDown":
      points.forEach((point) => {
        point.z--;
      });
      break;
    case "ArrowRight":
      points.forEach((point) => {
        point.x *= Math.sin(Math.PI / 4)
      });
      break;
    case "ArrowLeft":
      points.forEach((point) => {
        point.x *= Math.sin(-Math.PI / 4)
      });
      break;
  }
});
