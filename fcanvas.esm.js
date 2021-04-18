function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var defineProperty = createCommonjsModule(function (module) {
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  module.exports = _defineProperty;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var _defineProperty = unwrapExports(defineProperty);

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (e) {
  setTimeout(e, 100 / 6);
};
let supportPassive = false;

try {
  let opts = Object.defineProperty({}, "passive", {
    get: function () {
      supportPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}
const windowSize = {
  windowWidth: {
    get: () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  },
  windowHeight: {
    get: () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
};
function trim(string) {
  if (string == null) {
    return null;
  } else {
    return string.replace(/^\s+|\s+$/g, "");
  }
}
function fontToArray(font) {
  const _font = font.split(" ");

  if (_font.length === 2) {
    return {
      size: parseFloat(_font[0]),
      family: trim(_font[1]),
      weight: "normal"
    };
  }

  if (_font.length === 3) {
    return {
      size: parseFloat(_font[1]),
      family: trim(_font[2]),
      weight: trim(_font[0])
    };
  }
}
function AutoToPx(string, fi, fontSize) {
  if (typeof string == "string") {
    string = trim(string);
    const number = parseFloat(string);
    const dp = (string.match(/[a-z%]+$/i) || [, "px"])[1];

    switch (dp) {
      case "px":
        return number;

      case "em":
        return fontSize * number;

      case "rem":
        return fontSize * 16;

      case "vw":
        return windowSize.windowWidth * number / 100;

      case "vh":
        return windowSize.windowHeight * number / 100;

      case "vmin":
        return Math.min(windowSize.windowWidth, windowSize.windowHeight) * number / 100;

      case "vmax":
        return Math.max(windowSize.windowWidth, windowSize.windowHeight) * number / 100;

      case "%":
        return fi / 100 * number;

      default:
        return number;
    }
  } else {
    return string + "";
  }
}
function getTouchInfo(element, touches) {
  const rect = element.getBoundingClientRect();
  const sx = element.scrollWidth / element.width || 1;
  const sy = element.scrollHeight / element.height || 1;
  const _touches = [],
        length = touches.length;
  let i = 0,
      touch;

  while (i < length) {
    touch = touches[i++];

    _touches.push({
      x: (touch.clientX - rect.left) / sx,
      y: (touch.clientY - rect.top) / sy,
      winX: touch.clientX,
      winY: touch.clientY,
      id: touch.identifier
    });
  }

  return _touches;
}
function isMobile() {
  /// code from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  let check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
}

class Emitter$1 {
  constructor() {
    _defineProperty(this, "__events", []);
  }

  on(name, callback) {
    if (typeof callback === "function") {
      if (name in this.__events) {
        this.__events[name].push(callback);
      } else {
        this.__events[name] = [callback];
      }
    }
  }

  off(name, callback) {
    if (callback) {
      this.__events[name] = this.__events[name].filter(item => item !== callback);

      if (this.__events[name].length === 0) {
        delete this.__events[name];
      }
    } else {
      delete this.__events[name];
    }
  }

  emit(name, payload) {
    if (name in this.__events) {
      for (let index = 0, length = this.__events[name].length; index < length; index++) {
        this.__events[name][index](payload);
      }
    }
  }

  once(name, callback) {
    const handler = (...args) => {
      callback(...args);
      this.off(name, handler);
    };

    this.on(name, handler);
  }

}

const DOMatrix$1 = window.DOMMatrix || window.WebkitDOMMatix || class {
  constructor(css) {
    _defineProperty(this, "a", 1);

    _defineProperty(this, "b", 0);

    _defineProperty(this, "c", 0);

    _defineProperty(this, "d", 1);

    _defineProperty(this, "e", 0);

    _defineProperty(this, "f", 0);

    const vnode = document.createElement("div");
    vnode.style.opacity = 0;
    vnode.style.position = "fixed";
    vnode.style.top = vnode.style.left = -9e99 + "px";
    vnode.style[TRANSFORM_Prop] = css;
    document.documentElement.appendChild(vnode);
    let transform = getComputedStyle(vnode)[TRANSFORM_Prop];
    if (transform == "none") transform = "1, 0, 0, 1, 0, 0";
    transform = transform.replace(/^(?:matrix3d|matrix)\(|\s|\)$/g, "").split(",").map(e => +e);
    document.documentElement.removeChild(vnode);
    transform._isMatrix = true;
    [this.a, this.b, this.c, this.d, this.e, this.f] = transform;
  }

};

function calculateRemainder2D(xComponent, yComponent) {
  if (xComponent !== 0) {
    this.x = this.x % xComponent;
  }

  if (yComponent !== 0) {
    this.y = this.y % yComponent;
  }

  return this;
}

function calculateRemainder3D(xComponent, yComponent, zComponent) {
  if (xComponent !== 0) {
    this.x = this.x % xComponent;
  }

  if (yComponent !== 0) {
    this.y = this.y % yComponent;
  }

  if (zComponent !== 0) {
    this.z = this.z % zComponent;
  }

  return this;
}

class Vector {
  constructor(x = 0, y = 0, z = 0) {
    [this.x, this.y, this.z] = [x, y, z];
  }

  set(x, y, z) {
    if (x instanceof Vector) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
      return this;
    }

    if (x instanceof Array) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
      return this;
    }

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    return this;
  }

  copy() {
    return new Vector([this.x, this.y, this.z]);
  }

  add(x, y, z) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      this.z += x.z || 0;
      return this;
    }

    if (x instanceof Array) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      this.z += x[2] || 0;
      return this;
    }

    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
  }

  rem(x, y, z) {
    if (x instanceof Vector) {
      if (Number.isFinite(x.x) && Number.isFinite(x.y) && Number.isFinite(x.z)) {
        var xComponent = parseFloat(x.x);
        var yComponent = parseFloat(x.y);
        var zComponent = parseFloat(x.z);
        calculateRemainder3D.call(this, xComponent, yComponent, zComponent);
      }
    } else if (x instanceof Array) {
      if (x.every(function (element) {
        return Number.isFinite(element);
      })) {
        if (x.length === 2) {
          calculateRemainder2D.call(this, x[0], x[1]);
        }

        if (x.length === 3) {
          calculateRemainder3D.call(this, x[0], x[1], x[2]);
        }
      }
    } else if (arguments.length === 1) {
      if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
        this.x = this.x % arguments[0];
        this.y = this.y % arguments[0];
        this.z = this.z % arguments[0];
        return this;
      }
    } else if (arguments.length === 2) {
      var vectorComponents = [].slice.call(arguments);

      if (vectorComponents.every(function (element) {
        return Number.isFinite(element);
      })) {
        if (vectorComponents.length === 2) {
          calculateRemainder2D.call(this, vectorComponents[0], vectorComponents[1]);
        }
      }
    } else if (arguments.length === 3) {
      var _vectorComponents = [].slice.call(arguments);

      if (_vectorComponents.every(function (element) {
        return Number.isFinite(element);
      })) {
        if (_vectorComponents.length === 3) {
          calculateRemainder3D.call(this, _vectorComponents[0], _vectorComponents[1], _vectorComponents[2]);
        }
      }
    }
  }

  sub(x, y, z) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      this.z -= x.z || 0;
      return this;
    }

    if (x instanceof Array) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      this.z -= x[2] || 0;
      return this;
    }

    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }

  div(n) {
    if (n === 0) {
      console.warn("div:", "divide by 0");
      return this;
    }

    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  }

  mag() {
    return Math.sqrt(this.magSq());
  }

  magSq() {
    const {
      x,
      y,
      z
    } = this;
    return x * x + y * y + z * z;
  }

  dot(x, y, z) {
    if (x instanceof Vector) {
      return this.dot(x.x, x.y, x.z);
    }

    return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
  }

  cross(v) {
    var x = this.y * v.z - this.z * v.y;
    var y = this.z * v.x - this.x * v.z;
    var z = this.x * v.y - this.y * v.x;
    return new Vector([x, y, z]);
  }

  normalize() {
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  limit(max) {
    const mSq = this.magSq();

    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)) //normalize it
      .mult(max);
    }

    return this;
  }

  setMag(n) {
    return this.normalize().mult(n);
  }

  heading() {
    return getDeg(Math.atan2(this.y, this.x));
  }

  rotate(a) {
    var newHeading = getRadius(this.heading() + a);
    var mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }

  angleBetween(v) {
    var dotmagmag = this.dot(v) / (this.mag() * v.mag());
    var angle;
    angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    angle = angle * Math.sign(this.cross(v).z || 1);
    return getDeg(angle);
  }

  lerp(x, y, z, amt) {
    if (x instanceof Vector) {
      return this.lerp(x.x, x.y, x.z, y);
    }

    this.x += (x - this.x) * amt || 0;
    this.y += (y - this.y) * amt || 0;
    this.z += (z - this.z) * amt || 0;
    return this;
  }

  reflect(surfaceNormal) {
    surfaceNormal.normalize();
    return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
  }

  array() {
    return [this.x || 0, this.y || 0, this.z || 0];
  }

  equals(x, y, z) {
    var a, b, c;

    if (x instanceof Vector) {
      a = x.x || 0;
      b = x.y || 0;
      c = x.z || 0;
    } else if (x instanceof Array) {
      a = x[0] || 0;
      b = x[1] || 0;
      c = x[2] || 0;
    } else {
      a = x || 0;
      b = y || 0;
      c = z || 0;
    }

    return this.x === a && this.y === b && this.z === c;
  }

  toString() {
    return "Vector: [" + this.array().join(", ") + "]";
  }

}

function CircleImpact(e, f) {
  return (f.x - e.x) ** 2 + (f.y - e.y) ** 2 < (e.radius + f.radius) ** 2;
}
function CircleImpactPoint(e, x, y) {
  return (x - e.x) ** 2 + (y - e.y) ** 2 < e.radius ** 2;
}
function CircleImpactRect(box, sphere) {
  const x = Math.max(box.x, Math.min(sphere.x, box.x + box.width));
  const y = Math.max(box.y, Math.min(sphere.y, box.y + box.height));
  const distance = (x - sphere.x) * (x - sphere.x) + (y - sphere.y) * (y - sphere.y);
  return distance < sphere.radius ** 2;
}
function constrain(value, min, max) {
  return Math.min(Math.max(min, value), max);
}
function createMatrix(css) {
  const {
    a,
    b,
    c,
    d,
    e,
    f
  } = new DOMatrix$1(css);
  return [a, b, c, d, e, f];
}
function createVector(...argv) {
  return new Vector(...argv);
}
function loadImage(src) {
  const img = new Image();
  img.src = src;
  return new Promise((resolve, reject) => {
    function loaded() {
      resolve(img);
      img.removeEventListener("load", loaded);
    }

    function error() {
      reject(err);
      img.removeEventListener("error", error);
    }

    img.addEventListener("load", loaded);
    img.addEventListener("error", error);
  });
}
function map(a, b, c, d, e) {
  return (a - b) * (e - d) / (c - b) + d;
}
function random(...args) {
  if (args.length === 1) {
    return args[0] != null && "length" in args[0] ? args[0][Math.floor(Math.random() * args[0].length)] : Math.random() * args[0];
  }

  if (args.length === 2) {
    return args[0] + Math.random() * (args[1] - args[0]);
  }
}
function range($start, $end, $step) {
  $step = $step || 1;
  const arr = [];
  let isChar = false;
  if ($end === undefined) $end = $start, $start = 1;

  if (typeof $start == "string") {
    $start = $start.charCodeAt(0);
    $end = $end.charCodeAt(0);
    isChar = true;
  }

  if ($start !== $end && Math.abs($end - $start) < Math.abs($step)) throw new Error("range(): step exceeds the specified range.");

  if ($end > $start) {
    $step < 0 && ($step *= -1);

    while ($start <= $end) {
      arr.push(isChar ? String.fromCharCode($start) : $start);
      $start += $step;
    }
  } else {
    $step > 0 && ($step *= -1);

    while ($start >= $end) {
      arr.push(isChar ? String.fromCharCode($start) : $start);
      $start += $step;
    }
  }

  return arr;
}
function RectImpact(a, b) {
  return a.x <= b.x + b.width && a.x + a.width >= b.x && a.y <= b.y + b.height && a.y + a.height >= b.y;
}
function RectImpactPoint(e, x, y) {
  return e.x < x && e.x + e.width > x && e.y < y && e.y + e.height > y;
}

class MyElement {
  constructor(canvas) {
    _defineProperty(this, "_els", []);

    _defineProperty(this, "_idActiveNow", null);

    _defineProperty(this, "_queue", []);

    _defineProperty(this, "hypot", typeof Math.hypot === "function" ? Math.hypot : (...args) => {
      const len = args.length;
      let i = 0,
          result = 0;

      while (i < len) result += Math.pow(args[i++], 2);

      return Math.sqrt(result);
    });

    if (canvas === undefined) {
      const canvas = new fCanvas();

      this._els.push(canvas);
    } else {
      if (canvas instanceof fCanvas) {
        this.bind(canvas);
      } else {
        const canvas = new fCanvas();

        this._els.push(canvas);

        console.error("fCanvas: super() in MyElement.constructor not's fCanvas element.");
      }
    }
  }

  get $el() {
    return this.pcanvas.$el;
  }

  _run(canvas) {
    this.bind(canvas);
    this._idActiveNow = canvas._id;

    if (typeof this.update === "function") {
      this.update();
    } else if (typeof this.draw === "function") {
      this.draw();
    }

    if (this._queue.length > 0) {
      for (let index = 0, length = this._queue.length; index < length; index++) {
        this.run(this._queue[index]);
      }
    }

    this._idActiveNow = null;
  }

  addQueue(canvasElement) {
    if (canvasElement instanceof MyElement) {
      this._queue.push(canvasElement);
    } else {
      console.error(`fCanvas: the parameter passed to MyElement.addQueue() must be a fCanvas object.`);
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
    return this._els.some(item => item._id === id);
  }

  get pcanvas() {
    const canvas = this._idActiveNow === null ? this._els[this._els.length - 1] : this._els.find(item => item._id === this._idActiveNow);

    if (canvas instanceof fCanvas) {
      return canvas;
    } else {
      console.warn("fCanvas: The current referenced version of the fCanvas.run function is incorrect.");
      return this._els[0];
    }
  }

  bind(canvas) {
    if (canvas instanceof fCanvas) {
      if (this.has(canvas._id) === false) {
        this._els.push(canvas);
      }
    } else {
      console.error("fCanvas: the parameter passed to MyElement.bind() must be a fCanvas object.");
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
        y: this.$context2d.shadowOffsetY
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
    this.$context2d.arc(c, t, e, this._toRadius(i) - Math.PI / 2, this._toRadius(n) - Math.PI / 2, o);
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
    this.$context2d.ellipse(c, t, e, i, this._toRadius(n) - Math.PI / 2, this._toRadius(o), r === undefined ? !1 : r);
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
      const arc = [AutoToPx($1, w), AutoToPx($2, h), AutoToPx($3, w), AutoToPx($4, h)];
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
  get mouseX() {
    var _this$touches$;

    return ((_this$touches$ = this.touches[0]) === null || _this$touches$ === void 0 ? void 0 : _this$touches$.x) || null;
  }

  get mouseY() {
    var _this$touches$2;

    return ((_this$touches$2 = this.touches[0]) === null || _this$touches$2 === void 0 ? void 0 : _this$touches$2.y) || null;
  }

  get interact() {
    return this.touches.length > 0;
  }

  constructor() {
    _defineProperty(this, "_ENV", {
      angleMode: 1,
      rectAlign: 0,
      rectBaseline: 0,
      colorMode: "rgb",
      rotate: 0,
      clear: true,
      loop: true
    });

    _defineProperty(this, "preventTouch", false);

    _defineProperty(this, "stopTouch", false);

    _defineProperty(this, "touches", []);

    _defineProperty(this, "changedTouches", []);

    _defineProperty(this, "_id", null);

    _defineProperty(this, "_el", document.createElement("canvas"));

    _defineProperty(this, "_events", {});

    _defineProperty(this, "_context2dCaching", null);

    _defineProperty(this, "ready", true);

    _defineProperty(this, "_drawCallback", null);

    _defineProperty(this, "_setupCallback", null);

    _defineProperty(this, "_store", {
      cursor: "auto"
    });

    this._id = fCanvas.count++;

    const handlerEvent = event => {
      try {
        this.touches = getTouchInfo(this.$el, event.touches || [event]);
        this.changedTouches = getTouchInfo(this.$el, event.changedTouches || [event]);
        this.preventTouch && event.preventDefault();
        this.stopTouch && event.stopPropagation();
      } catch (e) {
        throw e;
      }
    };

    this.$on(isMobile() ? "touchstart" : "mousedown", handlerEvent);
    this.$on(isMobile() ? "touchmove" : "mousemove", handlerEvent);
    this.$on(isMobile() ? "touchend" : "mouseup", handlerEvent);
  }

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
        this._events[name] = this._events[name].filter(item => {
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
        this._events[name].forEach(item => {
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

  get $context2d() {
    if (this._context2dCaching === null) {
      return this._context2dCaching = this.$el.getContext("2d");
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
          if (fCanvas.constants[type][key].toLowerCase() === value.toLowerCase()) {
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
    return this._ENV.angleMode == 0 ? value * Math.PI / 180 : value;
  }

  _toDegress(value) {
    return this._ENV.angleMode == 1 ? value * 180 / Math.PI : value;
  }

  _toRgb([red = 0, green = red, blue = green, alpha = 1]) {
    if (Array.isArray(red)) {
      return this._toRgb(red);
    } else {
      if (typeof red === "string") {
        return red;
      } else {
        const after = fCanvas.constants.colorMode[this._ENV.colorMode].match(/hsl|hsb/i) ? "%" : "";
        return `${fCanvas.constants.colorMode[this._ENV.colorMode]}a(${[red, green + after, blue + after, alpha].join(",")})`;
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
    const {
      size,
      weight,
      family
    } = fontToArray(this.font());

    if (value === undefined) {
      return size;
    } else {
      value = AutoToPx(value, size, size);
      this.font([weight, `${value}px`, family].join(" "));
    }
  }

  fontFamily(value) {
    const {
      size,
      weight,
      family
    } = fontToArray(this.font());

    if (value === undefined) {
      return family;
    } else {
      this.font([weight, `${size}px`, value].join(" "));
    }
  }

  fontWeight(value) {
    const {
      size,
      weight,
      family
    } = fontToArray(this.font());

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
    var _argv$;

    if (((_argv$ = argv[0]) === null || _argv$ === void 0 ? void 0 : _argv$.constructor) === HTMLImageElement) {
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
      this.$context2d.rotate(this._ENV.rotate = this._toRadius(value));
    }
  }

  resetTransform() {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }

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
      const {
        a = 1,
        b = 0,
        c = 0,
        d = 1,
        e = 0,
        f = 0
      } = argv[0];
      this.$context2d.transform(a, b, c, d, e, f);
    } else {
      this.$context2d.transform(...argv);
    }
  }

  setTransform(...argv) {
    if (argv[0] instanceof DOMatrix) {
      const {
        a = 1,
        b = 0,
        c = 0,
        d = 1,
        e = 0,
        f = 0
      } = argv[0];
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
      }
    };
  }

  mouseIn(callback) {
    this.$on("mouseover", callback);
    return {
      off: () => {
        this.$off("mouseover", callback);
      }
    };
  }

  mouseOut(callback) {
    this.$on("mouseout", callback);
    return {
      off: () => {
        this.$off("mouseout", callback);
      }
    };
  }

  mouseDowned(callback) {
    this.$on("mousedown", callback);
    return {
      off: () => {
        this.$off("mousedown", callback);
      }
    };
  }

  touchStarted(callback) {
    this.$on("touchstart", callback);
    return {
      off: () => {
        this.$off("touchstart", callback);
      }
    };
  }

  touchMoved(callback) {
    this.$on("touchmove", callback);
    return {
      off: () => {
        this.$off("touchmove", callback);
      }
    };
  }

  touchEned(callback) {
    this.$on("touchend", callback);
    return {
      off: () => {
        this.$off("touchend", callback);
      }
    };
  }

  mouseMoved(callback) {
    this.$on("mousemove", callback);
    return {
      off: () => {
        this.$off("mousemove", callback);
      }
    };
  }

  mouseUped(callback) {
    this.$on("mouseup", callback);
    return {
      off: () => {
        this.$off("mouseup", callback);
      }
    };
  }

  mouseClicked(callback) {
    this.$on("click", callback);
    return {
      off: () => {
        this.$off("click", callback);
      }
    };
  }

}

_defineProperty(fCanvas, "Element", MyElement);

_defineProperty(fCanvas, "constants", {
  angleMode: {
    0: "radial",
    1: "degress"
  },
  rectAlign: {
    0: "left",
    1: "center",
    2: "right"
  },
  rectBaseline: {
    0: "top",
    1: "middle",
    2: "bottom"
  },
  colorMode: {
    rgb: "rgb",
    hsl: "hsl",
    hue: "hue",
    hsb: "hsb"
  }
});

_defineProperty(fCanvas, "count", 0);

function bindEvent(name, callback, element) {
  element.addEventListener(name, callback);
  return {
    off() {
      element.removeEventListener(name, callback);
    }

  };
}

const Emitter = Emitter$1;
let inited = false;
const emitter = new Emitter();
function setup(callback, argv) {
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
function draw(callback, canvas, argv) {
  if (inited) {
    if ((canvas === null || canvas === void 0 ? void 0 : canvas._ENV.clear) === true) {
      canvas.clear();
    }

    callback(argv);

    if (!canvas || (canvas === null || canvas === void 0 ? void 0 : canvas._ENV.loop) === true) {
      requestAnimationFrame(() => draw(callback, canvas, argv));
    }
  } else {
    emitter.once("load", () => {
      draw(callback, canvas, argv);
    });
  }
}
function keyPressed(callback, element = window) {
  return bindEvent("keypress", callback, element);
}
function changeSize(callback, element = window) {
  return bindEvent("resize", callback, element);
}
function mouseWheel(callback, element = window) {
  return bindEvent("wheel", callback, element);
}
function mousePressed(callback, element = window) {
  return bindEvent("mousedown", callback, element);
}
function mouseClicked(callback, element = window) {
  return bindEvent("click", callback, element);
}
function mouseMoved(callback, element = window) {
  return bindEvent("mousemove", callback, element);
}
function touchStarted(callback, element = window) {
  return bindEvent("touchstart", callback, element);
}
function touchMoved(callback, element = window) {
  return bindEvent("touchmove", callback, element);
}
function touchEnded(callback, element = window) {
  return bindEvent("touchend", callback, element);
}

export default fCanvas;
export { CircleImpact, CircleImpactPoint, CircleImpactRect, Emitter, RectImpact, RectImpactPoint, changeSize, constrain, createMatrix, createVector, draw, keyPressed, loadImage, map, mouseClicked, mouseMoved, mousePressed, mouseWheel, random, range, setup, touchEnded, touchMoved, touchStarted };
