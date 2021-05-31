import fCanvas, { hypot, keyPressed, random } from "../../dist/fcanvas.esm.js";
const canvas = new fCanvas();

const camera = {
  x: 0,
  y: 0,
  z: 0,
  angleX: 0,
  angleY: 0,
};
class Point3D extends fCanvas.Element {
  x = 0;
  y = 0;
  z = 0;

  constructor(x, y, z) {
    super();
    [this.x, this.y, this.z] = [x, y, z];
  }
  rotateX(angle) {
    this.y = this.y * canvas.cos(angle) + this.z * canvas.sin(angle);
    this.z = -this.y * canvas.sin(angle) + this.z * canvas.cos(angle);
  }
  rotateY(angle) {
    this.x = this.x * canvas.cos(angle) + this.z * canvas.sin(angle);
    this.z = -this.x * canvas.sin(angle) + this.z * canvas.cos(angle);
  }
  rotateZ(angle) {
    this.x = this.x * canvas.cos(angle) - this.y * canvas.sin(angle);
    this.y = this.x * canvas.sin(angle) + this.y * canvas.cos(angle);
  }

  draw() {
    this.point(this.x, this.y);
  }
}
let a = 0;
class Element3D extends fCanvas.Element {
  static scalePerspective = 0.8;
  x = 0;
  y = 0;
  z = 0;

  constructor(x, y, z) {
    super();
    [this.x, this.y, this.z] = [x, y, z];
  }

  get perspective() {
    return this.$parent.width * Element3D.scalePerspective;
  }
  get scale() {
    let s = this.perspective / (this.perspective + this.z + camera.z);
    // s *= canvas.cos(45)
    return s;
  }

  get alpha() {
    return 0.8;
  }

  get xpj() {
    a += 0.05;
    const l = this.x * this.scale;
    return l + canvas.sin(camera.angleX) * (this.z * this.scale); // + canvas.width / 2;
  }
  get ypj() {
    const l = this.y * this.scale;
    return l + canvas.sin(camera.angleY) * (this.z * this.scale); //+ canvas.height / 2;
  }
}

class Dot extends Element3D {
  constructor(...props) {
    super(...props);
  }

  draw() {
    this.fill(0);
    // this.$parent.save();
    this.$parent.globalAlpha(this.alpha);
    // this.circle(this.x, this.y, 10)
    this.rect(this.xpj, this.ypj, 40 * this.scale, 40 * this.scale);
  }
}

const dots = [];

canvas.setup(() => {
  canvas.width = canvas.windowWidth;
  canvas.height = canvas.windowHeight;
  canvas.append();
  canvas.fontSize(20);
  // Create 800 new dots
  for (let i = 0; i < 10; i++) {
    // Create a new dot and push it into the array
    dots.push(
      new Dot(
        // random(canvas.width),
        //random(canvas.height),

        //random(-canvas.width / 2, canvas.width / 2),
        //random(-canvas.height / 2, canvas.height / 2),
        canvas.width / 2,
        canvas.height / 2,
        i * 100 //random(canvas.width)
      )
    );
  }

  dots.forEach((dot) => {
    canvas.run(dot);
    // dot.x *= canvas.cos(45)
    // dot.y *= canvas.sin(-90)

    // dot.x = dot.x * canvas.cos(45) - dot.z * canvas.sin(45);
    // dot.y -= dot.y * canvas.sin(90);

    // dot.y *= canvas.cos(10);
    // dot.y -= canvas.sin(10);
  });
});

canvas.draw(() => {
  dots.forEach((dot) => {
    canvas.run(dot);
    // dot.z--
    // dot.rotateX(1)
    // dot.y = dot.y * canvas.cos(1) - dot.z * canvas.sin(1)
    // dot.z = dot.z * canvas.cos(1) + dot.y * canvas.sin(1)
    // dot.x *= canvas.cos(10)
    // dot.x--
    // dot.z--;
  });
  // camera.z--
  // camera.x++
});

window.addEventListener("keydown", ({ code }) => {
  if (code === "ArrowUp") {
    camera.angleX++;
  }

  if (code === "ArrowDown") {
    camera.angleX--;
  }

  console.log(code);
});
