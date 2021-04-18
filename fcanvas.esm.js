function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (e) {
  setTimeout(e, 100 / 6);
};
var supportPassive = false;

try {
  var opts = Object.defineProperty({}, "passive", {
    get: function get() {
      supportPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}
var windowSize = {
  windowWidth: {
    get: function get() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
  },
  windowHeight: {
    get: function get() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
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
  var _font = font.split(" ");

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
    var number = parseFloat(string);
    var dp = (string.match(/[a-z%]+$/i) || [, "px"])[1];

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
  var rect = element.getBoundingClientRect();
  var sx = element.scrollWidth / element.width || 1;
  var sy = element.scrollHeight / element.height || 1;
  var _touches = [],
      length = touches.length;
  var i = 0,
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
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
}

var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    _defineProperty(this, "__events", []);
  }

  _createClass(Emitter, [{
    key: "on",
    value: function on(name, callback) {
      if (typeof callback === "function") {
        if (name in this.__events) {
          this.__events[name].push(callback);
        } else {
          this.__events[name] = [callback];
        }
      }
    }
  }, {
    key: "off",
    value: function off(name, callback) {
      if (callback) {
        this.__events[name] = this.__events[name].filter(function (item) {
          return item !== callback;
        });

        if (this.__events[name].length === 0) {
          delete this.__events[name];
        }
      } else {
        delete this.__events[name];
      }
    }
  }, {
    key: "emit",
    value: function emit(name, payload) {
      if (name in this.__events) {
        for (var index = 0, length = this.__events[name].length; index < length; index++) {
          this.__events[name][index](payload);
        }
      }
    }
  }]);

  return Emitter;
}();

var DOMatrix$1 = window.DOMMatrix || window.WebkitDOMMatix || /*#__PURE__*/function () {
  function _class2(css) {
    _classCallCheck(this, _class2);

    _defineProperty(this, "a", 1);

    _defineProperty(this, "b", 0);

    _defineProperty(this, "c", 0);

    _defineProperty(this, "d", 1);

    _defineProperty(this, "e", 0);

    _defineProperty(this, "f", 0);

    var vnode = document.createElement("div");
    vnode.style.opacity = 0;
    vnode.style.position = "fixed";
    vnode.style.top = vnode.style.left = -9e99 + "px";
    vnode.style[TRANSFORM_Prop] = css;
    document.documentElement.appendChild(vnode);
    var transform = getComputedStyle(vnode)[TRANSFORM_Prop];
    if (transform == "none") transform = "1, 0, 0, 1, 0, 0";
    transform = transform.replace(/^(?:matrix3d|matrix)\(|\s|\)$/g, "").split(",").map(function (e) {
      return +e;
    });
    document.documentElement.removeChild(vnode);
    transform._isMatrix = true;
    var _transform = transform;

    var _transform2 = _slicedToArray(_transform, 6);

    this.a = _transform2[0];
    this.b = _transform2[1];
    this.c = _transform2[2];
    this.d = _transform2[3];
    this.e = _transform2[4];
    this.f = _transform2[5];
  }

  return _class2;
}();

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

var Vector = /*#__PURE__*/function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Vector);

    var _ref = [x, y, z];
    this.x = _ref[0];
    this.y = _ref[1];
    this.z = _ref[2];
  }

  _createClass(Vector, [{
    key: "set",
    value: function set(x, y, z) {
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
  }, {
    key: "copy",
    value: function copy() {
      return new Vector([this.x, this.y, this.z]);
    }
  }, {
    key: "add",
    value: function add(x, y, z) {
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
  }, {
    key: "rem",
    value: function rem(x, y, z) {
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
  }, {
    key: "sub",
    value: function sub(x, y, z) {
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
  }, {
    key: "mult",
    value: function mult(n) {
      this.x *= n;
      this.y *= n;
      this.z *= n;
      return this;
    }
  }, {
    key: "div",
    value: function div(n) {
      if (n === 0) {
        console.warn("div:", "divide by 0");
        return this;
      }

      this.x /= n;
      this.y /= n;
      this.z /= n;
      return this;
    }
  }, {
    key: "mag",
    value: function mag() {
      return Math.sqrt(this.magSq());
    }
  }, {
    key: "magSq",
    value: function magSq() {
      var x = this.x,
          y = this.y,
          z = this.z;
      return x * x + y * y + z * z;
    }
  }, {
    key: "dot",
    value: function dot(x, y, z) {
      if (x instanceof Vector) {
        return this.dot(x.x, x.y, x.z);
      }

      return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
    }
  }, {
    key: "cross",
    value: function cross(v) {
      var x = this.y * v.z - this.z * v.y;
      var y = this.z * v.x - this.x * v.z;
      var z = this.x * v.y - this.y * v.x;
      return new Vector([x, y, z]);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var len = this.mag();
      if (len !== 0) this.mult(1 / len);
      return this;
    }
  }, {
    key: "limit",
    value: function limit(max) {
      var mSq = this.magSq();

      if (mSq > max * max) {
        this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
      }

      return this;
    }
  }, {
    key: "setMag",
    value: function setMag(n) {
      return this.normalize().mult(n);
    }
  }, {
    key: "heading",
    value: function heading() {
      return getDeg(Math.atan2(this.y, this.x));
    }
  }, {
    key: "rotate",
    value: function rotate(a) {
      var newHeading = getRadius(this.heading() + a);
      var mag = this.mag();
      this.x = Math.cos(newHeading) * mag;
      this.y = Math.sin(newHeading) * mag;
      return this;
    }
  }, {
    key: "angleBetween",
    value: function angleBetween(v) {
      var dotmagmag = this.dot(v) / (this.mag() * v.mag());
      var angle;
      angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
      angle = angle * Math.sign(this.cross(v).z || 1);
      return getDeg(angle);
    }
  }, {
    key: "lerp",
    value: function lerp(x, y, z, amt) {
      if (x instanceof Vector) {
        return this.lerp(x.x, x.y, x.z, y);
      }

      this.x += (x - this.x) * amt || 0;
      this.y += (y - this.y) * amt || 0;
      this.z += (z - this.z) * amt || 0;
      return this;
    }
  }, {
    key: "reflect",
    value: function reflect(surfaceNormal) {
      surfaceNormal.normalize();
      return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
    }
  }, {
    key: "array",
    value: function array() {
      return [this.x || 0, this.y || 0, this.z || 0];
    }
  }, {
    key: "equals",
    value: function equals(x, y, z) {
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
  }, {
    key: "toString",
    value: function toString() {
      return "Vector: [" + this.array().join(", ") + "]";
    }
  }]);

  return Vector;
}();

function CircleImpact(e, f) {
  return Math.pow(f.x - e.x, 2) + Math.pow(f.y - e.y, 2) < Math.pow(e.radius + f.radius, 2);
}
function CircleImpactPoint(e, x, y) {
  return Math.pow(x - e.x, 2) + Math.pow(y - e.y, 2) < Math.pow(e.radius, 2);
}
function CircleImpactRect(box, sphere) {
  var x = Math.max(box.x, Math.min(sphere.x, box.x + box.width));
  var y = Math.max(box.y, Math.min(sphere.y, box.y + box.height));
  var distance = (x - sphere.x) * (x - sphere.x) + (y - sphere.y) * (y - sphere.y);
  return distance < Math.pow(sphere.radius, 2);
}
function constrain(value, min, max) {
  return Math.min(Math.max(min, value), max);
}
function createMatrix(css) {
  var _DOMMatrix = new DOMatrix$1(css),
      a = _DOMMatrix.a,
      b = _DOMMatrix.b,
      c = _DOMMatrix.c,
      d = _DOMMatrix.d,
      e = _DOMMatrix.e,
      f = _DOMMatrix.f;

  return [a, b, c, d, e, f];
}
function createVector() {
  for (var _len = arguments.length, argv = new Array(_len), _key = 0; _key < _len; _key++) {
    argv[_key] = arguments[_key];
  }

  return _construct(Vector, argv);
}
function loadImage(src) {
  var img = new Image();
  img.src = src;
  return new Promise(function (resolve, reject) {
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
function random() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args.length === 1) {
    return args[0] != null && "length" in args[0] ? args[0][Math.floor(Math.random() * args[0].length)] : Math.random() * args[0];
  }

  if (args.length === 2) {
    return args[0] + Math.random() * (args[1] - args[0]);
  }
}
function range($start, $end, $step) {
  $step = $step || 1;
  var arr = [];
  var isChar = false;
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

var MyElement = /*#__PURE__*/function () {
  function MyElement(canvas) {
    _classCallCheck(this, MyElement);

    _defineProperty(this, "_els", []);

    _defineProperty(this, "_idActiveNow", null);

    _defineProperty(this, "_queue", []);

    _defineProperty(this, "hypot", typeof Math.hypot === "function" ? Math.hypot : function () {
      var len = arguments.length;
      var i = 0,
          result = 0;

      while (i < len) {
        var _i;

        result += Math.pow((_i = i++, _i < 0 || arguments.length <= _i ? undefined : arguments[_i]), 2);
      }

      return Math.sqrt(result);
    });

    if (canvas === undefined) {
      var _canvas = new fCanvas();

      this._els.push(_canvas);
    } else {
      if (canvas instanceof fCanvas) {
        this.bind(canvas);
      } else {
        var _canvas2 = new fCanvas();

        this._els.push(_canvas2);

        console.error("fCanvas: super() in MyElement.constructor not's fCanvas element.");
      }
    }
  }

  _createClass(MyElement, [{
    key: "$el",
    get: function get() {
      return this.pcanvas.$el;
    }
  }, {
    key: "_run",
    value: function _run(canvas) {
      this.bind(canvas);
      this._idActiveNow = canvas._id;

      if (typeof this.update === "function") {
        this.update();
      } else if (typeof this.draw === "function") {
        this.draw();
      }

      if (this._queue.length > 0) {
        for (var index = 0, length = this._queue.length; index < length; index++) {
          this.run(this._queue[index]);
        }
      }

      this._idActiveNow = null;
    }
  }, {
    key: "addQueue",
    value: function addQueue(canvasElement) {
      if (canvasElement instanceof MyElement) {
        this._queue.push(canvasElement);
      } else {
        console.error("fCanvas: the parameter passed to MyElement.addQueue() must be a fCanvas object.");
      }
    }
  }, {
    key: "getQueue",
    value: function getQueue(index) {
      if (index < 0) {
        index += this._queue.length;
      }

      return this._queue[index];
    }
  }, {
    key: "run",
    value: function run(canvasElement) {
      this.pcanvas.run(canvasElement);
    }
  }, {
    key: "has",
    value: function has(id) {
      return this._els.some(function (item) {
        return item._id === id;
      });
    }
  }, {
    key: "pcanvas",
    get: function get() {
      var _this = this;

      var canvas = this._idActiveNow === null ? this._els[this._els.length - 1] : this._els.find(function (item) {
        return item._id === _this._idActiveNow;
      });

      if (canvas instanceof fCanvas) {
        return canvas;
      } else {
        console.warn("fCanvas: The current referenced version of the fCanvas.run function is incorrect.");
        return this._els[0];
      }
    }
  }, {
    key: "bind",
    value: function bind(canvas) {
      if (canvas instanceof fCanvas) {
        if (this.has(canvas._id) === false) {
          this._els.push(canvas);
        }
      } else {
        console.error("fCanvas: the parameter passed to MyElement.bind() must be a fCanvas object.");
      }
    }
  }, {
    key: "$context2d",
    get: function get() {
      return this.pcanvas.$context2d;
    }
  }, {
    key: "_extendsCanvas",
    value: function _extendsCanvas(name) {
      var _this$pcanvas;

      for (var _len = arguments.length, argv = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        argv[_key - 1] = arguments[_key];
      }

      return (_this$pcanvas = this.pcanvas)[name].apply(_this$pcanvas, argv);
    }
  }, {
    key: "_toRadius",
    value: function _toRadius() {
      for (var _len2 = arguments.length, argv = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        argv[_key2] = arguments[_key2];
      }

      return this._extendsCanvas.apply(this, ["_toRadius"].concat(argv));
    }
  }, {
    key: "_toDegress",
    value: function _toDegress() {
      for (var _len3 = arguments.length, argv = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        argv[_key3] = arguments[_key3];
      }

      return this._extendsCanvas.apply(this, ["_toDegress"].concat(argv));
    }
  }, {
    key: "_toRgb",
    value: function _toRgb() {
      for (var _len4 = arguments.length, argv = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        argv[_key4] = arguments[_key4];
      }

      return this._extendsCanvas.apply(this, ["_toRgb"].concat(argv));
    }
  }, {
    key: "_figureOffset",
    value: function _figureOffset() {
      for (var _len5 = arguments.length, argv = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        argv[_key5] = arguments[_key5];
      }

      return this._extendsCanvas.apply(this, ["_figureOffset"].concat(argv));
    }
  }, {
    key: "sin",
    value: function sin() {
      for (var _len6 = arguments.length, argv = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        argv[_key6] = arguments[_key6];
      }

      return this._extendsCanvas.apply(this, ["sin"].concat(argv));
    }
  }, {
    key: "asin",
    value: function asin() {
      for (var _len7 = arguments.length, argv = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        argv[_key7] = arguments[_key7];
      }

      return this._extendsCanvas.apply(this, ["asin"].concat(argv));
    }
  }, {
    key: "cos",
    value: function cos() {
      for (var _len8 = arguments.length, argv = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        argv[_key8] = arguments[_key8];
      }

      return this._extendsCanvas.apply(this, ["cos"].concat(argv));
    }
  }, {
    key: "acos",
    value: function acos() {
      for (var _len9 = arguments.length, argv = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        argv[_key9] = arguments[_key9];
      }

      return this._extendsCanvas.apply(this, ["acos"].concat(argv));
    }
  }, {
    key: "tan",
    value: function tan() {
      for (var _len10 = arguments.length, argv = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        argv[_key10] = arguments[_key10];
      }

      return this._extendsCanvas.apply(this, ["tan"].concat(argv));
    }
  }, {
    key: "atan",
    value: function atan() {
      for (var _len11 = arguments.length, argv = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        argv[_key11] = arguments[_key11];
      }

      return this._extendsCanvas.apply(this, ["atan"].concat(argv));
    }
  }, {
    key: "tan2",
    value: function tan2() {
      for (var _len12 = arguments.length, argv = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        argv[_key12] = arguments[_key12];
      }

      return this._extendsCanvas.apply(this, ["tan2"].concat(argv));
    }
  }, {
    key: "atan2",
    value: function atan2() {
      for (var _len13 = arguments.length, argv = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        argv[_key13] = arguments[_key13];
      }

      return this._extendsCanvas.apply(this, ["atan2"].concat(argv));
    }
  }, {
    key: "mouseX",
    get: function get() {
      return this.pcanvas.mouseX;
    }
  }, {
    key: "mouseY",
    get: function get() {
      return this.pcanvas.mouseY;
    }
  }, {
    key: "interact",
    get: function get() {
      return this.pcanvas.interact;
    }
  }, {
    key: "width",
    get: function get() {
      return this.pcanvas.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.pcanvas.height;
    }
  }, {
    key: "windowWidth",
    get: function get() {
      return this.pcanvas.windowWidth;
    }
  }, {
    key: "windowHeight",
    get: function get() {
      return this.pcanvas.windowHeight;
    }
  }, {
    key: "_createLinear",
    value: function _createLinear(type) {
      var _this$$context2d;

      for (var _len14 = arguments.length, argv = new Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
        argv[_key14 - 1] = arguments[_key14];
      }

      return (_this$$context2d = this.$context2d)[type].apply(_this$$context2d, argv);
    }
  }, {
    key: "fill",
    value: function fill() {
      for (var _len15 = arguments.length, argv = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        argv[_key15] = arguments[_key15];
      }

      if (argv.length === 0) {
        return this.$context2d.fillStyle || "rgba(0, 0, 0, 0)";
      } else {
        this.$context2d.fillStyle = this._toRgb(argv);
        this.$context2d.fill();
      }
    }
  }, {
    key: "stroke",
    value: function stroke() {
      for (var _len16 = arguments.length, argv = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        argv[_key16] = arguments[_key16];
      }

      if (argv.length === 0) {
        return this.$context2d.strokeStyle || "rgba(0, 0, 0, 0)";
      } else {
        this.$context2d.strokeStyle = this._toRgb(argv);
        this.$context2d.stroke();
      }
    }
  }, {
    key: "noFill",
    value: function noFill() {
      this.fill(0, 0, 0, 0);
    }
  }, {
    key: "lineWidth",
    value: function lineWidth(value) {
      if (value === undefined) {
        return this.$context2d.lineWidth;
      } else {
        this.$context2d.lineWidth = value;
      }
    }
  }, {
    key: "miterLimit",
    value: function miterLimit(value) {
      if (value === undefined) {
        return this.$context2d.miterLimit;
      } else {
        if (this.lineJoin() !== "miter") {
          this.lineJoin("miter");
        }

        this.$context2d = value;
      }
    }
  }, {
    key: "shadowOffset",
    value: function shadowOffset() {
      for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
        args[_key17] = arguments[_key17];
      }

      if (args.length === 0) {
        return {
          x: this.$context2d.shadowOffsetX,
          y: this.$context2d.shadowOffsetY
        };
      } else {
        this.$context2d.shadowOffsetX = args[0];
        this.$context2d.shadowOffsetY = args[1];
      }
    }
  }, {
    key: "measureText",
    value: function measureText(text) {
      return this.$context2d.measureText(text).width;
    }
  }, {
    key: "begin",
    value: function begin() {
      this.$context2d.beginPath();
    }
  }, {
    key: "close",
    value: function close() {
      this.$context2d.closePath();
    }
  }, {
    key: "save",
    value: function save() {
      this.$context2d.save();
    }
  }, {
    key: "restore",
    value: function restore() {
      this.$context2d.restore();
    }
  }, {
    key: "arc",
    value: function arc(c, t, e, i, n, o) {
      this.begin();
      this.$context2d.arc(c, t, e, this._toRadius(i) - Math.PI / 2, this._toRadius(n) - Math.PI / 2, o);
      this.close();
    }
  }, {
    key: "pie",
    value: function pie(x, y, r, d1, d2, a) {
      this.begin();
      this.move(x, y);
      this.arc(x, y, r, d1, d2, a);
      this.to(x, y);
      this.close();
    }
  }, {
    key: "line",
    value: function line(c, t, e, i) {
      this.move(c, t);
      this.to(e, i);
    }
  }, {
    key: "ellipse",
    value: function ellipse(c, t, e, i, n, o, r) {
      this.begin();
      this.$context2d.ellipse(c, t, e, i, this._toRadius(n) - Math.PI / 2, this._toRadius(o), r === undefined ? !1 : r);
      this.close();
    }
  }, {
    key: "circle",
    value: function circle(x, y, r) {
      this.arc(x, y, r, 0, 360);
    }
  }, {
    key: "point",
    value: function point(x, y) {
      this.circle(x, y, 1);
    }
  }, {
    key: "triange",
    value: function triange(a, b, c, d, e, f) {
      this.begin();
      this.move(a, b);
      this.to(c, d);
      this.to(e, f);
      this.close();
    }
  }, {
    key: "drawImage",
    value: function drawImage(image) {
      var _this$$context2d2;

      for (var _len18 = arguments.length, args = new Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
        args[_key18 - 1] = arguments[_key18];
      }

      if (args.length === 2) {
        args = this._figureOffset.apply(this, _toConsumableArray(args).concat([image.width, image.height]));
      } else if (args.length === 6) {
        var _this$_figureOffset = this._figureOffset.apply(this, _toConsumableArray(args.slice(3)));

        var _this$_figureOffset2 = _slicedToArray(_this$_figureOffset, 2);

        args[5] = _this$_figureOffset2[0];
        args[6] = _this$_figureOffset2[1];
      }

      (_this$$context2d2 = this.$context2d).drawImage.apply(_this$$context2d2, [image].concat(_toConsumableArray(args)));
    }
  }, {
    key: "rect",
    value: function rect(x, y, w, h, $1) {
      var $2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : $1;
      var $3 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : $1;
      var $4 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : $2;
      this.begin();

      var _this$_figureOffset3 = this._figureOffset(x, y, w, h);

      var _this$_figureOffset4 = _slicedToArray(_this$_figureOffset3, 2);

      x = _this$_figureOffset4[0];
      y = _this$_figureOffset4[1];

      if (arguments.length < 5) {
        this.$context2d.rect(x, y, w, h);
      } else {
        var arc = [AutoToPx($1, w), AutoToPx($2, h), AutoToPx($3, w), AutoToPx($4, h)];
        this.move(x, y);
        this.arcTo(x + w, y, x + w, y + h - arc[1], arc[1]);
        this.arcTo(x + w, y + h, x + w - arc[2], y + h, arc[2]);
        this.arcTo(x, y + h, x, y + h - arc[3], arc[3]);
        this.arcTo(x, y, x + w - arc[0], y, arc[0]);
      }

      this.close();
    }
  }, {
    key: "square",
    value: function square(x, y, w) {
      for (var _len19 = arguments.length, radius = new Array(_len19 > 3 ? _len19 - 3 : 0), _key19 = 3; _key19 < _len19; _key19++) {
        radius[_key19 - 3] = arguments[_key19];
      }

      this.rect.apply(this, [x, y, w, w].concat(radius));
    }
  }, {
    key: "__functionDefault",
    value: function __functionDefault(property, arg) {
      if (arg === undefined) {
        return this.$context2d[property];
      } else {
        this.$context2d[property] = arg;
      }
    }
  }, {
    key: "__functionDefault2",
    value: function __functionDefault2(name) {
      var _this$$context2d3;

      for (var _len20 = arguments.length, argv = new Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
        argv[_key20 - 1] = arguments[_key20];
      }

      return (_this$$context2d3 = this.$context2d)[name].apply(_this$$context2d3, argv);
    }
  }, {
    key: "quadratic",
    value: function quadratic() {
      for (var _len21 = arguments.length, argv = new Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
        argv[_key21] = arguments[_key21];
      }

      this.__functionDefault2.apply(this, ["quadraticCurveTo"].concat(argv));
    }
  }, {
    key: "bezier",
    value: function bezier() {
      for (var _len22 = arguments.length, argv = new Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
        argv[_key22] = arguments[_key22];
      }

      this.__functionDefault2.apply(this, ["bezierCurveTo"].concat(argv));
    }
  }, {
    key: "move",
    value: function move() {
      for (var _len23 = arguments.length, argv = new Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
        argv[_key23] = arguments[_key23];
      }

      this.__functionDefault2.apply(this, ["moveTo"].concat(argv));
    }
  }, {
    key: "to",
    value: function to() {
      for (var _len24 = arguments.length, argv = new Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
        argv[_key24] = arguments[_key24];
      }

      this.__functionDefault2.apply(this, ["lineTo"].concat(argv));
    }
  }, {
    key: "fillText",
    value: function fillText() {
      for (var _len25 = arguments.length, argv = new Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
        argv[_key25] = arguments[_key25];
      }

      this.__functionDefault2.apply(this, ["fillText"].concat(argv));
    }
  }, {
    key: "strokeText",
    value: function strokeText() {
      for (var _len26 = arguments.length, argv = new Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
        argv[_key26] = arguments[_key26];
      }

      this.__functionDefault2.apply(this, ["strokeText"].concat(argv));
    }
  }, {
    key: "fillRect",
    value: function fillRect() {
      for (var _len27 = arguments.length, argv = new Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
        argv[_key27] = arguments[_key27];
      }

      this.__functionDefault2.apply(this, ["fillRect"].concat(argv));
    }
  }, {
    key: "strokeRect",
    value: function strokeRect() {
      for (var _len28 = arguments.length, argv = new Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
        argv[_key28] = arguments[_key28];
      }

      this.__functionDefault2.apply(this, ["strokeRect"].concat(argv));
    }
  }, {
    key: "arcTo",
    value: function arcTo() {
      for (var _len29 = arguments.length, argv = new Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
        argv[_key29] = arguments[_key29];
      }

      this.__functionDefault2.apply(this, ["arcTo"].concat(argv));
    }
  }, {
    key: "isPoint",
    value: function isPoint() {
      for (var _len30 = arguments.length, argv = new Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
        argv[_key30] = arguments[_key30];
      }

      this.__functionDefault2.apply(this, ["isPointInPath"].concat(argv));
    }
  }, {
    key: "createImageData",
    value: function createImageData() {
      for (var _len31 = arguments.length, argv = new Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
        argv[_key31] = arguments[_key31];
      }

      return this.__functionDefault2.apply(this, ["createImageData"].concat(argv));
    }
  }, {
    key: "getImageData",
    value: function getImageData() {
      for (var _len32 = arguments.length, argv = new Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
        argv[_key32] = arguments[_key32];
      }

      return this.__functionDefault2.apply(this, ["getImageData"].concat(argv));
    }
  }, {
    key: "putImageData",
    value: function putImageData() {
      for (var _len33 = arguments.length, argv = new Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
        argv[_key33] = arguments[_key33];
      }

      this.__functionDefault2.apply(this, ["putImageData"].concat(argv));
    }
  }, {
    key: "createPattern",
    value: function createPattern() {
      for (var _len34 = arguments.length, argv = new Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
        argv[_key34] = arguments[_key34];
      }

      return this.__functionDefault2.apply(this, ["createPattern"].concat(argv));
    }
  }, {
    key: "createRadialGradient",
    value: function createRadialGradient() {
      for (var _len35 = arguments.length, argv = new Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
        argv[_key35] = arguments[_key35];
      }

      return this.__functionDefault2.apply(this, ["createRadialGradient"].concat(argv));
    }
  }, {
    key: "createLinearGradient",
    value: function createLinearGradient() {
      for (var _len36 = arguments.length, argv = new Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
        argv[_key36] = arguments[_key36];
      }

      return this.__functionDefault2.apply(this, ["createLinearGradient"].concat(argv));
    }
  }, {
    key: "lineJoin",
    value: function lineJoin(argv) {
      return this.__functionDefault("lineJoin", argv);
    }
  }, {
    key: "lineCap",
    value: function lineCap(argv) {
      return this.__functionDefault("lineCap", argv);
    }
  }, {
    key: "shadowBlur",
    value: function shadowBlur(argv) {
      return this.__functionDefault("shadowBlur", argv);
    }
  }, {
    key: "shadowColor",
    value: function shadowColor(argv) {
      return this.__functionDefault("shadowColor", argv);
    }
  }]);

  return MyElement;
}();

var fCanvas = /*#__PURE__*/function () {
  function fCanvas() {
    var _this2 = this;

    _classCallCheck(this, fCanvas);

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

    var handlerEvent = function handlerEvent(event) {
      try {
        _this2.touches = getTouchInfo(_this2.$el, event.touches || [event]);
        _this2.changedTouches = getTouchInfo(_this2.$el, event.changedTouches || [event]);
        _this2.preventTouch && event.preventDefault();
        _this2.stopTouch && event.stopPropagation();
      } catch (e) {
        throw e;
      }
    };

    this.$on(isMobile() ? "touchstart" : "mousedown", handlerEvent);
    this.$on(isMobile() ? "touchmove" : "mousemove", handlerEvent);
    this.$on(isMobile() ? "touchend" : "mouseup", handlerEvent);
  }

  _createClass(fCanvas, [{
    key: "mouseX",
    get: function get() {
      var _this$touches$;

      return ((_this$touches$ = this.touches[0]) === null || _this$touches$ === void 0 ? void 0 : _this$touches$.x) || null;
    }
  }, {
    key: "mouseY",
    get: function get() {
      var _this$touches$2;

      return ((_this$touches$2 = this.touches[0]) === null || _this$touches$2 === void 0 ? void 0 : _this$touches$2.y) || null;
    }
  }, {
    key: "interact",
    get: function get() {
      return this.touches.length > 0;
    }
  }, {
    key: "$on",
    value: function $on(name, callback) {
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
  }, {
    key: "$off",
    value: function $off(name, callback) {
      var _this3 = this;

      if (name in this._events) {
        if (Array.isArray(this._events[name])) {
          this._events[name] = this._events[name].filter(function (item) {
            if (item === callback) {
              _this3.$el.removeEventListener(name, item);

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
  }, {
    key: "_moveEvent",
    value: function _moveEvent(toEl) {
      var _this4 = this;

      var _loop = function _loop(name) {
        if (Array.isArray(_this4._events[name])) {
          _this4._events[name].forEach(function (item) {
            toEl.addEventListener(name, item);

            _this4.$el.removeEventListener(name, item);
          });
        } else {
          toEl.addEventListener(name, _this4._events[name]);

          _this4.$el.removeEventListener(name, _this4._events[name]);
        }
      };

      for (var name in this._events) {
        _loop(name);
      }
    }
  }, {
    key: "append",
    value: function append() {
      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
      parent.appendChild(this.$el);
    }
  }, {
    key: "mount",
    value: function mount(query) {
      if (typeof query === "string") {
        query = document.querySelector(query) || this.$el;
      }

      var _ref = [this.$el.width, this.$el.height];
      query.width = _ref[0];
      query.height = _ref[1];

      this._moveEvent(query);

      this._el = query;
    }
  }, {
    key: "noClear",
    value: function noClear() {
      this._ENV.clear = false;
    }
  }, {
    key: "$el",
    get: function get() {
      return this._el;
    }
  }, {
    key: "$context2d",
    get: function get() {
      if (this._context2dCaching === null) {
        return this._context2dCaching = this.$el.getContext("2d");
      }

      return this._context2dCaching;
    }
  }, {
    key: "run",
    value: function run(element) {
      element._run(this);
    }
  }, {
    key: "width",
    get: function get() {
      return this.$el.width;
    },
    set: function set(value) {
      this.$el.width = value;
    }
  }, {
    key: "height",
    get: function get() {
      return this.$el.height;
    },
    set: function set(value) {
      this.$el.height = value;
    }
  }, {
    key: "windowWidth",
    get: function get() {
      return windowSize.windowWidth.get();
    }
  }, {
    key: "windowHeight",
    get: function get() {
      return windowSize.windowHeight.get();
    }
  }, {
    key: "_methodMode",
    value: function _methodMode(type, value) {
      if (!(type in this._ENV) || !(type in fCanvas.constants)) {
        console.warn("".concat(type, ": This method mode don't install."));
      } else {
        if (value === undefined) {
          return fCanvas.constants[type][this._ENV[type]];
        } else {
          var validate = false;

          for (var key in fCanvas.constants[type]) {
            if (fCanvas.constants[type][key].toLowerCase() === value.toLowerCase()) {
              this._ENV[type] = key;
            }

            validate = true;
          }

          if (validate === false) {
            console.warn("".concat(type, ": Value't is validate."));
          }
        }
      }
    }
  }, {
    key: "_toRadius",
    value: function _toRadius(value) {
      return this._ENV.angleMode == 0 ? value * Math.PI / 180 : value;
    }
  }, {
    key: "_toDegress",
    value: function _toDegress(value) {
      return this._ENV.angleMode == 1 ? value * 180 / Math.PI : value;
    }
  }, {
    key: "_toRgb",
    value: function _toRgb(_ref2) {
      var _ref3 = _slicedToArray(_ref2, 4),
          _ref3$ = _ref3[0],
          red = _ref3$ === void 0 ? 0 : _ref3$,
          _ref3$2 = _ref3[1],
          green = _ref3$2 === void 0 ? red : _ref3$2,
          _ref3$3 = _ref3[2],
          blue = _ref3$3 === void 0 ? green : _ref3$3,
          _ref3$4 = _ref3[3],
          alpha = _ref3$4 === void 0 ? 1 : _ref3$4;

      if (Array.isArray(red)) {
        return this._toRgb(red);
      } else {
        if (typeof red === "string") {
          return red;
        } else {
          var after = fCanvas.constants.colorMode[this._ENV.colorMode].match(/hsl|hsb/i) ? "%" : "";
          return "".concat(fCanvas.constants.colorMode[this._ENV.colorMode], "a(").concat([red, green + after, blue + after, alpha].join(","), ")");
        }
      }
    }
  }, {
    key: "_figureOffset",
    value: function _figureOffset(x, y, width, height) {
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
  }, {
    key: "angleMode",
    value: function angleMode(value) {
      return this._methodMode("angleMode", value);
    }
  }, {
    key: "rectAlign",
    value: function rectAlign(value) {
      return this._methodMode("rectAlign", value);
    }
  }, {
    key: "colorMode",
    value: function colorMode(value) {
      return this._methodMode("colorMode", value);
    }
  }, {
    key: "rectBaseline",
    value: function rectBaseline(value) {
      return this._methodMode("rectBaseline", value);
    }
  }, {
    key: "fontSize",
    value: function fontSize(value) {
      var _fontToArray = fontToArray(this.font()),
          size = _fontToArray.size,
          weight = _fontToArray.weight,
          family = _fontToArray.family;

      if (value === undefined) {
        return size;
      } else {
        value = AutoToPx(value, size, size);
        this.font([weight, "".concat(value, "px"), family].join(" "));
      }
    }
  }, {
    key: "fontFamily",
    value: function fontFamily(value) {
      var _fontToArray2 = fontToArray(this.font()),
          size = _fontToArray2.size,
          weight = _fontToArray2.weight,
          family = _fontToArray2.family;

      if (value === undefined) {
        return family;
      } else {
        this.font([weight, "".concat(size, "px"), value].join(" "));
      }
    }
  }, {
    key: "fontWeight",
    value: function fontWeight(value) {
      var _fontToArray3 = fontToArray(this.font()),
          size = _fontToArray3.size,
          weight = _fontToArray3.weight,
          family = _fontToArray3.family;

      if (value === undefined) {
        return weight;
      } else {
        this.font([value, "".concat(size, "px"), family].join(" "));
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.width;
      var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.height;
      this.$context2d.clearRect(x, y, w, h);
    }
  }, {
    key: "background",
    value: function background() {
      var _argv$;

      for (var _len37 = arguments.length, argv = new Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
        argv[_key37] = arguments[_key37];
      }

      if (((_argv$ = argv[0]) === null || _argv$ === void 0 ? void 0 : _argv$.constructor) === HTMLImageElement) {
        this.$context2d.drawImage(argv[0], 0, 0, this.width, this.height);
      } else {
        this.$context2d.fillStyle = this._toRgb(argv);
        this.$context2d.fill();
        this.$context2d.fillRect(0, 0, this.width, this.height);
      }
    }
  }, {
    key: "toDataURL",
    value: function toDataURL() {
      var _this$$el;

      (_this$$el = this.$el).toDataURL.apply(_this$$el, arguments);
    }
  }, {
    key: "rotate",
    value: function rotate(value) {
      if (value === undefined) {
        return this._ENV.rotate;
      } else {
        this.$context2d.rotate(this._ENV.rotate = this._toRadius(value));
      }
    }
  }, {
    key: "resetTransform",
    value: function resetTransform() {
      this.setTransform(1, 0, 0, 1, 0, 0);
    }
  }, {
    key: "preload",
    value: function () {
      var _preload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.ready = false;
                _context.next = 3;
                return callback();

              case 3:
                result = _context.sent;
                this.ready = true;

                if (this._setupCallback) {
                  _setup(this._setupCallback, result);
                }

                if (this._drawCallback) {
                  _draw(this._drawCallback, this, result);
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preload(_x) {
        return _preload.apply(this, arguments);
      }

      return preload;
    }()
  }, {
    key: "setup",
    value: function setup(callback, argv) {
      if (this.ready) {
        _setup(callback, argv);
      } else {
        this._setupCallback = callback;
      }
    }
  }, {
    key: "draw",
    value: function draw(callback, argv) {
      if (this.ready) {
        _draw(callback, this, argv);
      } else {
        this._drawCallback = callback;
      }
    }
  }, {
    key: "__functionDefault",
    value: function __functionDefault(property, arg) {
      if (arg === undefined) {
        return this.$context2d[property];
      } else {
        this.$context2d[property] = arg;
      }
    }
  }, {
    key: "__functionDefault2",
    value: function __functionDefault2(name) {
      var _this$$context2d4;

      for (var _len38 = arguments.length, argv = new Array(_len38 > 1 ? _len38 - 1 : 0), _key38 = 1; _key38 < _len38; _key38++) {
        argv[_key38 - 1] = arguments[_key38];
      }

      return (_this$$context2d4 = this.$context2d)[name].apply(_this$$context2d4, argv);
    }
  }, {
    key: "font",
    value: function font(argv) {
      return this.__functionDefault("font", argv);
    }
  }, {
    key: "textAlign",
    value: function textAlign(argv) {
      return this.__functionDefault("textAlign", argv);
    }
  }, {
    key: "textBaseline",
    value: function textBaseline(argv) {
      return this.__functionDefault("textBaseline", argv);
    }
  }, {
    key: "globalOperation",
    value: function globalOperation(argv) {
      return this.__functionDefault("globalCompositeOperation", argv);
    }
  }, {
    key: "translate",
    value: function translate() {
      for (var _len39 = arguments.length, argv = new Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
        argv[_key39] = arguments[_key39];
      }

      this.__functionDefault2.apply(this, ["translate"].concat(argv));
    }
  }, {
    key: "scale",
    value: function scale() {
      for (var _len40 = arguments.length, argv = new Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
        argv[_key40] = arguments[_key40];
      }

      this.__functionDefault2.apply(this, ["scale"].concat(argv));
    }
  }, {
    key: "clip",
    value: function clip() {
      for (var _len41 = arguments.length, argv = new Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
        argv[_key41] = arguments[_key41];
      }

      this.__functionDefault2.apply(this, ["clip"].concat(argv));
    }
  }, {
    key: "transform",
    value: function transform() {
      if ((arguments.length <= 0 ? undefined : arguments[0]) instanceof DOMatrix) {
        var _ref4 = arguments.length <= 0 ? undefined : arguments[0],
            _ref4$a = _ref4.a,
            a = _ref4$a === void 0 ? 1 : _ref4$a,
            _ref4$b = _ref4.b,
            b = _ref4$b === void 0 ? 0 : _ref4$b,
            _ref4$c = _ref4.c,
            c = _ref4$c === void 0 ? 0 : _ref4$c,
            _ref4$d = _ref4.d,
            d = _ref4$d === void 0 ? 1 : _ref4$d,
            _ref4$e = _ref4.e,
            e = _ref4$e === void 0 ? 0 : _ref4$e,
            _ref4$f = _ref4.f,
            f = _ref4$f === void 0 ? 0 : _ref4$f;

        this.$context2d.transform(a, b, c, d, e, f);
      } else {
        var _this$$context2d5;

        (_this$$context2d5 = this.$context2d).transform.apply(_this$$context2d5, arguments);
      }
    }
  }, {
    key: "setTransform",
    value: function setTransform() {
      if ((arguments.length <= 0 ? undefined : arguments[0]) instanceof DOMatrix) {
        var _ref5 = arguments.length <= 0 ? undefined : arguments[0],
            _ref5$a = _ref5.a,
            a = _ref5$a === void 0 ? 1 : _ref5$a,
            _ref5$b = _ref5.b,
            b = _ref5$b === void 0 ? 0 : _ref5$b,
            _ref5$c = _ref5.c,
            c = _ref5$c === void 0 ? 0 : _ref5$c,
            _ref5$d = _ref5.d,
            d = _ref5$d === void 0 ? 1 : _ref5$d,
            _ref5$e = _ref5.e,
            e = _ref5$e === void 0 ? 0 : _ref5$e,
            _ref5$f = _ref5.f,
            f = _ref5$f === void 0 ? 0 : _ref5$f;

        this.$context2d.setTransform(a, b, c, d, e, f);
      } else {
        var _this$$context2d6;

        (_this$$context2d6 = this.$context2d).setTransform.apply(_this$$context2d6, arguments);
      }
    }
  }, {
    key: "sin",
    value: function sin(deg) {
      return Math.sin(this._toRadius(deg));
    }
  }, {
    key: "asin",
    value: function asin() {
      return this._toDegress(Math.asin.apply(Math, arguments));
    }
  }, {
    key: "cos",
    value: function cos(deg) {
      return Math.cos(this._toRadius(deg));
    }
  }, {
    key: "acos",
    value: function acos() {
      return this._toDegress(Math.acos.apply(Math, arguments));
    }
  }, {
    key: "tan",
    value: function tan(deg) {
      return Math.tan(this._toRadius(deg));
    }
  }, {
    key: "atan",
    value: function atan() {
      return this._toDegress(Math.atan.apply(Math, arguments));
    }
  }, {
    key: "tan2",
    value: function tan2(deg) {
      return Math.tan2(this._toRadius(deg));
    }
  }, {
    key: "atan2",
    value: function atan2() {
      return this._toDegress(Math.atan2.apply(Math, arguments));
    }
  }, {
    key: "cursor",
    value: function cursor() {
      this.$el.style.cursor = this._store.cursor;
    }
  }, {
    key: "noCursor",
    value: function noCursor() {
      this._store.cursor = this.$el.style.cursor || "auto";
      this.$el.style.cursor = "none";
    }
  }, {
    key: "loop",
    value: function loop() {
      this._ENV.loop = true;
    }
  }, {
    key: "noLoop",
    value: function noLoop() {
      this._ENV.loop = false;
    }
  }, {
    key: "keyPressed",
    value: function keyPressed(callback) {
      var _this5 = this;

      this.$on("keypress", callback);
      return {
        off: function off() {
          _this5.$off("keypress", callback);
        }
      };
    }
  }, {
    key: "mouseIn",
    value: function mouseIn(callback) {
      var _this6 = this;

      this.$on("mouseover", callback);
      return {
        off: function off() {
          _this6.$off("mouseover", callback);
        }
      };
    }
  }, {
    key: "mouseOut",
    value: function mouseOut(callback) {
      var _this7 = this;

      this.$on("mouseout", callback);
      return {
        off: function off() {
          _this7.$off("mouseout", callback);
        }
      };
    }
  }, {
    key: "mouseDowned",
    value: function mouseDowned(callback) {
      var _this8 = this;

      this.$on("mousedown", callback);
      return {
        off: function off() {
          _this8.$off("mousedown", callback);
        }
      };
    }
  }, {
    key: "touchStarted",
    value: function touchStarted(callback) {
      var _this9 = this;

      this.$on("touchstart", callback);
      return {
        off: function off() {
          _this9.$off("touchstart", callback);
        }
      };
    }
  }, {
    key: "touchMoved",
    value: function touchMoved(callback) {
      var _this10 = this;

      this.$on("touchmove", callback);
      return {
        off: function off() {
          _this10.$off("touchmove", callback);
        }
      };
    }
  }, {
    key: "touchEned",
    value: function touchEned(callback) {
      var _this11 = this;

      this.$on("touchend", callback);
      return {
        off: function off() {
          _this11.$off("touchend", callback);
        }
      };
    }
  }, {
    key: "mouseMoved",
    value: function mouseMoved(callback) {
      var _this12 = this;

      this.$on("mousemove", callback);
      return {
        off: function off() {
          _this12.$off("mousemove", callback);
        }
      };
    }
  }, {
    key: "mouseUped",
    value: function mouseUped(callback) {
      var _this13 = this;

      this.$on("mouseup", callback);
      return {
        off: function off() {
          _this13.$off("mouseup", callback);
        }
      };
    }
  }, {
    key: "mouseClicked",
    value: function mouseClicked(callback) {
      var _this14 = this;

      this.$on("click", callback);
      return {
        off: function off() {
          _this14.$off("click", callback);
        }
      };
    }
  }]);

  return fCanvas;
}();

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
    off: function off() {
      element.removeEventListener(name, callback);
    }
  };
}

function _setup(callback, argv) {
  if (document.readyState === "complete") {
    //// readyState === "complete"
    callback(argv);
  } else {
    var load = function load() {
      document.removeEventListener("DOMContentLoaded", load);
      window.removeEventListener("load", load);
      callback(argv);
    };

    document.addEventListener("DOMContentLoaded", load);
    window.addEventListener("load", load);
  }
}

function _draw(callback, canvas, argv) {
  if ((canvas === null || canvas === void 0 ? void 0 : canvas._ENV.clear) === true) {
    canvas.clear();
  }

  callback(argv);

  if (!canvas || (canvas === null || canvas === void 0 ? void 0 : canvas._ENV.loop) === true) {
    requestAnimationFrame(function () {
      return _draw(callback, canvas, argv);
    });
  }
}
function keyPressed(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("keypress", callback, element);
}
function changeSize(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("resize", callback, element);
}
function mouseWheel(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("wheel", callback, element);
}
function mousePressed(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("mousedown", callback, element);
}
function mouseClicked(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("click", callback, element);
}
function mouseMoved(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("mousemove", callback, element);
}
function touchStarted(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("touchstart", callback, element);
}
function touchMoved(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("touchmove", callback, element);
}
function touchEnded(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("touchend", callback, element);
}

export default fCanvas;
export { CircleImpact, CircleImpactPoint, CircleImpactRect, Emitter, RectImpact, RectImpactPoint, changeSize, constrain, createMatrix, createVector, _draw as draw, keyPressed, loadImage, map, mouseClicked, mouseMoved, mousePressed, mouseWheel, random, range, _setup as setup, touchEnded, touchMoved, touchStarted };
