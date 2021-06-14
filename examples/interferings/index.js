import fCanvas, { interferings, keyPressed } from "../../dist/fcanvas.esm.js";

class Rect extends fCanvas.Element {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  color = "#000000";

  constructor(x, y, width, height, color = "#000000") {
    super();
    [this.x, this.y, this.width, this.height] = [x, y, width, height];

    this.color = color;
  }

  draw() {
    if (this !== rects[1] && interferings(this, rects[1])) {
      this.stroke("green");
    } else {
      this.stroke(this.color);
    }
    this.rect(this.x, this.y, this.width, this.height);
  }
}

const canvas = new fCanvas();

canvas.setup(() => {
  canvas.width = canvas.windowWidth;
  canvas.height = canvas.windowHeight;

  canvas.append();
});

const rects = [];

rects.push(new Rect(100, 100, 40, 40));
rects.push(new Rect(200, 200, 40, 40, "red"));

canvas.draw(() => {
  canvas.run(...rects);
});

keyPressed(({ code }) => {
  switch (code) {
    case "ArrowUp":
      rects[1].y--;
      break;
    case "ArrowDown":
      rects[1].y++;
      break;
    case "ArrowLeft":
      rects[1].x--;
      break;
    case "ArrowRight":
      rects[1].x++;
      break;
  }
});
