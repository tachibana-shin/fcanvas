import {
  AutoToPx,
  fontToArray,
  getTouchInfo,
  requestAnimationFrame,
  windowSize,
  isMobile,
} from "./utils/index.js";
import _Emitter from "./classes/Emitter.js";

class MyElement {
  constructor(canvas) {
    if (canvas === undefined) {
      const canvas = new fCanvas();
      this._els.push(canvas);
    } else {
      if (canvas instanceof fCanvas) {
        this.bind(canvas);
      } else {
        const canvas = new fCanvas();
        this._els.push(canvas);
        console.error(
          "fCanvas: super() in MyElement.constructor not's fCanvas element."
        );
      }
    }
  }

  _els = [];
  _idActiveNow = null;

  get $el() {
    return this.pcanvas.$el;
  }
  _queue = [];
  _run(canvas) {
    this.bind(canvas);
    this._idActiveNow = canvas._id;

    if (typeof this.update === "function") {
      this.update();
    } else if (typeof this.draw === "function") {
      this.draw();
    }

    if (this._queue.length > 0) {
      for (
        let index = 0, length = this._queue.length;
        index < length;
        index++
      ) {
        this.run(this._queue[index]);
      }
    }

    this._idActiveNow = null;
  }
  addQueue(canvasElement) {
    if (canvasElement instanceof MyElement) {
      this._queue.push(canvasElement);
    } else {
      console.error(
        `fCanvas: the parameter passed to MyElement.addQueue() must be a fCanvas object.`
      );
    }
  }
  getQueue(index) {
    if (index < 0) {
      index += this._queue.length;
    }

    return this._queue[index];
  }
  run(canvasElement) {
    this.pcanvas.run(canvasElement);
  }
  has(id) {
    return this._els.some((item) => item._id === id);
  }
  get pcanvas() {
    const canvas =
      this._idActiveNow === null
        ? this._els[this._els.length - 1]
        : this._els.find((item) => item._id === this._idActiveNow);

    if (canvas instanceof fCanvas) {
      return canvas;
    } else {
      console.warn(
        "fCanvas: The current referenced version of the fCanvas.run function is incorrect."
      );
      return this._els[0];
    }
  }

  bind(canvas) {
    if (canvas instanceof fCanvas) {
      if (this.has(canvas._id) === false) {
        this._els.push(canvas);
      }
    } else {
      console.error(
        "fCanvas: the parameter passed to MyElement.bind() must be a fCanvas object."
      );
    }
  }
  get $context2d() {
    return this.pcanvas.$context2d;
  }

  _extendsCanvas(name, ...argv) {
    return this.pcanvas[name](...argv);
  }
  _toRadius(...argv) {
    return this._extendsCanvas("_toRadius", ...argv);
  }
  _toDegress(...argv) {
    return this._extendsCanvas("_toDegress", ...argv);
  }
  _toRgb(...argv) {
    return this._extendsCanvas("_toRgb", ...argv);
  }
  _figureOffset(...argv) {
    return this._extendsCanvas("_figureOffset", ...argv);
  }
  sin(...argv) {
    return this._extendsCanvas("sin", ...argv);
  }
  asin(...argv) {
    return this._extendsCanvas("asin", ...argv);
  }
  cos(...argv) {
    return this._extendsCanvas("cos", ...argv);
  }
  acos(...argv) {
    return this._extendsCanvas("acos", ...argv);
  }
  tan(...argv) {
    return this._extendsCanvas("tan", ...argv);
  }
  atan(...argv) {
    return this._extendsCanvas("atan", ...argv);
  }
  tan2(...argv) {
    return this._extendsCanvas("tan2", ...argv);
  }
  atan2(...argv) {
    return this._extendsCanvas("atan2", ...argv);
  }
  get mouseX() {
    return this.pcanvas.mouseX;
  }
  get mouseY() {
    return this.pcanvas.mouseY;
  }
  get interact() {
    return this.pcanvas.interact;
  }
  get width() {
    return this.pcanvas.width;
  }
  get height() {
    return this.pcanvas.height;
  }
  get windowWidth() {
    return this.pcanvas.windowWidth;
  }
  get windowHeight() {
    return this.pcanvas.windowHeight;
  }

  _createLinear(type, ...argv) {
    return this.$context2d[type](...argv);
  }

  fill(...argv) {
    if (argv.length === 0) {
      return this.$context2d.fillStyle || "rgba(0, 0, 0, 0)";
    } else {
      this.$context2d.fillStyle = this._toRgb(argv);
      this.$context2d.fill();
    }
  }
  stroke(...argv) {
    if (argv.length === 0) {
      return this.$context2d.strokeStyle || "rgba(0, 0, 0, 0)";
    } else {
      this.$context2d.strokeStyle = this._toRgb(argv);
      this.$context2d.stroke();
    }
  }
  noFill() {
    this.fill(0, 0, 0, 0);
  }
  lineWidth(value) {
    if (value === undefined) {
      return this.$context2d.lineWidth;
    } else {
      this.$context2d.lineWidth = value;
    }
  }
  miterLimit(value) {
    if (value === undefined) {
      return this.$context2d.miterLimit;
    } else {
      if (this.lineJoin() !== "miter") {
        this.lineJoin("miter");
      }

      this.$context2d = value;
    }
  }
  shadowOffset(...args) {
    if (args.length === 0) {
      return {
        x: this.$context2d.shadowOffsetX,
        y: this.$context2d.shadowOffsetY,
      };
    } else {
      [this.$context2d.shadowOffsetX, this.$context2d.shadowOffsetY] = args;
    }
  }
  measureText(text) {
    return this.$context2d.measureText(text).width;
  }
  begin() {
    this.$context2d.beginPath();
  }
  close() {
    this.$context2d.closePath();
  }
  save() {
    this.$context2d.save();
  }
  restore() {
    this.$context2d.restore();
  }

  arc(c, t, e, i, n, o) {
    this.begin();
    this.$context2d.arc(
      c,
      t,
      e,
      this._toRadius(i) - Math.PI / 2,
      this._toRadius(n) - Math.PI / 2,
      o
    );
    this.close();
  }
  pie(x, y, r, d1, d2, a) {
    this.begin();
    this.move(x, y);
    this.arc(x, y, r, d1, d2, a);
    this.to(x, y);
    this.close();
  }
  line(c, t, e, i) {
    this.move(c, t);
    this.to(e, i);
  }
  ellipse(c, t, e, i, n, o, r) {
    this.begin();
    this.$context2d.ellipse(
      c,
      t,
      e,
      i,
      this._toRadius(n) - Math.PI / 2,
      this._toRadius(o),
      r === undefined ? !1 : r
    );
    this.close();
  }
  circle(x, y, r) {
    this.arc(x, y, r, 0, 360);
  }
  point(x, y) {
    this.circle(x, y, 1);
  }
  triange(a, b, c, d, e, f) {
    this.begin();
    this.move(a, b);
    this.to(c, d);
    this.to(e, f);
    this.close();
  }
  drawImage(image, ...args) {
    if (args.length === 2) {
      args = this._figureOffset(...args, image.width, image.height);
    } else if (args.length === 6) {
      [args[5], args[6]] = this._figureOffset(...args.slice(3));
    }
    this.$context2d.drawImage(image, ...args);
  }
  rect(x, y, w, h, $1, $2 = $1, $3 = $1, $4 = $2) {
    this.begin();
    [x, y] = this._figureOffset(x, y, w, h);

    if (arguments.length < 5) {
      this.$context2d.rect(x, y, w, h);
    } else {
      const arc = [
        AutoToPx($1, w),
        AutoToPx($2, h),
        AutoToPx($3, w),
        AutoToPx($4, h),
      ];
      this.move(x, y);
      this.arcTo(x + w, y, x + w, y + h - arc[1], arc[1]);
      this.arcTo(x + w, y + h, x + w - arc[2], y + h, arc[2]);
      this.arcTo(x, y + h, x, y + h - arc[3], arc[3]);
      this.arcTo(x, y, x + w - arc[0], y, arc[0]);
    }
    this.close();
  }
  square(x, y, w, ...radius) {
    this.rect(x, y, w, w, ...radius);
  }

  hypot =
    typeof Math.hypot === "function"
      ? Math.hypot
      : (...args) => {
          const len = args.length;
          let i = 0,
            result = 0;
          while (i < len) result += Math.pow(args[i++], 2);
          return Math.sqrt(result);
        };

  __functionDefault(property, arg) {
    if (arg === undefined) {
      return this.$context2d[property];
    } else {
      this.$context2d[property] = arg;
    }
  }
  __functionDefault2(name, ...argv) {
    return this.$context2d[name](...argv);
  }

  quadratic(...argv) {
    this.__functionDefault2("quadraticCurveTo", ...argv);
  }
  bezier(...argv) {
    this.__functionDefault2("bezierCurveTo", ...argv);
  }
  move(...argv) {
    this.__functionDefault2("moveTo", ...argv);
  }
  to(...argv) {
    this.__functionDefault2("lineTo", ...argv);
  }
  fillText(...argv) {
    this.__functionDefault2("fillText", ...argv);
  }
  strokeText(...argv) {
    this.__functionDefault2("strokeText", ...argv);
  }
  fillRect(...argv) {
    this.__functionDefault2("fillRect", ...argv);
  }
  strokeRect(...argv) {
    this.__functionDefault2("strokeRect", ...argv);
  }
  arcTo(...argv) {
    this.__functionDefault2("arcTo", ...argv);
  }
  isPoint(...argv) {
    this.__functionDefault2("isPointInPath", ...argv);
  }
  createImageData(...argv) {
    return this.__functionDefault2("createImageData", ...argv);
  }
  getImageData(...argv) {
    return this.__functionDefault2("getImageData", ...argv);
  }
  putImageData(...argv) {
    this.__functionDefault2("putImageData", ...argv);
  }
  createPattern(...argv) {
    return this.__functionDefault2("createPattern", ...argv);
  }
  createRadialGradient(...argv) {
    return this.__functionDefault2("createRadialGradient", ...argv);
  }
  createLinearGradient(...argv) {
    return this.__functionDefault2("createLinearGradient", ...argv);
  }

  lineJoin(argv) {
    return this.__functionDefault("lineJoin", argv);
  }
  lineCap(argv) {
    return this.__functionDefault("lineCap", argv);
  }
  shadowBlur(argv) {
    return this.__functionDefault("shadowBlur", argv);
  }
  shadowColor(argv) {
    return this.__functionDefault("shadowColor", argv);
  }
}

class fCanvas {
  static Element = MyElement;
  static constants = {
    angleMode: {
      0: "radial",
      1: "degress",
    },
    rectAlign: {
      0: "left",
      1: "center",
      2: "right",
    },
    rectBaseline: {
      0: "top",
      1: "middle",
      2: "bottom",
    },
    colorMode: {
      rgb: "rgb",
      hsl: "hsl",
      hue: "hue",
      hsb: "hsb",
    },
  };

  _ENV = {
    angleMode: 1,
    rectAlign: 0,
    rectBaseline: 0,
    colorMode: "rgb",

    rotate: 0,
    clear: true,
    loop: true,
  };

  preventTouch = false;
  stopTouch = false;
  touches = [];
  changedTouches = [];
  get mouseX() {
    return this.touches[0]?.x || null;
  }
  get mouseY() {
    return this.touches[0]?.y || null;
  }
  get interact() {
    return this.touches.length > 0;
  }

  static count = 0;

  _id = null;
  _el = document.createElement("canvas");

  constructor() {
    this._id = fCanvas.count++;

    const handlerEvent = (event) => {
      try {
        if (event.type !== "mouseout") {
          this.touches = getTouchInfo(this.$el, event.touches || [event]);
          this.changedTouches = getTouchInfo(
            this.$el,
            event.changedTouches || [event]
          );
        } else {
          this.touches = [];
        }
        this.preventTouch && event.preventDefault();
        this.stopTouch && event.stopPropagation();
      } catch (e) {
        throw e;
      }
    };

    this.$on(isMobile() ? "touchstart" : "mouseover", handlerEvent);
    this.$on(isMobile() ? "touchmove" : "mousemove", handlerEvent);
    this.$on(isMobile() ? "touchend" : "mouseout", handlerEvent);
  }

  _events = {};
  $on(name, callback) {
    if (name in this._events) {
      if (Array.isArray(this._events[name])) {
        this._events[name].push(callback);
      } else {
        this._events[name] = [callback];
      }
    } else {
      this._events[name] = callback;
    }

    this.$el.addEventListener(name, callback);
  }
  $off(name, callback) {
    if (name in this._events) {
      if (Array.isArray(this._events[name])) {
        this._events[name] = this._events[name].filter((item) => {
          if (item === callback) {
            this.$el.removeEventListener(name, item);
            return false;
          }
          return true;
        });
      } else {
        if (this._events[name] === callback) {
          this.$el.removeEventListener(name, this._events[name]);
          delete this._events[name];
        }
      }
    }
  }
  _moveEvent(toEl) {
    for (const name in this._events) {
      if (Array.isArray(this._events[name])) {
        this._events[name].forEach((item) => {
          toEl.addEventListener(name, item);
          this.$el.removeEventListener(name, item);
        });
      } else {
        toEl.addEventListener(name, this._events[name]);
        this.$el.removeEventListener(name, this._events[name]);
      }
    }
  }

  append(parent = document.body) {
    parent.appendChild(this.$el);
  }
  mount(query) {
    if (typeof query === "string") {
      query = document.querySelector(query) || this.$el;
    }

    [query.width, query.height] = [this.$el.width, this.$el.height];
    this._moveEvent(query);
    this._el = query;
  }

  noClear() {
    this._ENV.clear = false;
  }

  get $el() {
    return this._el;
  }
  _context2dCaching = null;
  get $context2d() {
    if (this._context2dCaching === null) {
      return (this._context2dCaching = this.$el.getContext("2d"));
    }

    return this._context2dCaching;
  }
  run(element) {
    element._run(this);
  }

  get width() {
    return this.$el.width;
  }
  set width(value) {
    this.$el.width = value;
  }
  get height() {
    return this.$el.height;
  }
  set height(value) {
    this.$el.height = value;
  }
  get windowWidth() {
    return windowSize.windowWidth.get();
  }
  get windowHeight() {
    return windowSize.windowHeight.get();
  }

  _methodMode(type, value) {
    if (!(type in this._ENV) || !(type in fCanvas.constants)) {
      console.warn(`${type}: This method mode don't install.`);
    } else {
      if (value === undefined) {
        return fCanvas.constants[type][this._ENV[type]];
      } else {
        let validate = false;
        for (const key in fCanvas.constants[type]) {
          if (
            fCanvas.constants[type][key].toLowerCase() === value.toLowerCase()
          ) {
            this._ENV[type] = key;
          }
          validate = true;
        }

        if (validate === false) {
          console.warn(`${type}: Value't is validate.`);
        }
      }
    }
  }

  _toRadius(value) {
    return this._ENV.angleMode == 0 ? (value * Math.PI) / 180 : value;
  }
  _toDegress(value) {
    return this._ENV.angleMode == 1 ? (value * 180) / Math.PI : value;
  }
  _toRgb([red = 0, green = red, blue = green, alpha = 1]) {
    if (Array.isArray(red)) {
      return this._toRgb(red);
    } else {
      if (typeof red === "string") {
        return red;
      } else {
        const after = fCanvas.constants.colorMode[this._ENV.colorMode].match(
          /hsl|hsb/i
        )
          ? "%"
          : "";

        return `${fCanvas.constants.colorMode[this._ENV.colorMode]}a(${[
          red,
          green + after,
          blue + after,
          alpha,
        ].join(",")})`;
      }
    }
  }
  _figureOffset(x, y, width, height) {
    switch (this._ENV.rectAlign) {
      case 1:
        x -= width / 2;
        break;
      case 2:
        x -= width;
        break;
    }
    switch (this._ENV.rectBaseline) {
      case 1:
        y -= height / 2;
        break;
      case 2:
        y -= height;
        break;
    }

    return [x, y];
  }

  angleMode(value) {
    return this._methodMode("angleMode", value);
  }
  rectAlign(value) {
    return this._methodMode("rectAlign", value);
  }
  colorMode(value) {
    return this._methodMode("colorMode", value);
  }
  rectBaseline(value) {
    return this._methodMode("rectBaseline", value);
  }

  fontSize(value) {
    const { size, weight, family } = fontToArray(this.font());

    if (value === undefined) {
      return size;
    } else {
      value = AutoToPx(value, size, size);
      this.font([weight, `${value}px`, family].join(" "));
    }
  }
  fontFamily(value) {
    const { size, weight, family } = fontToArray(this.font());

    if (value === undefined) {
      return family;
    } else {
      this.font([weight, `${size}px`, value].join(" "));
    }
  }
  fontWeight(value) {
    const { size, weight, family } = fontToArray(this.font());

    if (value === undefined) {
      return weight;
    } else {
      this.font([value, `${size}px`, family].join(" "));
    }
  }
  clear(x = 0, y = 0, w = this.width, h = this.height) {
    this.$context2d.clearRect(x, y, w, h);
  }
  background(...argv) {
    if (argv[0]?.constructor === HTMLImageElement) {
      this.$context2d.drawImage(argv[0], 0, 0, this.width, this.height);
    } else {
      this.$context2d.fillStyle = this._toRgb(argv);
      this.$context2d.fill();
      this.$context2d.fillRect(0, 0, this.width, this.height);
    }
  }
  toDataURL(...args) {
    this.$el.toDataURL(...args);
  }
  rotate(value) {
    if (value === undefined) {
      return this._ENV.rotate;
    } else {
      this.$context2d.rotate((this._ENV.rotate = this._toRadius(value)));
    }
  }
  resetTransform() {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }

  ready = true;
  _drawCallback = null;
  _setupCallback = null;
  async preload(callback) {
    this.ready = false;
    const result = await callback();
    this.ready = true;

    if (this._setupCallback) {
      setup(this._setupCallback, result);
    }
    if (this._drawCallback) {
      draw(this._drawCallback, this, result);
    }
  }
  setup(callback, argv) {
    if (this.ready) {
      setup(callback, argv);
    } else {
      this._setupCallback = callback;
    }
  }
  draw(callback, argv) {
    if (this.ready) {
      draw(callback, this, argv);
    } else {
      this._drawCallback = callback;
    }
  }

  __functionDefault(property, arg) {
    if (arg === undefined) {
      return this.$context2d[property];
    } else {
      this.$context2d[property] = arg;
    }
  }
  __functionDefault2(name, ...argv) {
    return this.$context2d[name](...argv);
  }

  font(argv) {
    return this.__functionDefault("font", argv);
  }
  textAlign(argv) {
    return this.__functionDefault("textAlign", argv);
  }
  textBaseline(argv) {
    return this.__functionDefault("textBaseline", argv);
  }
  globalOperation(argv) {
    return this.__functionDefault("globalCompositeOperation", argv);
  }

  translate(...argv) {
    this.__functionDefault2("translate", ...argv);
  }
  scale(...argv) {
    this.__functionDefault2("scale", ...argv);
  }
  clip(...argv) {
    this.__functionDefault2("clip", ...argv);
  }
  transform(...argv) {
    if (argv[0] instanceof DOMatrix) {
      const { a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = argv[0];
      this.$context2d.transform(a, b, c, d, e, f);
    } else {
      this.$context2d.transform(...argv);
    }
  }
  setTransform(...argv) {
    if (argv[0] instanceof DOMatrix) {
      const { a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = argv[0];
      this.$context2d.setTransform(a, b, c, d, e, f);
    } else {
      this.$context2d.setTransform(...argv);
    }
  }

  sin(deg) {
    return Math.sin(this._toRadius(deg));
  }
  asin(...argv) {
    return this._toDegress(Math.asin(...argv));
  }
  cos(deg) {
    return Math.cos(this._toRadius(deg));
  }
  acos(...argv) {
    return this._toDegress(Math.acos(...argv));
  }
  tan(deg) {
    return Math.tan(this._toRadius(deg));
  }
  atan(...argv) {
    return this._toDegress(Math.atan(...argv));
  }
  tan2(deg) {
    return Math.tan2(this._toRadius(deg));
  }
  atan2(...argv) {
    return this._toDegress(Math.atan2(...argv));
  }

  _store = {
    cursor: "auto",
  };
  cursor() {
    this.$el.style.cursor = this._store.cursor;
  }
  noCursor() {
    this._store.cursor = this.$el.style.cursor || "auto";
    this.$el.style.cursor = "none";
  }
  loop() {
    this._ENV.loop = true;
  }
  noLoop() {
    this._ENV.loop = false;
  }
  keyPressed(callback) {
    this.$on("keypress", callback);

    return {
      off: () => {
        this.$off("keypress", callback);
      },
    };
  }
  mouseIn(callback) {
    this.$on("mouseover", callback);

    return {
      off: () => {
        this.$off("mouseover", callback);
      },
    };
  }
  mouseOut(callback) {
    this.$on("mouseout", callback);

    return {
      off: () => {
        this.$off("mouseout", callback);
      },
    };
  }
  mouseDowned(callback) {
    this.$on("mousedown", callback);

    return {
      off: () => {
        this.$off("mousedown", callback);
      },
    };
  }
  touchStarted(callback) {
    this.$on("touchstart", callback);

    return {
      off: () => {
        this.$off("touchstart", callback);
      },
    };
  }
  touchMoved(callback) {
    this.$on("touchmove", callback);

    return {
      off: () => {
        this.$off("touchmove", callback);
      },
    };
  }
  touchEned(callback) {
    this.$on("touchend", callback);

    return {
      off: () => {
        this.$off("touchend", callback);
      },
    };
  }
  mouseMoved(callback) {
    this.$on("mousemove", callback);

    return {
      off: () => {
        this.$off("mousemove", callback);
      },
    };
  }
  mouseUped(callback) {
    this.$on("mouseup", callback);

    return {
      off: () => {
        this.$off("mouseup", callback);
      },
    };
  }
  mouseClicked(callback) {
    this.$on("click", callback);

    return {
      off: () => {
        this.$off("click", callback);
      },
    };
  }
}

function bindEvent(name, callback, element) {
  element.addEventListener(name, callback);
  return {
    off() {
      element.removeEventListener(name, callback);
    },
  };
}

export const Emitter = _Emitter;

let inited = false;
const emitter = new Emitter();

export function setup(callback, argv) {
  if (document.readyState === "complete") {
    //// readyState === "complete"

    inited = true;
    emitter.emit("load");
    callback(argv);
  } else {
    function load() {
      document.removeEventListener("DOMContentLoaded", load);
      window.removeEventListener("load", load);

      inited = true;
      emitter.emit("load");
      callback(argv);
    }

    document.addEventListener("DOMContentLoaded", load);
    window.addEventListener("load", load);
  }
}
export function draw(callback, canvas, argv) {
  if (inited) {
    if (canvas?._ENV.clear === true) {
      canvas.clear();
    }
    callback(argv);
    if (!canvas || canvas?._ENV.loop === true) {
      requestAnimationFrame(() => draw(callback, canvas, argv));
    }
  } else {
    emitter.once("load", () => {
      draw(callback, canvas, argv);
    });
  }
}
export function keyPressed(callback, element = window) {
  return bindEvent("keypress", callback, element);
}
export function changeSize(callback, element = window) {
  return bindEvent("resize", callback, element);
}
export function mouseWheel(callback, element = window) {
  return bindEvent("wheel", callback, element);
}
export function mousePressed(callback, element = window) {
  return bindEvent("mousedown", callback, element);
}
export function mouseClicked(callback, element = window) {
  return bindEvent("click", callback, element);
}
export function mouseMoved(callback, element = window) {
  return bindEvent("mousemove", callback, element);
}
export function touchStarted(callback, element = window) {
  return bindEvent("touchstart", callback, element);
}
export function touchMoved(callback, element = window) {
  return bindEvent("touchmove", callback, element);
}
export function touchEnded(callback, element = window) {
  return bindEvent("touchend", callback, element);
}

export default fCanvas;
export * from "./methods/index.js";
