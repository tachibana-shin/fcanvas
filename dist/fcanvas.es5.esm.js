import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
  return setTimeout(callback, 100 / 6);
};

var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function (timeoutId) {
  clearTimeout(timeoutId);
};

var isTouch = "ontouchstart" in window || "onmsgesturechange" in window;
var supportPassive = false;

function noop() {}

try {
  var opts = Object.defineProperty({}, "passive", {
    get: function get() {
      supportPassive = true;
      return false;
    }
  });
  window.addEventListener("testPassive", noop, opts);
  window.removeEventListener("testPassive", noop, opts);
} catch (_unused) {
  supportPassive = false;
}

var passive = supportPassive;
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
    return "null";
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

  return {
    size: parseFloat(_font[1]),
    family: trim(_font[2]),
    weight: trim(_font[0])
  };
}

function AutoToPx(string, fi, fontSize) {
  if (typeof string === "string") {
    var _string$match;

    string = trim(string);
    var number = parseFloat(string);
    var dp = ((_string$match = string.match(/[a-z%]+$/i)) === null || _string$match === void 0 ? void 0 : _string$match[1]) || "px";

    switch (dp) {
      case "px":
        return number;

      case "em":
        return (fontSize || 0) * number;

      case "rem":
        return (fontSize || 0) * 16;

      case "vw":
        return windowSize.windowWidth.get() * number / 100;

      case "vh":
        return windowSize.windowHeight.get() * number / 100;

      case "vmin":
        return Math.min(windowSize.windowWidth.get(), windowSize.windowHeight.get()) * number / 100;

      case "vmax":
        return Math.max(windowSize.windowWidth.get(), windowSize.windowHeight.get()) * number / 100;

      case "%":
        return fi / 100 * number;

      default:
        return number;
    }
  } else {
    return string;
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
/**
 * @return {boolean}
 */


function isMobile() {
  var agent = typeof navigator === "undefined" ? "" : navigator.userAgent || navigator.vendor; /// code from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(agent.substr(0, 4));
}

function extractNumber(value) {
  if (typeof value === "number") {
    return value;
  }

  return parseFloat("".concat(value));
}

function bindEvent(name, callback, element) {
  element.addEventListener(name, callback);
  return function () {
    element.removeEventListener(name, callback);
  };
}

var MyElement = /*#__PURE__*/function () {
  /**
   * @param {fCanvas} canvas?
   * @return {any}
   */
  function MyElement(canvas) {
    _classCallCheck(this, MyElement);

    this._id = MyElement._count++;
    this._els = Object.create(null);
    this._idActiveNow = -1;
    this._queue = [];

    if (!(canvas instanceof fCanvas)) {
      canvas = noopFCanvas;
    }

    this.__addEl(canvas);
  }

  _createClass(MyElement, [{
    key: "type",
    get: function get() {
      if ("x" in this && "y" in this) {
        if ("width" in this && "height" in this) {
          return "rect";
        }

        if ("radius" in this) {
          return "circle";
        }

        return "point";
      }

      return "unknown";
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "__addEl",
    value: function __addEl(canvas) {
      if (canvas.id in this._els === false) {
        this._els[canvas.id] = {
          canvas: canvas,
          setuped: false
        };
      }
    }
  }, {
    key: "_run",
    value: function _run(canvas) {
      this.__addEl(canvas);

      this._idActiveNow = canvas.id;

      if (typeof this.setup === "function" && this._els[this._idActiveNow].setuped === false) {
        var result = this.setup();

        if (result !== null && _typeof(result) === "object") {
          for (var prop in result) {
            this[prop] = result[prop];
          }
        }

        this._els[this._idActiveNow].setuped = true;
      }

      if (typeof this.update === "function") {
        if (typeof this.draw === "function") {
          this.draw();
        }

        this.update();
      } else if (typeof this.draw === "function") {
        this.draw();
      }

      if (this._queue.length > 0) {
        var length = this._queue.length;
        var index = 0;

        while (index < length) {
          this.run(this._queue[index]);
          index++;
        }
      }

      this._idActiveNow = -1;
    }
    /**
     * @param {MyElement} element
     * @return {void}
     */

  }, {
    key: "add",
    value: function add() {
      var _this$_queue;

      (_this$_queue = this._queue).push.apply(_this$_queue, arguments);
    }
    /**
     * @param {MyElement} element
     * @return {void}
     */

  }, {
    key: "run",
    value: function run(element) {
      this.$parent.run(element);
    }
    /**
     * @return {fCanvas}
     */

  }, {
    key: "$parent",
    get: function get() {
      var canvas = this._els[this._idActiveNow === -1 ? 0 : this._idActiveNow];

      if ((canvas === null || canvas === void 0 ? void 0 : canvas.canvas) instanceof fCanvas) {
        return canvas.canvas;
      } else {
        console.warn("fCanvas: The current referenced version of the fCanvas.run function is incorrect.");
        return this._els[0].canvas;
      }
    }
    /**
     * @return {CanvasRenderingContext2D}
     */

  }, {
    key: "$context2d",
    get: function get() {
      return this.$parent.$context2d;
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "sin",
    value: function sin(angle) {
      return this.$parent.sin(angle);
    }
    /**
     * @param {number} sin
     * @return {number}
     */

  }, {
    key: "asin",
    value: function asin(sin) {
      return this.$parent.asin(sin);
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "cos",
    value: function cos(angle) {
      return this.$parent.cos(angle);
    }
    /**
     * @param {number} cos
     * @return {number}
     */

  }, {
    key: "acos",
    value: function acos(cos) {
      return this.$parent.asin(cos);
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "tan",
    value: function tan(angle) {
      return this.$parent.tan(angle);
    }
    /**
     * @param {number} tan
     * @return {number}
     */

  }, {
    key: "atan",
    value: function atan(tan) {
      return this.$parent.atan(tan);
    }
    /**
     * @param {number} y
     * @param {number} x
     * @return {number}
     */

  }, {
    key: "atan2",
    value: function atan2(y, x) {
      return this.$parent.atan2(y, x);
    }
    /**
     * @return {number | null}
     */

  }, {
    key: "mouseX",
    get: function get() {
      return this.$parent.mouseX;
    }
    /**
     * @return {number | null}
     */

  }, {
    key: "mouseY",
    get: function get() {
      return this.$parent.mouseY;
    }
    /**
     * @return {numbe}
     */

  }, {
    key: "movedX",
    get: function get() {
      return this.$parent.movedX;
    }
    /**
     * @return {numbe}
     */

  }, {
    key: "movedY",
    get: function get() {
      return this.$parent.movedY;
    }
    /**
     * @return {numbe}
     */

  }, {
    key: "pmouseX",
    get: function get() {
      return this.$parent.pmouseX;
    }
    /**
     * @return {numbe}
     */

  }, {
    key: "pmouseY",
    get: function get() {
      return this.$parent.pmouseY;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "mouseIsPressed",
    get: function get() {
      return this.$parent.mouseIsPressed;
    }
    /**
     * @return {number}
     */

  }, {
    key: "windowWidth",
    get: function get() {
      return this.$parent.windowWidth;
    }
    /**
     * @return {number}
     */

  }, {
    key: "windowHeight",
    get: function get() {
      return this.$parent.windowHeight;
    }
    /**
     * @param  {number} red?
     * @param  {number} green?
     * @param  {number} blue?
     * @param  {number} alpha=1
     * @returns {this}
     */

  }, {
    key: "fill",
    value: function fill() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.$context2d.fillStyle = this.$parent._toRgb(args);
      this.$context2d.fill();
      return this;
    }
    /**
     * @param  {number} red?
     * @param  {number} green?
     * @param  {number} blue?
     * @param  {number} alpha=1
     * @returns {this}
     */

  }, {
    key: "stroke",
    value: function stroke() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$context2d.strokeStyle = this.$parent._toRgb(args);
      this.$context2d.stroke();
      return this;
    }
    /**
     * @return {this}
     */

  }, {
    key: "noFill",
    value: function noFill() {
      return this.fill(0, 0, 0, 0);
    }
    /**
     * @param {number} value?
     * @return {number|this}
     */

  }, {
    key: "lineWidth",
    value: function lineWidth(value) {
      if (value === undefined) {
        return this.$context2d.lineWidth;
      }

      this.$context2d.lineWidth = this.$parent._getPixel(value);
      return this;
    }
    /**
     * @param {number} value?
     * @return {number|this}
     */

  }, {
    key: "miterLimit",
    value: function miterLimit(value) {
      if (value === undefined) {
        return this.$context2d.miterLimit;
      }

      this.lineJoin("miter");
      this.$context2d.miterLimit = value;
      return this;
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {this|Offset}
     */

  }, {
    key: "shadowOffset",
    value: function shadowOffset(x, y) {
      if (arguments.length === 0) {
        return {
          x: this.$context2d.shadowOffsetX,
          y: this.$context2d.shadowOffsetY
        };
      }

      var _ref = [this.$parent._getPixel(x || 0), this.$parent._getPixel(y || 0)];
      this.$context2d.shadowOffsetX = _ref[0];
      this.$context2d.shadowOffsetY = _ref[1];
      return this;
    }
    /**
     * @param {string} text
     * @return {number}
     */

  }, {
    key: "measureText",
    value: function measureText(text) {
      return this.$parent.measureText(text);
    }
    /**
     * @return {this}
     */

  }, {
    key: "begin",
    value: function begin() {
      this.$context2d.beginPath();
      return this;
    }
    /**
     * @return {this}
     */

  }, {
    key: "close",
    value: function close() {
      this.$context2d.closePath();
      return this;
    }
    /**
     * @return {this}
     */

  }, {
    key: "save",
    value: function save() {
      this.$parent.save();
      return this;
    }
    /**
     * @return {this}
     */

  }, {
    key: "restore",
    value: function restore() {
      this.$parent.restore();
      return this;
    }
    /**
     * @param {number} angle?
     * @return {number | this}
     */

  }, {
    key: "rotate",
    value: function rotate(angle) {
      if (angle === undefined) {
        return this.$parent.rotate();
      }

      this.$parent.rotate(angle);
      return this;
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {offset|this}
     */

  }, {
    key: "translate",
    value: function translate(x, y) {
      if (arguments.length === 0) {
        return this.$parent.translate();
      }

      this.$parent.translate(x, y);
      return this;
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     * @returns this
     */

  }, {
    key: "arc",
    value: function arc(x, y, radius, astart, astop, reverse) {
      this.begin();
      this.$context2d.arc(this.$parent._getPixel(x), this.$parent._getPixel(y), radius, this.$parent._toRadius(astart) - Math.PI / 2, this.$parent._toRadius(astop) - Math.PI / 2, reverse);
      this.close();
      return this;
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     * @returns {this}
     */

  }, {
    key: "pie",
    value: function pie(x, y, radius, astart, astop, reverse) {
      return this.move(x, y).arc(x, y, radius, astart, astop, reverse).to(x, y);
    }
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @returns {this}
     */

  }, {
    key: "line",
    value: function line(x1, y1, x2, y2) {
      // this.begin();
      return this.move(x1, y1).to(x2, y2); // this.close();fix
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius1
     * @param  {number} radius2
     * @param  {number} astart
     * @param  {number} astop
     * @param  {number} reverse
     * @returns {this}
     */

  }, {
    key: "ellipse",
    value: function ellipse(x, y, radius1, radius2, astart, astop, reverse) {
      this.begin();
      this.$context2d.ellipse(this.$parent._getPixel(x), this.$parent._getPixel(y), radius1, radius2, this.$parent._toRadius(astart) - Math.PI / 2, this.$parent._toRadius(astop), reverse);
      this.close();
      return this;
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @returns {this}
     */

  }, {
    key: "circle",
    value: function circle(x, y, radius) {
      return this.arc(x, y, radius, 0, this.$parent.angleMode() === "degress" ? 360 : Math.PI * 2);
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @returns {this}
     */

  }, {
    key: "point",
    value: function point(x, y) {
      return this.circle(x, y, 1);
    }
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @param  {number} x3
     * @param  {number} y3
     * @returns {this}
     */

  }, {
    key: "triange",
    value: function triange(x1, y1, x2, y2, x3, y3) {
      return this.move(x1, y1).to(x2, y2).to(x3, y3);
    }
    /**
     * @param  {CanvasImageSource} image
     * @param  {number} sx?
     * @param  {number} sy?
     * @param  {number} swidth?
     * @param  {number} sheight?
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @returns {this}
     */

  }, {
    key: "drawImage",
    value: function drawImage(image) {
      var _this$$context2d;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      // @ts-expect-error
      (_this$$context2d = this.$context2d).drawImage.apply(_this$$context2d, [image].concat(args));

      return this;
    }
  }, {
    key: "rRect",
    value: function rRect(x, y, w, h, radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft) {
      this.begin();

      var _this$$parent$_argsRe = this.$parent._argsRect(x, y, w, h);

      var _this$$parent$_argsRe2 = _slicedToArray(_this$$parent$_argsRe, 4);

      x = _this$$parent$_argsRe2[0];
      y = _this$$parent$_argsRe2[1];
      w = _this$$parent$_argsRe2[2];
      h = _this$$parent$_argsRe2[3];
      var fontSize = this.$parent.fontSize();
      var arc = [AutoToPx(radiusTopLeft || 0, w, fontSize), AutoToPx(radiusTopRight || 0, h, fontSize), AutoToPx(radiusBottomRight || 0, w, fontSize), AutoToPx(radiusBottomLeft || 0, h, fontSize)];
      this.move(x, y).arcTo(x + w, y, x + w, y + h - arc[1], arc[1]).arcTo(x + w, y + h, x + w - arc[2], y + h, arc[2]).arcTo(x, y + h, x, y + h - arc[3], arc[3]).arcTo(x, y, x + w - arc[0], y, arc[0]);
      this.close();
      return this;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @memberof MyElement
     * @returns {this}
     */

  }, {
    key: "rect",
    value: function rect(x, y, width, height) {
      this.begin();

      var _this$$parent$_argsRe3 = this.$parent._argsRect(x, y, width, height);

      var _this$$parent$_argsRe4 = _slicedToArray(_this$$parent$_argsRe3, 4);

      x = _this$$parent$_argsRe4[0];
      y = _this$$parent$_argsRe4[1];
      width = _this$$parent$_argsRe4[2];
      height = _this$$parent$_argsRe4[3];
      this.$context2d.rect(this.$parent._getPixel(x), this.$parent._getPixel(y), width, height);
      this.close();
      return this;
    }
    /**
     * @param  {number} cpx
     * @param  {number} cpy
     * @param  {number} x
     * @param  {number} y
     * @return {this}
     */

  }, {
    key: "quadratic",
    value: function quadratic(cpx, cpy, x, y) {
      this.$context2d.quadraticCurveTo(cpx, cpy, x, y);
      return this;
    }
    /**
     * @param {number} cp1x
     * @param {number} cp1y
     * @param {number} cp2x
     * @param {number} cp2y
     * @param {number} x
     * @param {number} y
     * @return {this}
     */

  }, {
    key: "bezier",
    value: function bezier(cp1x, cp1y, cp2x, cp2y, x, y) {
      this.$context2d.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      return this;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {this}
     */

  }, {
    key: "move",
    value: function move(x, y) {
      this.$context2d.moveTo(this.$parent._getPixel(x), this.$parent._getPixel(y));
      return this;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {this}
     */

  }, {
    key: "to",
    value: function to(x, y) {
      this.$context2d.lineTo(this.$parent._getPixel(x), this.$parent._getPixel(y));
      return this;
    }
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {this}
     */

  }, {
    key: "fillText",
    value: function fillText(text, x, y, maxWidth) {
      this.$context2d.fillText(text, this.$parent._getPixel(x), this.$parent._getPixel(y), maxWidth);
      return this;
    }
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {this}
     */

  }, {
    key: "strokeText",
    value: function strokeText(text, x, y, maxWidth) {
      this.$context2d.strokeText(text, this.$parent._getPixel(x), this.$parent._getPixel(y), maxWidth);
      return this;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {this}
     */

  }, {
    key: "fillRect",
    value: function fillRect(x, y, width, height) {
      this.$context2d.fillRect(this.$parent._getPixel(x), this.$parent._getPixel(y), width, height);
      return this;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {this}
     */

  }, {
    key: "strokeRect",
    value: function strokeRect(x, y, width, height) {
      this.$context2d.strokeRect(this.$parent._getPixel(x), this.$parent._getPixel(y), width, height);
      return this;
    }
    /**
     * @param {number} value?
     * @return {this|number}
     */

  }, {
    key: "lineDashOffset",
    value: function lineDashOffset(value) {
      if (value === undefined) {
        return this.$context2d.lineDashOffset;
      }

      this.$context2d.lineDashOffset = value;
      return this;
    }
  }, {
    key: "lineDash",
    value: function lineDash() {
      for (var _len4 = arguments.length, segments = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        segments[_key4] = arguments[_key4];
      }

      if (segments.length === 0) {
        return this.$context2d.getLineDash();
      }

      if (Array.isArray(segments[0])) {
        this.$context2d.setLineDash(segments[0]);
      }

      this.$context2d.setLineDash(segments);
      return this;
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} radius
     * @return {this}
     */

  }, {
    key: "arcTo",
    value: function arcTo(x1, y1, x2, y2, radius) {
      this.$context2d.arcTo(this.$parent._getPixel(x1), this.$parent._getPixel(y1), this.$parent._getPixel(x2), this.$parent._getPixel(y2), radius);
      return this;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */

  }, {
    key: "isPoint",
    value: function isPoint(x, y) {
      return this.$context2d.isPointInPath(x, y);
    }
  }, {
    key: "createImageData",
    value: function createImageData(width, height) {
      return height ? this.$parent.createImageData(width, height) : this.$parent.createImageData(width);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {ImageData}
     */

  }, {
    key: "getImageData",
    value: function getImageData(x, y, width, height) {
      return this.$parent.getImageData(x, y, width, height);
    }
    /**
     * @param {ImageData} imageData
     * @param {number} x
     * @param {number} y
     * @param {number} xs?
     * @param {number} ys?
     * @param {number} width?
     * @param {number} height?
     * @return {this}
     */

  }, {
    key: "putImageData",
    value: function putImageData(imageData, x, y, xs, ys, width, height) {
      if (arguments.length === 7) {
        this.$parent.putImageData(imageData, x, y, xs, ys, width, height);
      } else {
        this.$parent.putImageData(imageData, x, y);
      }

      return this;
    }
    /**
     * @param {CanvasImageSource} image
     * @param {"repeat"|"repeat-x"|"repeat-y"|"no-repeat"} direction
     * @return {CanvasPattern | null}
     */

  }, {
    key: "createPattern",
    value: function createPattern(image, direction) {
      return this.$parent.createPattern(image, direction);
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} r1
     * @param {number} x2
     * @param {number} y2
     * @param {number} r2
     * @return {CanvasGradient}
     */

  }, {
    key: "createRadialGradient",
    value: function createRadialGradient(x1, y1, r1, x2, y2, r2) {
      return this.$parent.createRadialGradient(x1, y1, r1, x2, y2, r2);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {CanvasGradient}
     */

  }, {
    key: "createLinearGradient",
    value: function createLinearGradient(x, y, width, height) {
      return this.$parent.createLinearGradient(x, y, width, height);
    }
    /**
     * @param {"bevel"|"round"|"miter"} type?
     * @return {LineJoin|this}
     */

  }, {
    key: "lineJoin",
    value: function lineJoin(type) {
      if (type === undefined) {
        return this.$context2d.lineJoin;
      }

      this.$context2d.lineJoin = type;
      return this;
    }
    /**
     * @param {"butt"|"round"|"square"} value?
     * @return {LineCap|this}
     */

  }, {
    key: "lineCap",
    value: function lineCap(value) {
      if (value === undefined) {
        return this.$context2d.lineCap;
      }

      this.$context2d.lineCap = value;
      return this;
    }
    /**
     * @param {number} opacity?
     * @return {number|this}
     */

  }, {
    key: "shadowBlur",
    value: function shadowBlur(opacity) {
      if (opacity === undefined) {
        return this.$context2d.shadowBlur;
      }

      this.$context2d.shadowBlur = opacity;
      return this;
    }
    /**
     * @param {any[]} ...args
     * @return {this}
     */

  }, {
    key: "shadowColor",
    value: function shadowColor() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.$context2d.shadowColor = this.$parent._toRgb(args);
      return this;
    }
  }, {
    key: "drawFocusIfNeeded",
    value: function drawFocusIfNeeded(path, element) {
      if (element === undefined) {
        this.$context2d.drawFocusIfNeeded(path);
      } else {
        this.$context2d.drawFocusIfNeeded(path, element);
      }

      return this;
    }
  }, {
    key: "polyline",
    value: function polyline() {
      for (var _len6 = arguments.length, points = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        points[_key6] = arguments[_key6];
      }

      if (points.length > 0) {
        if (Array.isArray(points[0])) {
          this.move(points[0][0], points[0][1]);
          var index = 1;
          var length = points.length;

          while (index < length) {
            this.to(points[index][0], points[index][1]);
            index++;
          }
        } else {
          if (points.length > 1) {
            this.move(points[0], points[1]);
            var _index = 2;
            var _length = points.length;

            while (_index < _length - 1) {
              this.to(points[_index], points[_index + 1]);
              _index += 2;
            }
          }
        }
      }

      return this;
    }
  }, {
    key: "polygon",
    value: function polygon() {
      for (var _len7 = arguments.length, points = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        points[_key7] = arguments[_key7];
      }

      if (Array.isArray(points[0])) {
        this.polyline.apply(this, points.concat([points[0]]));
      } else {
        this.polyline.apply(this, points.concat([points[0], points[1]]));
      }

      return this;
    }
  }]);

  return MyElement;
}();

MyElement._count = 0;

var Point3D = /*#__PURE__*/function (_MyElement) {
  _inherits(Point3D, _MyElement);

  var _super = _createSuper(Point3D);

  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {any}
   */
  function Point3D(x, y, z) {
    var _this;

    _classCallCheck(this, Point3D);

    _this = _super.call(this);
    _this.x = 0;
    _this.y = 0;
    _this.z = 0;
    var _ref2 = [x || 0, y || 0, z || 0];
    _this.x = _ref2[0];
    _this.y = _ref2[1];
    _this.z = _ref2[2];
    return _this;
  }
  /**
   * @param {number} angle
   * @return {void}
   */


  _createClass(Point3D, [{
    key: "rotateX",
    value: function rotateX(angle) {
      this.y = this.y * this.$parent.cos(angle) + this.z * this.$parent.sin(angle);
      this.z = -this.y * this.$parent.sin(angle) + this.z * this.$parent.cos(angle);
    }
    /**
     * @param {number} angle
     * @return {void}
     */

  }, {
    key: "rotateY",
    value: function rotateY(angle) {
      this.x = this.x * this.$parent.cos(angle) + this.z * this.$parent.sin(angle);
      this.z = -this.x * this.$parent.sin(angle) + this.z * this.$parent.cos(angle);
    }
    /**
     * @param {number} angle
     * @return {void}
     */

  }, {
    key: "rotateZ",
    value: function rotateZ(angle) {
      this.x = this.x * this.$parent.cos(angle) - this.y * this.$parent.sin(angle);
      this.y = this.x * this.$parent.sin(angle) + this.y * this.$parent.cos(angle);
    }
  }]);

  return Point3D;
}(MyElement);

var Point3DCenter = /*#__PURE__*/function (_MyElement2) {
  _inherits(Point3DCenter, _MyElement2);

  var _super2 = _createSuper(Point3DCenter);

  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {any}
   */
  function Point3DCenter(x, y, z) {
    var _this2;

    _classCallCheck(this, Point3DCenter);

    _this2 = _super2.call(this);
    _this2.__z = 0;
    var _ref3 = [x, y, z || 0];
    _this2.__x = _ref3[0];
    _this2.__y = _ref3[1];
    _this2.__z = _ref3[2];
    return _this2;
  }

  _createClass(Point3DCenter, [{
    key: "scale",
    get: function get() {
      return Point3DCenter.persistent / (Point3DCenter.persistent + this.__z);
    }
  }, {
    key: "x",
    get: function get() {
      return (this.__x - this.$parent.width / 2) * this.scale + this.$parent.width / 2;
    },
    set: function set(value) {
      this.__x = value;
    }
  }, {
    key: "y",
    get: function get() {
      return (this.__y - this.$parent.height / 2) * this.scale + this.$parent.height / 2;
    },
    set: function set(value) {
      this.__y = value;
    }
  }, {
    key: "z",
    get: function get() {
      return this.__z;
    },
    set: function set(value) {
      this.__z = value;
    }
  }, {
    key: "get",
    value: function get(prop) {
      if (typeof prop === "number") {
        return this.scale * prop;
      }

      return this.scale * this[prop];
    }
  }]);

  return Point3DCenter;
}(MyElement);

Point3DCenter.persistent = 1000;

function createElement(callback) {
  return new ( /*#__PURE__*/function (_MyElement3) {
    _inherits(_class, _MyElement3);

    var _super3 = _createSuper(_class);

    function _class() {
      var _this3;

      _classCallCheck(this, _class);

      _this3 = _super3.apply(this, arguments);

      _this3.draw = function () {
        callback(_assertThisInitialized(_this3));
      };

      return _this3;
    }

    return _class;
  }(MyElement))();
}

var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this.__events = Object.create(null);
  }
  /**
   * @param {any} typeofcallback==="function"
   * @return {any}
   */


  _createClass(Emitter, [{
    key: "on",
    value: function on(name, callback) {
      var _this4 = this;

      if (typeof callback === "function") {
        if (name in this.__events) {
          this.__events[name].push(callback);
        } else {
          this.__events[name] = [callback];
        }
      }

      return function () {
        _this4.off(name, callback);
      };
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback?
     * @return {void}
     */

  }, {
    key: "off",
    value: function off(name, callback) {
      if (typeof callback === "function") {
        this.__events[name] = this.__events[name].filter(function (item) {
          return item !== callback;
        });

        if (this.__events[name].length === 0) {
          delete this.__events[name];
        }
      } else {
        delete this.__events[name];
      }
      /**
       * @param {string} name
       * @param {any[]} ...payload
       * @return {void}
       */

      /**
       * @param {string} name
       * @param {any[]} ...payload
       * @return {void}
       */

    }
    /**
     * @param {string} name
     * @param {any[]} ...payload
     * @return {void}
     */

  }, {
    key: "emit",
    value: function emit(name) {
      if (name in this.__events) {
        for (var _len8 = arguments.length, payload = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
          payload[_key8 - 1] = arguments[_key8];
        }

        for (var index = 0, length = this.__events[name].length; index < length; index++) {
          var _this$__events$name;

          (_this$__events$name = this.__events[name])[index].apply(_this$__events$name, payload);
        }
      }
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback
     * @return {void}
     */

  }, {
    key: "once",
    value: function once(name, callback) {
      var _this5 = this;

      var handler = function handler() {
        callback.apply(void 0, arguments);

        _this5.off(name, handler);
      };

      this.on(name, handler);
    }
  }]);

  return Emitter;
}();

function reactiveDefine(value, callback) {
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (value !== null && _typeof(value) === "object") {
    /// reactive children
    if (Array.isArray(value)) {
      /// bind to propertyes
      /// reactive method array
      if (!value.__reactive) {
        ["push", "pop", "shift", "unshift", "splice"].forEach(function (name) {
          var proto = value[name];
          Object.defineProperty(value, name, {
            writable: false,
            enumerable: false,
            configurable: true,
            value: function value() {
              var newValue = proto.apply(this, arguments);
              callback(_toConsumableArray(parent), this, newValue);
              return newValue;
            }
          });
        });
        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true
        });
      } ////


      value.forEach(function (item, index) {
        if (item !== null && _typeof(item) === "object") {
          reactiveDefine(item, callback, [].concat(_toConsumableArray(parent), [index + ""]));
        }
      });
    } else {
      //// if object ===> reactive attribute
      /// create __store if not exists
      /// reactive social
      if (!value.__reactive) {
        Object.defineProperty(value, "__store", {
          writable: true,
          enumerable: false,
          configurable: true,
          value: _objectSpread({}, value)
        });
        Object.defineProperty(value, "__reactive", {
          writable: false,
          enumerable: false,
          configurable: true,
          value: true
        });
      } else {
        value.__store = _objectSpread({}, value);
      }

      var _loop = function _loop(key) {
        Object.defineProperty(value, key, {
          get: function get() {
            var _value$__store;

            return (_value$__store = value.__store) === null || _value$__store === void 0 ? void 0 : _value$__store[key];
          },
          enumerable: true,
          set: function set(newValue) {
            var _value$__store2;

            var old = (_value$__store2 = value.__store) === null || _value$__store2 === void 0 ? void 0 : _value$__store2[key];

            if (value.__store) {
              value.__store[key] = newValue;
            }

            if (newValue !== old) {
              reactiveDefine(newValue, callback, [].concat(_toConsumableArray(parent), [key]));
              callback([].concat(_toConsumableArray(parent), [key]), old, newValue);
            }
          }
        });
        reactiveDefine(value[key], callback, [].concat(_toConsumableArray(parent), [key]));
      };

      for (var key in value) {
        _loop(key);
      }
    }
  }
}

var Store = /*#__PURE__*/function () {
  /**
   * @param {Object} store?
   * @return {any}
   */
  function Store(store) {
    var _this6 = this;

    _classCallCheck(this, Store);

    this.__emitter = new Emitter();

    for (var key in store) {
      this[key] = store[key];
    }

    reactiveDefine(this, function (paths, oldVal, newVal) {
      _this6.__emitter.emit(paths.join("."), oldVal, newVal);
    });
  }
  /**
   * @param {Store|Object} object
   * @param {string} key
   * @param {any} value
   * @return {void}
   */


  _createClass(Store, [{
    key: "$set",
    value: function $set(object, key, value) {
      var _this7 = this;

      if (!(key in object)) {
        //reactive
        object[key] = undefined;
        reactiveDefine(object, function (paths, oldVal, newVal) {
          _this7.__emitter.emit(paths.join("."), oldVal, newVal);
        });
      }

      object[key] = value;
    }
    /**
     * @param {string} key
     * @param {CallbackEvent} callback
     * @return {any}
     */

  }, {
    key: "$watch",
    value: function $watch(key, callback) {
      return this.__emitter.on(key, callback);
    }
  }]);

  return Store;
}();

var Stament = /*#__PURE__*/function () {
  function Stament() {
    _classCallCheck(this, Stament);

    this.__store = new Store();
  }
  /**
   * @param {string} name
   * @param {CallbackEvent} callback
   * @return {void}
   */


  _createClass(Stament, [{
    key: "on",
    value: function on(name, callback) {
      if (this.__store[name]) {
        callback();
      } else {
        var watcher = this.__store.$watch(name, function () {
          callback();
          watcher();
        });
      }
    }
    /**
     * @param {string} name
     * @return {void}
     */

  }, {
    key: "emit",
    value: function emit(name) {
      this.__store.$set(this.__store, name, true);
    }
  }]);

  return Stament;
}();

var inited = false;
var emitter = new Emitter();
/**
 * @export
 * @param {({
 *   (): Promise<void> | void;
 * })} callback
 * @return {*}  {Promise<void>}
 */

function _setup2(_x) {
  return _setup.apply(this, arguments);
}

function _setup() {
  _setup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(callback) {
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(document.readyState === "complete")) {
              _context6.next = 7;
              break;
            }

            _context6.next = 3;
            return callback();

          case 3:
            inited = true;
            emitter.emit("load");
            _context6.next = 9;
            break;

          case 7:
            _context6.next = 9;
            return new Promise(function (resolve) {
              function load() {
                document.removeEventListener("DOMContentLoaded", load);
                window.removeEventListener("load", load);
                callback();
                resolve();
                inited = true;
                emitter.emit("load");
              }

              document.addEventListener("DOMContentLoaded", load);
              window.addEventListener("load", load);
            });

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _setup.apply(this, arguments);
}

function __draw(callback, canvas) {
  if ((canvas === null || canvas === void 0 ? void 0 : canvas.allowClear) === true) {
    canvas.clear();
  }

  callback();

  if (canvas ? canvas.allowLoop === true : false) {
    var id = requestAnimationFrame(function () {
      __draw(callback, canvas);
    });
    canvas === null || canvas === void 0 ? void 0 : canvas._setIdFrame(id);
  }
}
/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */


function _draw(callback, canvas) {
  if (inited) {
    void __draw(callback, canvas);
  } else {
    void emitter.once("load", function () {
      _draw(callback, canvas);
    });
  }
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */


function keyPressed(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("keydown", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */


function changeSize(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("resize", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */


function mouseWheel(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("wheel", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */


function mousePressed(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("mousedown", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */


function mouseClicked(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("click", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */


function mouseMoved(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("mousemove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */


function touchStart(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("touchstart", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */


function touchMove(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("touchmove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {noop}
 */


function touchEnd(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return bindEvent("touchend", callback, element);
}

var fCanvas = /*#__PURE__*/function () {
  /**
   * @return {any}
   */
  function fCanvas(element, width, height) {
    var _this8 = this;

    _classCallCheck(this, fCanvas);

    this._id = fCanvas._count++;
    this._stamentReady = new Stament();
    this.__store = Object.create({
      _context2dCaching: null,
      __translate: Object.create({
        x: 0,
        y: 0,
        sumX: 0,
        sumY: 0
      }),
      __scale: Object.create({
        x: 0,
        y: 0,
        sumX: 0,
        sumY: 0
      }),
      __rotate: Object.create({
        now: 0,
        sum: 0
      }),
      __attributeContext: Object.create({
        alpha: true,
        desynchronized: false
      }),
      _clear: true,
      _loop: true,
      _preventTouch: false,
      _stopTouch: false,
      _idFrame: null,
      _existsPreload: false,
      _angleMode: "degress",
      _rectMode: "corner",
      _colorMode: "rgb",
      _useFloatPixel: true,
      _pmouseX: 0,
      _pmouseY: 0,
      _realMouseIsPressed: false
    });

    this._handlerEvent = function (event) {
      try {
        var _this8$touches$, _this8$touches$2;

        _this8.__store._pmouseX = ((_this8$touches$ = _this8.touches[0]) === null || _this8$touches$ === void 0 ? void 0 : _this8$touches$.x) || 0;
        _this8.__store._pmouseY = ((_this8$touches$2 = _this8.touches[0]) === null || _this8$touches$2 === void 0 ? void 0 : _this8$touches$2.y) || 0;
        _this8.touches = event.type !== "mouseout" ? getTouchInfo(_this8.$el, event.touches || [event]) : [];
        _this8.changedTouches = getTouchInfo(_this8.$el, event.changedTouches || [event]);

        if (_this8.__store._preventTouch) {
          event.preventDefault();
        }

        if (_this8.__store._stopTouch) {
          event.stopPropagation();
        }
      } catch (_unused2) {}
    };

    this._handlerEventMousePress = function (event) {
      if (event.type === "mousedown") {
        _this8.__store._realMouseIsPressed = true;
        return;
      }

      if (event.type === "mouseup") {
        _this8.__store._realMouseIsPressed = false;
        return;
      }

      _this8.__store._realMouseIsPressed = (event === null || event === void 0 ? void 0 : event.touches.length) > 0;
    };

    this.touches = [];
    this.changedTouches = [];
    /**
     * @param {noop} callback
     * @return {*}  {MyElement}
     */

    this.createElement = createElement;

    if (arguments.length === 1 || arguments.length === 3) {
      if (element instanceof HTMLCanvasElement) {
        this._el = element;
      } else {
        var el = document.querySelector(element);

        if (el instanceof HTMLCanvasElement) {
          this._el = el;
        } else {
          console.warn("fCanvas: \"".concat(element, "\" is not instanceof HTMLCanvasElement."));
          this._el = document.createElement("canvas");
        }
      }
    } else {
      this._el = document.createElement("canvas");
    }

    switch (arguments.length) {
      case 2:
        this.size(element || 0, width || 0);
        break;

      case 3:
        this.size(width || 0, height || 0);
        break;
    }

    this._restartEvents(this._el);
  }
  /**
   * @return {HTMLCanvasElement}
   */


  _createClass(fCanvas, [{
    key: "$el",
    get: function get() {
      return this._el;
    }
    /**
     * @param {number} width
     * @param {number} height
     * @memberof fCanvas
     */

  }, {
    key: "size",
    value: function size(width, height) {
      this.$el.width = width;
      this.$el.height = height;
    }
  }, {
    key: "_cancelEventsSystem",
    value: function _cancelEventsSystem(el) {
      var _this9 = this;

      ["touchstart", "mouseover", "touchmove", "mousemove", "touchend", "mouseout"].forEach(function (event) {
        el.removeEventListener(event, _this9._handlerEvent);
      });
      [// for mouseIsPressed
      "touchstart", "mousedown", "touchend", "mouseup"].forEach(function (event) {
        el.removeEventListener(event, _this9._handlerEventMousePress);
      });
    }
  }, {
    key: "_restartEvents",
    value: function _restartEvents(el) {
      this._cancelEventsSystem(el);

      el.addEventListener(isMobile() ? "touchstart" : "mouseover", this._handlerEvent, passive ? {
        passive: true
      } : undefined);
      el.addEventListener(isMobile() ? "touchmove" : "mousemove", this._handlerEvent, passive ? {
        passive: true
      } : undefined);
      el.addEventListener(isMobile() ? "touchend" : "mouseout", this._handlerEvent, passive ? {
        passive: true
      } : undefined);
      el.addEventListener(isMobile() ? "touchstart" : "mousedown", this._handlerEventMousePress);
      el.addEventListener(isMobile() ? "touchend" : "mouseup", this._handlerEventMousePress);
    }
    /**
     * @return {*}  {boolean}
     */

  }, {
    key: "preventTouch",
    value: function preventTouch() {
      this.__store._preventTouch = true;
    }
    /**
     * @return {*}  {boolean}
     */

  }, {
    key: "stopTouch",
    value: function stopTouch() {
      this.__store._stopTouch = true;
    }
    /**
     * @return {number | null}
     */

  }, {
    key: "mouseX",
    get: function get() {
      var _this$touches$;

      return ((_this$touches$ = this.touches[0]) === null || _this$touches$ === void 0 ? void 0 : _this$touches$.x) || null;
    }
    /**
     * @return {number | null}
     */

  }, {
    key: "mouseY",
    get: function get() {
      var _this$touches$2;

      return ((_this$touches$2 = this.touches[0]) === null || _this$touches$2 === void 0 ? void 0 : _this$touches$2.y) || null;
    }
    /**
     * @return {numbe}
     */

  }, {
    key: "movedX",
    get: function get() {
      var _this$touches;

      return ((_this$touches = this.touches[this.touches.length - 1]) === null || _this$touches === void 0 ? void 0 : _this$touches.x) || 0;
    }
    /**
     * @return {numbe}
     */

  }, {
    key: "movedY",
    get: function get() {
      var _this$touches2;

      return ((_this$touches2 = this.touches[this.touches.length - 1]) === null || _this$touches2 === void 0 ? void 0 : _this$touches2.y) || 0;
    }
    /**
     * @return {numbe}
     */

  }, {
    key: "pmouseX",
    get: function get() {
      return this.__store._pmouseX;
    }
    /**
     * @return {numbe}
     */

  }, {
    key: "pmouseY",
    get: function get() {
      return this.__store._pmouseY;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "mouseIsPressed",
    get: function get() {
      return this.__store._realMouseIsPressed;
    }
    /**
     * @return {number}
     */

  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "_createNewContext2d",
    value: function _createNewContext2d() {
      this.__store._context2dCaching = this.$el.getContext("2d", this.__store.__attributeContext);
    }
    /**
     * @return {void}
     */

  }, {
    key: "blur",
    value: function blur() {
      this.__store.__attributeContext.alpha = true;

      this._createNewContext2d();
    }
    /**
     * @return {void}
     */

  }, {
    key: "noBlur",
    value: function noBlur() {
      this.__store.__attributeContext.alpha = false;

      this._createNewContext2d();
    }
    /**
     * @return {void}
     */

  }, {
    key: "desync",
    value: function desync() {
      this.__store.__attributeContext.desynchronized = true;

      this._createNewContext2d();
    }
    /**
     * @return {void}
     */

  }, {
    key: "noDesync",
    value: function noDesync() {
      this.__store.__attributeContext.desynchronized = false;

      this._createNewContext2d();
    }
    /**
     * @return {void}
     */

  }, {
    key: "useFloatPixel",
    value: function useFloatPixel() {
      this.__store._useFloatPixel = true;
    }
    /**
     * @return {void}
     */

  }, {
    key: "noFloatPixel",
    value: function noFloatPixel() {
      this.__store._useFloatPixel = false;
    }
  }, {
    key: "_getPixel",
    value: function _getPixel(value) {
      return this.__store._useFloatPixel ? value : Math.round(value);
    }
    /**
     * @return {CanvasRenderingContext2D}
     */

  }, {
    key: "$context2d",
    get: function get() {
      if (this.__store._context2dCaching === null) {
        this._createNewContext2d();
      }

      return this.__store._context2dCaching;
    }
    /**
     * @param {HTMLElement=document.body} parent
     * @return {void}
     */

  }, {
    key: "append",
    value: function append() {
      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

      if (parent.contains(this.$el) === false) {
        parent.appendChild(this.$el);
      }
    }
    /**
     * @param {(HTMLCanvasElement | string)} element
     */

  }, {
    key: "mount",
    value: function mount(element) {
      var el;

      if (typeof element === "string") {
        el = Array.from(document.querySelectorAll(element)).find(function (item) {
          return item.tagName === "CANVAS";
        }) || this._el;
      } else {
        if (element.tagName !== "CANVAS") {
          console.error("fCanvas<sys>: function .mount() not allow element \"".concat(element === null || element === void 0 ? void 0 : element.tagName.toLocaleLowerCase()));
          el = this._el;
        } else {
          el = element;
        }
      }

      if (this._el !== el) {
        this._cancelEventsSystem(this._el);

        this._el = el;

        this._restartEvents(el);
      }
    }
    /**
     * @return {void}
     */

  }, {
    key: "noClear",
    value: function noClear() {
      this.__store._clear = false;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "allowClear",
    get: function get() {
      return this.__store._clear;
    }
    /**
     * @param {MyElement} element
     * @return {void}
     */

  }, {
    key: "run",
    value: function run() {
      var index = 0;

      for (var _len9 = arguments.length, elements = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        elements[_key9] = arguments[_key9];
      }

      var length = elements.length;

      while (index < length) {
        elements[index++]._run(this);
      }
    }
    /**
     * @return {number}
     */

  }, {
    key: "width",
    get: function get() {
      return this.$el.width;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    ,
    set: function set(value) {
      this.$el.width = value;
    }
    /**
     * @return {number}
     */

  }, {
    key: "height",
    get: function get() {
      return this.$el.height;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    ,
    set: function set(value) {
      this.$el.height = value;
    }
    /**
     * @return {number}
     */

  }, {
    key: "windowWidth",
    get: function get() {
      return windowSize.windowWidth.get();
    }
    /**
     * @return {number}
     */

  }, {
    key: "windowHeight",
    get: function get() {
      return windowSize.windowHeight.get();
    }
    /**
     * @return {void}
     */

  }, {
    key: "save",
    value: function save() {
      this.$context2d.save();
    }
    /**
     * @return {void}
     */

  }, {
    key: "restore",
    value: function restore() {
      this.$context2d.restore();
    }
  }, {
    key: "_toRadius",
    value: function _toRadius(value) {
      return this.__store._angleMode === "degress" ? value * Math.PI / 180 : value;
    }
  }, {
    key: "_toDegress",
    value: function _toDegress(value) {
      return this.__store._angleMode === "degress" ? value * 180 / Math.PI : value;
    }
  }, {
    key: "_toRgb",
    value: function _toRgb(_ref4) {
      var _ref5 = _slicedToArray(_ref4, 4),
          _ref5$ = _ref5[0],
          red = _ref5$ === void 0 ? 0 : _ref5$,
          _ref5$2 = _ref5[1],
          green = _ref5$2 === void 0 ? red : _ref5$2,
          _ref5$3 = _ref5[2],
          blue = _ref5$3 === void 0 ? green : _ref5$3,
          _ref5$4 = _ref5[3],
          alpha = _ref5$4 === void 0 ? 1 : _ref5$4;

      if (Array.isArray(red)) {
        return this._toRgb(red);
      } else {
        if (_typeof(red) === "object" && red !== null) {
          return red;
        }

        if (typeof red === "string") {
          return red;
        } else {
          var after = this.__store._colorMode.match(/hsl|hsb/i) ? "%" : "";
          return "".concat(this.__store._colorMode, "a(").concat([red, green + after, blue + after, alpha].join(","), ")");
        }
      }
    }
  }, {
    key: "_argsRect",
    value: function _argsRect(x, y, width, height) {
      switch (this.__store._rectMode) {
        case "center":
          return [x - width / 2, y - height / 2, width, height];

        case "radius":
          return [x - width, y - height, width * 2, height * 2];

        case "corners":
          return [x - width, y - height, width, height];

        case "corner":
        default:
          return [x, y, width, height];
      }
    }
    /**
     * @param {AngleType} value?
     * @return {any}
     */

  }, {
    key: "angleMode",
    value: function angleMode(value) {
      if (value === undefined) {
        return this.__store._angleMode;
      }

      this.__store._angleMode = value;
    }
    /**
     * @param {ColorType} value?
     * @return {any}
     */

  }, {
    key: "colorMode",
    value: function colorMode(value) {
      if (value === undefined) {
        return this.__store._colorMode;
      }

      this.__store._colorMode = value;
    }
  }, {
    key: "rectMode",
    value: function rectMode(value) {
      if (value === undefined) {
        return this.__store._rectMode;
      }

      this.__store._rectMode = value;
    }
    /**
     * @param {number} value?
     * @return {any}
     */

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
        value = AutoToPx(value, size, size) || 16;
        this.font([weight, "".concat(value, "px"), family].join(" "));
      }
    }
    /**
     * @param {string} value?
     * @return {any}
     */

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
    /**
     * @param {string} value?
     * @return {any}
     */

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
    /**
     * @param {number=0} x
     * @param {number=0} y
     * @param {number=this.width} w
     * @param {number=this.height} h
     * @return {void}
     */

  }, {
    key: "clear",
    value: function clear() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.width;
      var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.height;
      this.$context2d.clearRect(x, y, w, h);
    }
    /**
     * @param {ParamsToRgb} ...params
     * @return {void}
     */

  }, {
    key: "background",
    value: function background() {
      for (var _len10 = arguments.length, params = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        params[_key10] = arguments[_key10];
      }

      this.$context2d.fillStyle = this._toRgb(params);
      this.$context2d.fill();
      this.$context2d.fillRect(0, 0, this.width, this.height);
    }
    /**
     * @param {CanvasImageSource} image
     * @return {void}
     */

  }, {
    key: "backgroundImage",
    value: function backgroundImage(image) {
      this.$context2d.drawImage(image, 0, 0, this.width, this.height);
    }
    /**
     * @param {ImageData|number} width
     * @param {number} height?
     * @return {ImageData}
     */

  }, {
    key: "createImageData",
    value: function createImageData(width, height) {
      return height ? this.$context2d.createImageData(width, height) : this.$context2d.createImageData(width);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {ImageData}
     */

  }, {
    key: "getImageData",
    value: function getImageData(x, y, width, height) {
      return this.$context2d.getImageData(x, y, width, height);
    }
    /**
     * @param {ImageData} imageData
     * @param {number} x
     * @param {number} y
     * @param {number} xs?
     * @param {number} ys?
     * @param {number} width?
     * @param {number} height?
     * @return {void}
     */

  }, {
    key: "putImageData",
    value: function putImageData(imageData, x, y, xs, ys, width, height) {
      if (arguments.length === 7) {
        this.$context2d.putImageData(imageData, x, y, xs, ys, width, height);
      } else {
        this.$context2d.putImageData(imageData, x, y);
      }
    }
    /**
     * @param {CanvasImageSource} image
     * @param {"repeat"|"repeat-x"|"repeat-y"|"no-repeat"} direction
     * @return {CanvasPattern | null}
     */

  }, {
    key: "createPattern",
    value: function createPattern(image, direction) {
      return this.$context2d.createPattern(image, direction);
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} r1
     * @param {number} x2
     * @param {number} y2
     * @param {number} r2
     * @return {CanvasGradient}
     */

  }, {
    key: "createRadialGradient",
    value: function createRadialGradient(x1, y1, r1, x2, y2, r2) {
      return this.$context2d.createRadialGradient(x1, y1, r1, x2, y2, r2);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {CanvasGradient}
     */

  }, {
    key: "createLinearGradient",
    value: function createLinearGradient(x, y, width, height) {
      return this.$context2d.createLinearGradient(x, y, width, height);
    }
    /**
     * @param {any} type="image/png"
     * @param {number} scale?
     * @return {string}
     */

  }, {
    key: "toDataURL",
    value: function toDataURL() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "image/png";
      var scale = arguments.length > 1 ? arguments[1] : undefined;
      return this.$el.toDataURL(type, scale);
    }
    /**
     * @param {number} value?
     * @return {any}
     */

  }, {
    key: "rotate",
    value: function rotate(value) {
      if (value === undefined) {
        return this.__store.__rotate.now;
      } else {
        this.$context2d.rotate(this.__store.__rotate.now = this._toRadius(value));
        this.__store.__rotate.sum += this.__store.__rotate.now % 360;
      }
    }
    /**
     * @return {void}
     */

  }, {
    key: "resetRotate",
    value: function resetRotate() {
      this.rotate(-this.__store.__rotate.sum);
    }
    /**
     * @return {void}
     */

  }, {
    key: "resetTransform",
    value: function resetTransform() {
      this.setTransform(1, 0, 0, 1, 0, 0);
    }
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */

  }, {
    key: "preload",
    value: function () {
      var _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(callback) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.__store._existsPreload = true;
                _context.next = 3;
                return callback();

              case 3:
                this._stamentReady.emit("preloaded");

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function preload(_x2) {
        return _preload.apply(this, arguments);
      }

      return preload;
    }()
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */

  }, {
    key: "setup",
    value: function () {
      var _setup3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(callback) {
        var _this10 = this;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.__store._existsPreload) {
                  _context3.next = 4;
                  break;
                }

                this._stamentReady.on("preloaded", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                  return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return _setup2(callback);

                        case 2:
                          _this10._stamentReady.emit("setuped");

                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })));

                _context3.next = 7;
                break;

              case 4:
                _context3.next = 6;
                return _setup2(callback);

              case 6:
                this._stamentReady.emit("setuped");

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setup(_x3) {
        return _setup3.apply(this, arguments);
      }

      return setup;
    }()
    /**
     * @param {Function} callback
     * @return {void}
     */

  }, {
    key: "draw",
    value: function draw(callback) {
      var _this11 = this;

      this._stamentReady.on("setuped", function () {
        _draw(callback, _this11);
      });
    }
    /**
     * @param {string} value?
     * @return {any}
     */

  }, {
    key: "font",
    value: function font(value) {
      if (value === undefined) {
        return this.$context2d.font;
      }

      this.$context2d.font = value;
    }
    /**
     * @param {TextAlignType} value?
     * @return {any}
     */

  }, {
    key: "textAlign",
    value: function textAlign(value) {
      if (value === undefined) {
        return this.$context2d.textAlign;
      }

      this.$context2d.textAlign = value;
    }
    /**
     * @param {TextBaselineType} value?
     * @return {any}
     */

  }, {
    key: "textBaseline",
    value: function textBaseline(value) {
      if (value === undefined) {
        return this.$context2d.textBaseline;
      }

      this.$context2d.textBaseline = value;
    }
    /**
     * @param {GlobalCompositeOperationType} value?
     * @return {any}
     */

  }, {
    key: "operation",
    value: function operation(value) {
      if (value === undefined) {
        return this.$context2d.globalCompositeOperation;
      }

      this.$context2d.globalCompositeOperation = value;
    }
    /**
     * @param {number} alpha?
     * @return {number | void}
     */

  }, {
    key: "alpha",
    value: function alpha(_alpha) {
      if (_alpha === undefined) {
        return this.$context2d.globalAlpha;
      }

      this.$context2d.globalAlpha = _alpha;
    }
  }, {
    key: "resetAlpha",
    value: function resetAlpha() {
      this.alpha(1);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {any}
     */

  }, {
    key: "translate",
    value: function translate(x, y) {
      if (arguments.length === 0) {
        return {
          x: this.__store.__translate.x,
          y: this.__store.__translate.y
        };
      }

      x = this._getPixel(x || 0);
      y = this._getPixel(y || 0);
      this.$context2d.translate(x, y);
      this.__store.__translate.sumX += x;
      this.__store.__translate.sumY += y;
    }
    /**
     * @return {void}
     */

  }, {
    key: "resetTranslate",
    value: function resetTranslate() {
      this.$context2d.translate(-this.__store.__translate.sumX, -this.__store.__translate.sumY);
      this.__store.__translate.sumX = 0;
      this.__store.__translate.sumY = 0;
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {any}
     */

  }, {
    key: "scale",
    value: function scale(x, y) {
      if (arguments.length === 0) {
        return {
          x: this.__store.__scale.x,
          y: this.__store.__scale.y
        };
      }

      this.$context2d.scale(x, y);
      this.__store.__scale.sumX += x || 0;
      this.__store.__scale.sumY += y || 0;
    }
    /**
     * @return {void}
     */

  }, {
    key: "resetScale",
    value: function resetScale() {
      this.$context2d.translate(-this.__store.__scale.sumX, -this.__store.__scale.sumY);
      this.__store.__translate.sumX = 0;
      this.__store.__translate.sumY = 0;
    }
    /**
     * @param {any} fillRule?
     * @param {any} path?
     * @return {void}
     */

  }, {
    key: "clip",
    value: function clip(fillRule, path) {
      if (path === undefined) {
        this.$context2d.clip(fillRule);
      }

      this.$context2d.clip(path, fillRule);
    }
    /**
     * @param {number|DOMMatrix} m11?
     * @param {number} m12?
     * @param {number} m21?
     * @param {number} m22?
     * @param {number} dx?
     * @param {number} dy?
     * @return {any}
     */

  }, {
    key: "transform",
    value: function transform(m11, m12, m21, m22, dx, dy) {
      if (arguments.length === 0) {
        return this.$context2d.getTransform();
      }

      if (m11 instanceof DOMMatrix) {
        var _m11$a = m11.a,
            a = _m11$a === void 0 ? 1 : _m11$a,
            _m11$b = m11.b,
            b = _m11$b === void 0 ? 0 : _m11$b,
            _m11$c = m11.c,
            c = _m11$c === void 0 ? 0 : _m11$c,
            _m11$d = m11.d,
            d = _m11$d === void 0 ? 1 : _m11$d,
            _m11$e = m11.e,
            e = _m11$e === void 0 ? 0 : _m11$e,
            _m11$f = m11.f,
            f = _m11$f === void 0 ? 0 : _m11$f;
        this.$context2d.transform(a, b, c, d, e, f);
      } else {
        this.$context2d.transform(m11, m12, m21, m22, dx, dy);
      }
    }
    /**
     * @param {number|DOMMatrix} m11
     * @param {number} m12?
     * @param {number} m21?
     * @param {number} m22?
     * @param {number} dx?
     * @param {number} dy?
     * @return {void}
     */

  }, {
    key: "setTransform",
    value: function setTransform(m11, m12, m21, m22, dx, dy) {
      if (m11 instanceof DOMMatrix) {
        var _m11$a2 = m11.a,
            a = _m11$a2 === void 0 ? 1 : _m11$a2,
            _m11$b2 = m11.b,
            b = _m11$b2 === void 0 ? 0 : _m11$b2,
            _m11$c2 = m11.c,
            c = _m11$c2 === void 0 ? 0 : _m11$c2,
            _m11$d2 = m11.d,
            d = _m11$d2 === void 0 ? 1 : _m11$d2,
            _m11$e2 = m11.e,
            e = _m11$e2 === void 0 ? 0 : _m11$e2,
            _m11$f2 = m11.f,
            f = _m11$f2 === void 0 ? 0 : _m11$f2;
        this.$context2d.setTransform(a, b, c, d, e, f);
      } else {
        this.$context2d.setTransform(m11, m12, m21, m22, dx, dy);
      }
    }
    /**
     * @param {string} text
     * @return {number}
     */

  }, {
    key: "measureText",
    value: function measureText(text) {
      return this.$context2d.measureText(text).width;
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "sin",
    value: function sin(angle) {
      return Math.sin(this._toRadius(angle));
    }
    /**
     * @param {number} sin
     * @return {number}
     */

  }, {
    key: "asin",
    value: function asin(sin) {
      return this._toDegress(Math.asin(sin));
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "cos",
    value: function cos(angle) {
      return Math.cos(this._toRadius(angle));
    }
    /**
     * @param {number} cos
     * @return {number}
     */

  }, {
    key: "acos",
    value: function acos(cos) {
      return this._toDegress(Math.acos(cos));
    }
    /**
     * @param {number} angle
     * @return {number}
     */

  }, {
    key: "tan",
    value: function tan(angle) {
      return Math.tan(this._toRadius(angle));
    }
    /**
     * @param {number} tan
     * @return {number}
     */

  }, {
    key: "atan",
    value: function atan(tan) {
      return this._toDegress(Math.atan(tan));
    }
    /**
     * @param {number} y
     * @param {number} x
     * @return {number}
     */

  }, {
    key: "atan2",
    value: function atan2(y, x) {
      return this._toDegress(Math.atan2(y, x));
    }
    /**
     * @return {void}
     */

  }, {
    key: "cursor",
    value: function cursor() {
      this.$el.style.cursor = "auto";
    }
    /**
     * @return {void}
     */

  }, {
    key: "noCursor",
    value: function noCursor() {
      this.$el.style.cursor = "none";
    } // TODO: for system callback

  }, {
    key: "_setIdFrame",
    value: function _setIdFrame(id) {
      this.__store._idFrame = id;
    }
    /**
     * @return {void}
     */

  }, {
    key: "loop",
    value: function loop() {
      this.__store._loop = true;

      this._stamentReady.emit("setuped");
    }
    /**
     * @return {void}
     */

  }, {
    key: "noLoop",
    value: function noLoop() {
      this.__store._loop = false;

      if (this.__store._idFrame) {
        cancelAnimationFrame(this.__store._idFrame);
      }
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "allowLoop",
    get: function get() {
      return this.__store._loop;
    }
  }, {
    key: "on",
    value: function on(name, callback) {
      return bindEvent(name, callback, this.$el);
    }
  }, {
    key: "off",
    value: function off(name, callback) {
      if (typeof name === "function") {
        name();
      } else {
        this.$el.removeEventListener(name, callback);
      }
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseIn",
    value: function mouseIn(callback) {
      return this.on("mouseover", callback);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseOut",
    value: function mouseOut(callback) {
      return this.on("mouseout", callback);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "touchStart",
    value: function touchStart(callback) {
      return this.on("touchstart", callback);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "touchMove",
    value: function touchMove(callback) {
      return this.on("touchmove", callback);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "touchEnd",
    value: function touchEnd(callback) {
      return this.on("touchend", callback);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseMove",
    value: function mouseMove(callback) {
      return this.on("mousemove", callback);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseUp",
    value: function mouseUp(callback) {
      return this.on("mouseup", callback);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseDown",
    value: function mouseDown(callback) {
      return this.on("mousedown", callback);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */

  }, {
    key: "mouseClicked",
    value: function mouseClicked(callback) {
      return this.on("click", callback);
    }
  }]);

  return fCanvas;
}();

fCanvas.Element = MyElement;
fCanvas.Point3D = Point3D;
fCanvas.Point3DCenter = Point3DCenter;
fCanvas._count = 0;
var noopFCanvas = new fCanvas(0, 0);

function calculateRemainder2D(xComponent, yComponent, vector) {
  if (xComponent !== 0) {
    vector.x = vector.x % xComponent;
  }

  if (yComponent !== 0) {
    vector.y = vector.y % yComponent;
  }

  return vector;
}

function calculateRemainder3D(xComponent, yComponent, zComponent, vector) {
  if (xComponent !== 0) {
    vector.x = vector.x % xComponent;
  }

  if (yComponent !== 0) {
    vector.y = vector.y % yComponent;
  }

  if (zComponent !== 0) {
    vector.z = vector.z % zComponent;
  }

  return vector;
}

var Vector = /*#__PURE__*/function () {
  /**
   * Creates an instance of Vector.
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [z=0]
   * @memberof Vector
   */
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Vector);

    var _ref7 = [x, y, z];
    this.x = _ref7[0];
    this.y = _ref7[1];
    this.z = _ref7[2];
  }
  /**
   * @param {(Vector | [number?, number?, number?] | number)} x
   * @param {number} [y]
   * @param {number} [z]
   * @return {*}  {this}
   * @memberof Vector
   */


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
    /**
     * @return {*}  {Vector}
     * @memberof Vector
     */

  }, {
    key: "copy",
    value: function copy() {
      return new Vector(this.x, this.y, this.z);
    }
    /**
     * @param {(Vector | [number?, number?, number?] | number)} x
     * @param {number} [y]
     * @param {number} [z]
     * @return {*}  {this}
     * @memberof Vector
     */

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
    /**
     * @param {(Vector | [number, number?, number?])} x
     * @memberof Vector
     */

  }, {
    key: "rem",
    value: function rem(x) {
      if (x instanceof Vector) {
        if (Number.isFinite(x.x) && Number.isFinite(x.y) && Number.isFinite(x.z)) {
          calculateRemainder3D(x.x, x.y, x.z, this);
        }
      } else if (x instanceof Array) {
        if (x.every(function (element) {
          return Number.isFinite(element);
        })) {
          if (x.length === 2) {
            calculateRemainder2D(x[0], x[1], this);
          }

          if (x.length === 3) {
            calculateRemainder3D(x[0], x[1], x[2], this);
          }
        }
      } else if (arguments.length === 1) {
        if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
          this.x = this.x % arguments[0];
          this.y = this.y % arguments[0];
          this.z = this.z % arguments[0];
        }
      } else if (arguments.length === 2) {
        var vectorComponents = [].slice.call(arguments);

        if (vectorComponents.every(function (element) {
          return Number.isFinite(element);
        })) {
          if (vectorComponents.length === 2) {
            calculateRemainder2D(vectorComponents[0], vectorComponents[1], this);
          }
        }
      } else if (arguments.length === 3) {
        var _vectorComponents = [].slice.call(arguments);

        if (_vectorComponents.every(function (element) {
          return Number.isFinite(element);
        })) {
          if (_vectorComponents.length === 3) {
            calculateRemainder3D(_vectorComponents[0], _vectorComponents[1], _vectorComponents[2], this);
          }
        }
      }
    }
    /**
     * @param {(Vector | [number?, number?, number?] | number)} x
     * @param {number} [y]
     * @param {number} [z]
     * @return {*}  {this}
     * @memberof Vector
     */

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
    /**
     * @param {number} n
     * @return {*}  {this}
     * @memberof Vector
     */

  }, {
    key: "mult",
    value: function mult(n) {
      this.x *= n;
      this.y *= n;
      this.z *= n;
      return this;
    }
    /**
     * @param {number} n
     * @return {*}  {this}
     * @memberof Vector
     */

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
    /**
     * @return {*}  {number}
     * @memberof Vector
     */

  }, {
    key: "mag",
    value: function mag() {
      return Math.sqrt(this.magSq());
    }
    /**
     * @return {*}  {number}
     * @memberof Vector
     */

  }, {
    key: "magSq",
    value: function magSq() {
      var x = this.x,
          y = this.y,
          z = this.z;
      return x * x + y * y + z * z;
    }
    /**
     * @param {(number | Vector)} [x]
     * @param {number} [y]
     * @param {number} [z]
     * @return {*}  {number}
     * @memberof Vector
     */

  }, {
    key: "dot",
    value: function dot(x, y, z) {
      if (x instanceof Vector) {
        return this.dot(x.x, x.y, x.z);
      }

      return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
    }
    /**
     * @param {Vector} v
     * @return {*}  {Vector}
     * @memberof Vector
     */

  }, {
    key: "cross",
    value: function cross(v) {
      return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }
    /**
     * @return {*}  {this}
     * @memberof Vector
     */

  }, {
    key: "normalize",
    value: function normalize() {
      var len = this.mag();

      if (len !== 0) {
        this.mult(1 / len);
      }

      return this;
    }
    /**
     * @param {number} max
     * @return {*}  {this}
     * @memberof Vector
     */

  }, {
    key: "limit",
    value: function limit(max) {
      var mSq = this.magSq();

      if (mSq > Math.pow(max, 2)) {
        this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
      }

      return this;
    }
    /**
     * @param {number} n
     * @return {*}  {this}
     * @memberof Vector
     */

  }, {
    key: "setMag",
    value: function setMag(n) {
      return this.normalize().mult(n);
    }
    /**
     * @return {*}  {number}
     * @memberof Vector
     */

  }, {
    key: "heading",
    value: function heading() {
      return Math.atan2(this.y, this.x);
    }
    /**
     * @param {number} angle
     * @return {*}  {this}
     * @memberof Vector
     */

  }, {
    key: "rotate",
    value: function rotate(angle) {
      var newHeading = this.heading() + angle;
      var mag = this.mag();
      this.x = Math.cos(newHeading) * mag;
      this.y = Math.sin(newHeading) * mag;
      return this;
    }
    /**
     * @param {Vector} vector
     * @return {*}  {number}
     * @memberof Vector
     */

  }, {
    key: "angleBetween",
    value: function angleBetween(vector) {
      var dotmagmag = this.dot(vector) / (this.mag() * vector.mag());
      var angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag))) * Math.sign(this.cross(vector).z || 1);
      return angle;
    }
    /**
     * @param {(Vector | number)} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     * @param {number} [amt=0]
     * @return {*}  {this}
     * @memberof Vector
     */

  }, {
    key: "lerp",
    value: function lerp() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var amt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      if (x instanceof Vector) {
        return this.lerp(x.x, x.y, x.z, y);
      }

      this.x += (x - this.x) * amt || 0;
      this.y += (y - this.y) * amt || 0;
      this.z += (z - this.z) * amt || 0;
      return this;
    }
    /**
     * @param {Vector} surfaceNormal
     * @return {*}  {this}
     * @memberof Vector
     */

  }, {
    key: "reflect",
    value: function reflect(surfaceNormal) {
      surfaceNormal.normalize();
      return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
    }
    /**
     * @return {*}  {[number, number, number]}
     * @memberof Vector
     */

  }, {
    key: "array",
    value: function array() {
      return [this.x || 0, this.y || 0, this.z || 0];
    }
    /**
     * @param {(Vector | [number?, number?, number?] | number)} [x]
     * @param {number} [y]
     * @param {number} [z]
     * @return {*}  {boolean}
     * @memberof Vector
     */

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
    /**
     * @return {*}  {string}
     * @memberof Vector
     */

  }, {
    key: "toString",
    value: function toString() {
      return "Vector: [" + this.array().join(", ") + "]";
    }
  }]);

  return Vector;
}();

function getAnimate(type, currentProgress, start, distance, steps, power) {
  switch (type) {
    case "ease":
      currentProgress /= steps / 2;

      if (currentProgress < 1) {
        return distance / 2 * Math.pow(currentProgress, power) + start;
      }

      currentProgress -= 2;
      return distance / 2 * (Math.pow(currentProgress, power) + 2) + start;

    case "quadratic":
      currentProgress /= steps / 2;

      if (currentProgress <= 1) {
        return distance / 2 * currentProgress * currentProgress + start;
      }

      currentProgress--;
      return -1 * (distance / 2) * (currentProgress * (currentProgress - 2) - 1) + start;

    case "sine-ease-in-out":
      return -distance / 2 * (Math.cos(Math.PI * currentProgress / steps) - 1) + start;

    case "quintic-ease":
      currentProgress /= steps / 2;

      if (currentProgress < 1) {
        return distance / 2 * Math.pow(currentProgress, 5) + start;
      }

      currentProgress -= 2;
      return distance / 2 * (Math.pow(currentProgress, 5) + 2) + start;

    case "exp-ease-in-out":
      currentProgress /= steps / 2;
      if (currentProgress < 1) return distance / 2 * Math.pow(2, 10 * (currentProgress - 1)) + start;
      currentProgress--;
      return distance / 2 * (-Math.pow(2, -10 * currentProgress) + 2) + start;

    case "linear":
      return start + distance / steps * currentProgress;
  }
}
/**
 * @param {AnimateType} type
 * @param {number} start
 * @param {number} stop
 * @param {number} frame
 * @param {number} frames
 * @param {number=3} power
 * @return {number}
 */


function getValueInFrame(type, start, stop, frame, frames) {
  var power = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
  var distance = stop - start;
  return getAnimate(type, frame, start, distance, frames, power);
}

function timeToFrames(time) {
  var fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000 / 60;
  return time / fps;
}

function toObject(obj) {
  if (Array.isArray(obj)) {
    var tmp = Object.create(null);
    obj.forEach(function (value, index) {
      tmp["".concat(index)] = value;
    });
    obj = tmp;
  }

  return obj;
}

function reactive(obj, $this) {
  delete obj.__observe;
  obj = toObject(obj);
  var store = {};

  var _loop2 = function _loop2(key) {
    store[key] = [obj[key], obj[key]];
    Object.defineProperty(obj, key, {
      get: function get() {
        return getValueInFrame($this.easing, store[key][0], store[key][1], $this.frame, $this.frames);
      },
      set: function set(value) {
        store[key][1] = value;
      }
    });
  };

  for (var key in obj) {
    _loop2(key);
  }

  Object.defineProperty(obj, "__observe", {
    writable: true,
    enumerable: false,
    configurable: true,
    value: store
  });
  return obj;
}

function splitNumberString(params) {
  var indexString = params.findIndex(function (item) {
    return typeof item === "string";
  });

  if (indexString > -1) {
    return [params[indexString], +params[indexString === 0 ? 1 : 0]];
  } else {
    return [params[1], +params[0]];
  }
}

function converParams() {
  var data, time, easing;

  for (var _len11 = arguments.length, params = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    params[_key11] = arguments[_key11];
  }

  if ("length" in params[0] || params[0] !== null && _typeof(params[0]) === "object") {
    /// install to params[0] | time = params[1] | easing = params[2]
    data = params[0];

    var _splitNumberString = splitNumberString(params.slice(1));

    var _splitNumberString2 = _slicedToArray(_splitNumberString, 2);

    easing = _splitNumberString2[0];
    time = _splitNumberString2[1];
  } else {
    /// install to params | time  = 0 | easing = linear
    data = toObject(params);
  }

  return [data, time, easing];
}

var Animate = /*#__PURE__*/function () {
  function Animate() {
    _classCallCheck(this, Animate);

    this.__data = {
      __observe: {}
    };
    this.__fps = 1000 / 60;
    this.__eventsStore = Object.create(null);
    this.__queue = [];
    this.time = 0;
    this.easing = "ease";
    this.__frame = 1;

    var _converParams = converParams.apply(void 0, arguments),
        _converParams2 = _slicedToArray(_converParams, 3),
        data = _converParams2[0],
        time = _converParams2[1],
        easing = _converParams2[2];

    this.data = data !== null && data !== void 0 ? data : this.data;
    this.time = Number.isNaN(time) ? this.time : time !== null && time !== void 0 ? time : this.time;
    this.easing = easing !== null && easing !== void 0 ? easing : this.easing;
  } // private get data(): StoreObserve {
  //   return this.__data;
  // }


  _createClass(Animate, [{
    key: "data",
    set: function set(data) {
      var _this12 = this;

      this.__data = reactive(data, this);

      var _loop3 = function _loop3(key) {
        Object.defineProperty(_this12, key, {
          get: function get() {
            return this.__data[key];
          }
        });
      };

      for (var key in this.__data) {
        _loop3(key);
      }
    }
    /**
     * @param {string} key
     * @return {*}  {(number | void)}
     * @memberof Animate
     */

  }, {
    key: "get",
    value: function get(key) {
      return this.__data[key];
    }
  }, {
    key: "frames",
    get: function get() {
      return Math.max(timeToFrames(this.time, this.__fps), 1);
    }
  }, {
    key: "frame",
    get: function get() {
      return Math.min(this.__frame, this.frames);
    },
    set: function set(value) {
      this.__frame = Math.min(value, this.frames);

      if (this.frame === this.frames) {
        this.emit("done");

        if (this.__queue.length > 0) {
          this._to.apply(this, _toConsumableArray(this.__queue[0]));

          this.__queue.splice(0, 1);
        }
      }
    }
  }, {
    key: "on",
    value: function on(name, callback) {
      if (name in this.__eventsStore) {
        this.__eventsStore[name].push(callback);
      } else {
        this.__eventsStore[name] = [callback];
      }
    }
  }, {
    key: "off",
    value: function off(name, callback) {
      if (callback) {
        var _this$__eventsStore$n, _this$__eventsStore$n2;

        this.__eventsStore[name] = (_this$__eventsStore$n = this.__eventsStore[name]) === null || _this$__eventsStore$n === void 0 ? void 0 : _this$__eventsStore$n.filter(function (item) {
          return item !== callback;
        });

        if (((_this$__eventsStore$n2 = this.__eventsStore[name]) === null || _this$__eventsStore$n2 === void 0 ? void 0 : _this$__eventsStore$n2.length) === 0) {
          delete this.__eventsStore[name];
        }
      } else {
        delete this.__eventsStore[name];
      }
    }
  }, {
    key: "emit",
    value: function emit(name) {
      var _this$__eventsStore$n3,
          _this13 = this;

      for (var _len12 = arguments.length, params = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
        params[_key12 - 1] = arguments[_key12];
      }

      (_this$__eventsStore$n3 = this.__eventsStore[name]) === null || _this$__eventsStore$n3 === void 0 ? void 0 : _this$__eventsStore$n3.forEach(function (callback) {
        callback.call.apply(callback, [_this13].concat(params));
      });
    }
  }, {
    key: "once",
    value: function once(name, callback) {
      var _this14 = this;

      var callbackVirual = function callbackVirual() {
        for (var _len13 = arguments.length, params = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
          params[_key13] = arguments[_key13];
        }

        callback.call.apply(callback, [_this14].concat(params));

        _this14.off(name, callbackVirual);
      };

      this.on(name, callbackVirual);
    }
  }, {
    key: "setFPS",
    value: function setFPS(value) {
      this.__fps = value;
    }
  }, {
    key: "action",
    value: function action() {
      this.frame++;
    }
  }, {
    key: "cancel",
    value: function cancel(key) {
      if (key) {
        if (key in this.__data && key in this.__data.__observe) {
          this.__data.__observe[key][0] = this.__data[key];
          this.emit("cancel", key);
        }
      } else {
        for (var _key14 in this.__data) {
          this.cancel(_key14);
        }
      }
    }
  }, {
    key: "_to",
    value: function _to() {
      var _converParams3 = converParams.apply(void 0, arguments),
          _converParams4 = _slicedToArray(_converParams3, 3),
          data = _converParams4[0],
          time = _converParams4[1],
          easing = _converParams4[2];

      for (var key in data) {
        if (key in this.__data && key in this.__data.__observe) {
          this.cancel(key);
          this.__data.__observe[key][1] = +data[key]; // this.__data.__observe[key][1] = +data[key] as number;
        } else {
          console.error("fCanvas<animate.ts>: \"".concat(key, "\" is not signed."));
        }
      }

      this.frame = 0;
      this.time = Number.isNaN(time) ? this.time : time !== null && time !== void 0 ? time : this.time;
      this.easing = easing !== null && easing !== void 0 ? easing : this.easing;
    }
  }, {
    key: "to",
    value: function to() {
      this._to.apply(this, arguments);

      this.__queue.splice(0);
    }
  }, {
    key: "running",
    get: function get() {
      return this.frame < this.frames;
    }
  }, {
    key: "add",
    value: function add() {
      this.__queue.push(converParams.apply(void 0, arguments));
    }
  }, {
    key: "set",
    value: function set() {
      this.data = converParams.apply(void 0, arguments)[0];
    }
  }]);

  return Animate;
}();
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */


function constrain(value, min, max) {
  return Math.min(Math.max(min, value), max);
}
/**
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */


function loadImage(src) {
  var img = new Image();
  img.src = src;
  return new Promise(function (resolve, reject) {
    function loaded() {
      resolve(img);
      img.removeEventListener("load", loaded);
    }

    function error(err) {
      reject(err);
      img.removeEventListener("error", error);
    }

    img.addEventListener("load", loaded);
    img.addEventListener("error", error);
  });
}
/**
 *
 * @param {string} src
 * @return {Promise<HTMLAudioElement>}
 */


function loadAudio(src) {
  var audio = document.createElement("audio");
  audio.src = src;
  return new Promise(function (resolve, reject) {
    function loaded() {
      resolve(audio);
      audio.removeEventListener("load", loaded);
    }

    function error(err) {
      reject(err);
      audio.removeEventListener("error", error);
    }

    audio.addEventListener("load", loaded);
    audio.addEventListener("error", error);
  });
}
/**
 * @param {number} value
 * @param {number} start
 * @param {number} stop
 * @param {number} min
 * @param {number} max
 * @return {number}
 */


function map(value, start, stop, min, max) {
  return (value - start) * (max - min) / (stop - start) + min;
}
/**
 * @export
 * @param {number} ratio
 * @param {number} width
 * @param {number} height
 * @return {*}  {[number, number]}
 */


function aspectRatio(ratio, width, height) {
  /// ratio = width / height => height = width / ratio
  var nwidth = ratio * height;
  var nheight = width / ratio;

  if (width < nwidth) {
    return [width, nheight];
  } else {
    return [nwidth, height];
  }
}
/**
 * @param {any[]} ...args
 * @return {any}
 */


function random() {
  for (var _len14 = arguments.length, args = new Array(_len14), _key15 = 0; _key15 < _len14; _key15++) {
    args[_key15] = arguments[_key15];
  }

  if (args.length === 1) {
    if (args[0] !== null && _typeof(args[0]) === "object" && "length" in args[0]) {
      return args[0][Math.floor(Math.random() * args[0].length)];
    }

    return Math.random() * args[0];
  }

  if (args.length === 2) {
    return args[0] + Math.random() * (args[1] - args[0]);
  }
}
/**
 * @param {number} start
 * @param {number} stop?
 * @return {number}
 */


function randomInt(start, stop) {
  if (stop === undefined) {
    return Math.round(random(start));
  }

  return Math.round(random(start, stop));
}
/**
 * @param {any} start
 * @param {any} stop
 * @param {number} step
 * @return {any}
 */


function range(start, stop, step) {
  step = step || 1;
  var arr = [];
  var isChar = false;
  if (stop === undefined) stop = start, start = 1;

  if (typeof start === "string") {
    start = start.charCodeAt(0);
    stop = stop.charCodeAt(0);
    isChar = true;
  }

  if (start !== stop && Math.abs(stop - start) < Math.abs(step)) throw new Error("range(): step exceeds the specified range.");

  if (stop > start) {
    step < 0 && (step *= -1);

    while (start <= stop) {
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  } else {
    step > 0 && (step *= -1);

    while (start >= stop) {
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  }

  return arr;
}
/**
 * @param {number} start
 * @param {number} stop
 * @param {number} amt
 * @return {number}
 */


function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}
/**
 * @param {number[]} ...args
 * @return {number}
 */


var hypot = typeof Math.hypot === "function" ? Math.hypot : function () {
  var len = arguments.length;
  var i = 0,
      result = 0;

  while (i < len) {
    var _i;

    result += Math.pow((_i = i++, _i < 0 || arguments.length <= _i ? undefined : arguments[_i]), 2);
  }

  return Math.sqrt(result);
};
/**
 * @param {number} value
 * @param {number} max
 * @param {number} prevent
 * @return {number}
 */

function odd(value, prevent, max) {
  if (value === max) {
    return prevent;
  }

  return value + 1;
}
/**
 * @param {number} value
 * @param {number} min
 * @param {number} prevent
 * @return {number}
 */


function even(value, min, prevent) {
  if (value === min) {
    return prevent;
  }

  return value - 1;
} ///// https://jsfiddle.net/casamia743/xqh48gno/


function calcProjectedRectSizeOfRotatedRect(width, height, rad) {
  var rectProjectedWidth = Math.abs(width * Math.cos(rad)) + Math.abs(height * Math.sin(rad));
  var rectProjectedHeight = Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad));
  return [rectProjectedWidth, rectProjectedHeight];
}

var virualContext;

function cutImage(image) {
  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : extractNumber("".concat(image.width));
  var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : extractNumber("".concat(image.height));
  var rotate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (virualContext === undefined) {
    virualContext = document.createElement("canvas").getContext("2d"); /// never null
  } /// ------------------ draw image canvas -----------------


  var rad = rotate * Math.PI / 180;

  var _calcProjectedRectSiz = calcProjectedRectSizeOfRotatedRect(width, height, rad),
      _calcProjectedRectSiz2 = _slicedToArray(_calcProjectedRectSiz, 2),
      nwidth = _calcProjectedRectSiz2[0],
      nheight = _calcProjectedRectSiz2[1];

  virualContext.canvas.width = width;
  virualContext.canvas.height = height;
  virualContext.save();
  virualContext.translate(width / 2, height / 2);
  virualContext.rotate(rotate * Math.PI / 180);
  virualContext.drawImage(image, x, y, nwidth, nheight, -nwidth / 2, -nheight / 2, nwidth, nheight);
  virualContext.restore(); /// -----------------------------------------------------------

  var imageCuted = new Image();
  imageCuted.src = virualContext.canvas.toDataURL();
  virualContext.clearRect(0, 0, width, height);
  return imageCuted;
}
/**
 * @export
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {*}  {boolean}
 */


function unlimited(value, min, max) {
  return value < min || value > max;
}

var Cursor = /*#__PURE__*/function () {
  function Cursor(camera, config) {
    var _this15 = this;

    _classCallCheck(this, Cursor);

    this._camera = camera;
    this._config = config;

    var watch = function watch(prop) {
      _this15._camera.$watch(prop, function (newValue, oldValue) {
        var dist = newValue - oldValue; // min = this._config.x.min;

        if (_this15._config[prop].dynamic) {
          if (dist < 0 ? _this15[prop] > _this15._config[prop].min : _this15[prop] < _this15._config[prop].max) {
            _this15[prop] += dist;
            return false;
          }
        } else {
          if ((prop === "x" ? _this15._camera.isLimitX() : _this15._camera.isLimitY()) === (dist < 0 ? -1 : 1)) {
            if (_this15[prop] > _this15._config[prop].min) {
              _this15[prop] += dist;
            }
          }
        }
      });
    };

    watch("x");
    watch("y");
  }

  _createClass(Cursor, [{
    key: "x",
    get: function get() {
      return this._config.x.current;
    },
    set: function set(value) {}
  }, {
    key: "y",
    get: function get() {
      return this._config.y.current;
    },
    set: function set(value) {}
  }]);

  return Cursor;
}();

var Camera = /*#__PURE__*/function () {
  function Camera(canvas, x, y, width, height) {
    _classCallCheck(this, Camera);

    this._offset = Object.create({
      x: 0,
      y: 0
    });
    this._watchers = Object.create(null);
    this._canvas = canvas;
    this._viewport = {
      x: x,
      y: y,
      width: width,
      height: height
    };
  }

  _createClass(Camera, [{
    key: "x",
    get: function get() {
      return this._offset.x;
    },
    set: function set(value) {
      var _this$_watchers$x;

      var old = this._offset.x;
      var allowChange = true;
      (_this$_watchers$x = this._watchers.x) === null || _this$_watchers$x === void 0 ? void 0 : _this$_watchers$x.forEach(function (callback) {
        if (callback(value, old) === false) {
          allowChange = false;
        }
      });

      if (allowChange) {
        this._offset.x = value;
      }
    }
  }, {
    key: "y",
    get: function get() {
      return this._offset.y;
    },
    set: function set(value) {
      var _this$_watchers$y;

      var old = this._offset.y;
      var allowChange = true;
      (_this$_watchers$y = this._watchers.y) === null || _this$_watchers$y === void 0 ? void 0 : _this$_watchers$y.forEach(function (callback) {
        if (callback(value, old) === false) {
          allowChange = false;
        }
      });

      if (allowChange) {
        this._offset.y = value;
      }
    }
  }, {
    key: "$watch",
    value: function $watch(name, callback) {
      var _this16 = this;

      if (name in this._watchers === false) {
        this._watchers[name] = [];
      }

      this._watchers[name].push(callback);

      return function () {
        var _this16$_watchers$nam;

        var index = (_this16$_watchers$nam = _this16._watchers[name]) === null || _this16$_watchers$nam === void 0 ? void 0 : _this16$_watchers$nam.findIndex(function (item) {
          return item === callback;
        });

        if (index && index !== -1) {
          _this16._watchers[name].splice(index, 1);
        }
      };
    }
  }, {
    key: "getXOffset",
    value: function getXOffset(value) {
      var diffSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return value - constrain(this.x * diffSpeed, this._viewport.x, this._viewport.width - this._canvas.width);
    }
  }, {
    key: "getYOffset",
    value: function getYOffset(value) {
      var diffSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return value - constrain(this.y * diffSpeed, this._viewport.y, this._viewport.height - this._canvas.height);
    }
  }, {
    key: "isLimitX",
    value: function isLimitX() {
      if (this.x < this._viewport.x) {
        return -1;
      }

      if (this.x > this._viewport.width - this._canvas.width) {
        return 1;
      }

      return 0;
    }
  }, {
    key: "isLimitY",
    value: function isLimitY() {
      if (this.y < this._viewport.y) {
        return -1;
      }

      if (this.y > this._viewport.height - this._canvas.height) {
        return 1;
      }

      return 0;
    }
  }, {
    key: "isXInViewBox",
    value: function isXInViewBox(value) {
      var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var diffSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      if (value instanceof MyElement) {
        width = value.width || 0;
        value = value.x || 0;
      }

      value = this.getXOffset(value, diffSpeed);
      return value + width > 0 || value < this._canvas.width;
    }
  }, {
    key: "isYInViewBox",
    value: function isYInViewBox(value) {
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var diffSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      if (value instanceof MyElement) {
        height = value.height || 0;
        value = value.y || 0;
      }

      value = this.getYOffset(value, diffSpeed);
      return value + height > 0 || value < this._canvas.height;
    }
  }, {
    key: "isInViewBox",
    value: function isInViewBox(x, y) {
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var diffSpeedX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var diffSpeedY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

      if (x instanceof MyElement) {
        return this.isXInViewBox(x, diffSpeedX) && this.isYInViewBox(x, diffSpeedY);
      }

      return this.isXInViewBox(x, width, diffSpeedX) && this.isYInViewBox(y, height, diffSpeedY);
    }
  }]);

  return Camera;
}();

Camera.Cursor = Cursor;

function convertValueXMLToArray(str) {
  if (/^{[^]*}$/.test(trim(str))) {
    str = decodeURIComponent(encodeURIComponent(str).replace(/%7b/gi, "[").replace(/%7d/gi, "]"));
    return new Function("return ".concat(str))();
  }

  throw new Error("fCanvas<Resource>: \"".concat(str, "\" a malformed field"));
}

function convertFieldToJson(keyItem) {
  var key = keyItem.textContent;
  var value = keyItem.nextElementSibling;

  if (value == null) {
    throw new Error("fCanvas<loadResourceImage>: Error because syntax error in file plist.");
  }

  if (value.tagName === "dict") {
    var result = {};
    Array.from(value.childNodes).filter(function (item) {
      return item.tagName === "key";
    }).forEach(function (keyItem) {
      result = _objectSpread(_objectSpread({}, result), convertFieldToJson(keyItem));
    });
    return _defineProperty({}, key, result);
  }

  if (value.tagName === "array") {
    var _result = [];
    Array.from(value.childNodes).filter(function (item) {
      return item.tagName === "key";
    }).forEach(function (keyItem) {
      _result.push(convertFieldToJson(keyItem));
    });
    return _defineProperty({}, key, _result);
  }

  if (value.tagName === "string") {
    return _defineProperty({}, key, convertValueXMLToArray(value.textContent));
  }

  if (value.tagName === "integer") {
    return _defineProperty({}, key, parseInt(value.textContent));
  }

  if (value.tagName === "float") {
    return _defineProperty({}, key, parseFloat(value.textContent));
  }

  if (value.tagName === "true") {
    return _defineProperty({}, key, true);
  }

  if (value.tagName === "false") {
    return _defineProperty({}, key, false);
  }

  return {};
}

function resolvePath() {
  for (var _len15 = arguments.length, params = new Array(_len15), _key16 = 0; _key16 < _len15; _key16++) {
    params[_key16] = arguments[_key16];
  }

  if (params[1].match(/^[a-z]+:\/\//i)) {
    return params[1];
  }

  var root = params[0].replace(/\/$/, "").split("/");
  params[0] = root.slice(0, root.length - 1).join("/");
  return params.join("/");
}

var TilesResource = /*#__PURE__*/function () {
  function TilesResource(image, plist) {
    _classCallCheck(this, TilesResource);

    this.__caching = new Map();
    this.tileRoot = image;
    this.plist = plist;
  }
  /**
   * @param {string} name
   * @return {any}
   */


  _createClass(TilesResource, [{
    key: "get",
    value: function get(name) {
      if (this.has(name)) {
        var _this$plist$frames$na = this.plist.frames[name],
            frame = _this$plist$frames$na.frame,
            rotated = _this$plist$frames$na.rotated,
            sourceSize = _this$plist$frames$na.sourceSize;

        if (this.__caching.has(name) === false) {
          var image = cutImage(this.tileRoot, +frame[0][0], +frame[0][1], +frame[1][0], +frame[1][1], rotated ? -90 : 0);

          this.__caching.set(name, Object.assign(image, {
            image: image,
            size: {
              width: +sourceSize[0] || +frame[1][0],
              height: +sourceSize[1] || +frame[1][1]
            }
          }));
        }

        return this.__caching.get(name);
      } else {
        throw new Error("fCanvas<addons/loadResourceImage>: Error does not exist this file \"".concat(name, "\" in declaration .plist"));
      }
    }
    /**
     * @param {string} name
     * @return {boolean}
     */

  }, {
    key: "has",
    value: function has(name) {
      return name in this.plist.frames;
    }
  }]);

  return TilesResource;
}();
/**
 * @param {string} path
 * @return {Promise<TilesResource>}
 */


function loadResourceImage(_x4) {
  return _loadResourceImage.apply(this, arguments);
}

function _loadResourceImage() {
  _loadResourceImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(path) {
    var _plistJson, _plistJson2;

    var plist, plistJson, image;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (path.match(/\.plist$/) == null) {
              path += ".plist";
            }

            _context7.next = 3;
            return fetch("".concat(path)).then(function (response) {
              return response.text();
            }).then(function (str) {
              return new DOMParser().parseFromString(str, "text/xml");
            });

          case 3:
            plist = _context7.sent;
            plistJson = {};
            plist.querySelectorAll("plist > dict:first-child > key").forEach(function (itemKey) {
              plistJson = _objectSpread(_objectSpread({}, plistJson), convertFieldToJson(itemKey));
            });
            _context7.next = 8;
            return loadImage(resolvePath(path, ((_plistJson = plistJson) === null || _plistJson === void 0 ? void 0 : _plistJson.metadata.realTextureFileName) || ((_plistJson2 = plistJson) === null || _plistJson2 === void 0 ? void 0 : _plistJson2.metadata.textureFileName)));

          case 8:
            image = _context7.sent;
            return _context7.abrupt("return", new TilesResource(image, plistJson));

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _loadResourceImage.apply(this, arguments);
}

var Resource = /*#__PURE__*/function () {
  function Resource(description) {
    var _this17 = this;

    var autoLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Resource);

    this.resourceLoaded = new Map();
    this.resourceDescription = Object.create(null);
    var resourceDescription = Object.create(null);

    for (var prop in description) {
      if (typeof description[prop] === "string") {
        resourceDescription[prop] = {
          src: description[prop],
          lazy: true
        };
      } else {
        resourceDescription[prop] = description[prop];
      }
    }

    this.resourceDescription = resourceDescription; /// observe

    var _this$resourceLoaded = this.resourceLoaded,
        set = _this$resourceLoaded.set,
        _delete = _this$resourceLoaded["delete"];
    var $this = this;

    this.resourceLoaded.set = function () {
      for (var _len16 = arguments.length, params = new Array(_len16), _key17 = 0; _key17 < _len16; _key17++) {
        params[_key17] = arguments[_key17];
      }

      /// call this._set
      $this[params[0]] = params[1];
      return set.apply(this, params);
    };

    this.resourceLoaded["delete"] = function () {
      for (var _len17 = arguments.length, params = new Array(_len17), _key18 = 0; _key18 < _len17; _key18++) {
        params[_key18] = arguments[_key18];
      }

      /// call this._set
      delete $this[params[0]];
      return _delete.apply(this, params);
    };

    if (autoLoad) {
      var resourceAutoLoad = [];

      for (var _prop in this.resourceDescription) {
        if (this.resourceDescription[_prop].lazy === false) {
          resourceAutoLoad.push(this.load(_prop));
        }
      } // @ts-expect-error


      return new Promise( /*#__PURE__*/function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(resolve, reject) {
          return _regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return Promise.all(resourceAutoLoad);

                case 3:
                  resolve(_this17);
                  _context4.next = 9;
                  break;

                case 6:
                  _context4.prev = 6;
                  _context4.t0 = _context4["catch"](0);
                  reject(_context4.t0);

                case 9:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[0, 6]]);
        }));

        return function (_x5, _x6) {
          return _ref15.apply(this, arguments);
        };
      }());
    }
  }

  _createClass(Resource, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(name) {
        var _this$resourceDescrip, src, type;

        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!name) {
                  _context5.next = 35;
                  break;
                }

                if (!(name in this.resourceDescription)) {
                  _context5.next = 34;
                  break;
                }

                if (!(this.isLoaded(name) === false)) {
                  _context5.next = 31;
                  break;
                }

                _this$resourceDescrip = this.resourceDescription[name], src = _this$resourceDescrip.src, type = _this$resourceDescrip.type;
                _context5.t0 = type;
                _context5.next = _context5.t0 === "image" ? 7 : _context5.t0 === "audio" ? 14 : _context5.t0 === "plist" ? 21 : 28;
                break;

              case 7:
                _context5.t1 = this.resourceLoaded;
                _context5.t2 = name;
                _context5.next = 11;
                return loadImage(src);

              case 11:
                _context5.t3 = _context5.sent;

                _context5.t1.set.call(_context5.t1, _context5.t2, _context5.t3);

                return _context5.abrupt("break", 29);

              case 14:
                _context5.t4 = this.resourceLoaded;
                _context5.t5 = name;
                _context5.next = 18;
                return loadAudio(src);

              case 18:
                _context5.t6 = _context5.sent;

                _context5.t4.set.call(_context5.t4, _context5.t5, _context5.t6);

                return _context5.abrupt("break", 29);

              case 21:
                _context5.t7 = this.resourceLoaded;
                _context5.t8 = name;
                _context5.next = 25;
                return loadResourceImage(src);

              case 25:
                _context5.t9 = _context5.sent;

                _context5.t7.set.call(_context5.t7, _context5.t8, _context5.t9);

                return _context5.abrupt("break", 29);

              case 28:
                console.warn("fCanvas<Resource>: can't load \"".concat(name, " because it is \"").concat(type));

              case 29:
                _context5.next = 32;
                break;

              case 31:
                console.warn("fCanvas<Resource>: \"".concat(name, "\" resource loaded."));

              case 32:
                _context5.next = 35;
                break;

              case 34:
                console.error("fCanvas<Resource>: \"".concat(name, " resource not exists."));

              case 35:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function load(_x7) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "isLoaded",
    value: function isLoaded(name) {
      if (name) {
        return this.resourceLoaded.has(name);
      } else {
        for (var prop in this.resourceDescription) {
          if (this.resourceLoaded.has(prop) === false) {
            return false;
          }
        }

        return true;
      }
    }
  }, {
    key: "get",
    value: function get(type, path) {
      var _path = path.split("/");

      var resourceName = _path[0];

      var resoucreProp = _path.slice(1).join("/");

      var info = this.resourceDescription[resourceName];

      if (info && info.type === type) {
        if (this.resourceLoaded.has(resourceName)) {
          var resource = this.resourceLoaded.get(resourceName);

          if (resource) {
            switch (info.type) {
              case "plist":
                return resoucreProp ? resource.get(resoucreProp) : resource;

              case "image":
              case "audio":
              default:
                return resource;
            }
          }

          throw new Error("fCanvas<Resource>: \"".concat(resourceName, " not exists."));
        } else {
          throw new Error("fCanvas<Resource>: \"".concat(resourceName, " not loaded."));
        }
      } else {
        throw new Error("fCanvas<Resource>: \"".concat(resourceName, "\" not exitst."));
      }
    }
  }]);

  return Resource;
}();

function CircleImpact(circle1, circle2) {
  return Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2) < Math.pow(circle1.radius + circle2.radius, 2);
}

function CircleImpactPoint(circle, x, y) {
  if (x == null || y == null) {
    return false;
  }

  return Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2) < Math.pow(circle.radius, 2);
}

function CircleImpactRect(circle, rect) {
  var x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  var y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  var distance = (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);
  return distance < Math.pow(circle.radius, 2);
}

function RectImpact(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
}

function RectImpactPoint(rect, x, y) {
  if (x == null || y == null) {
    return false;
  }

  return rect.x < x && rect.x + rect.width > x && rect.y < y && rect.y + rect.height > y;
}

function getOffset(el) {
  var x = el.x,
      y = el.y;

  if (el.type === "rect") {
    var _el$$parent$_argsRect = el.$parent._argsRect(el.x, el.y, el.width, el.height);

    var _el$$parent$_argsRect2 = _slicedToArray(_el$$parent$_argsRect, 2);

    x = _el$$parent$_argsRect2[0];
    y = _el$$parent$_argsRect2[1];
  }

  return {
    x: x,
    y: y
  };
}

function getDirectionElement(el1, el2) {
  var _getOffset = getOffset(el1),
      x1 = _getOffset.x,
      y1 = _getOffset.y;

  var _getOffset2 = getOffset(el2),
      x2 = _getOffset2.x,
      y2 = _getOffset2.y;

  return Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI;
}

function interfering(element1, element2) {
  var company = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  switch (element1.type) {
    case "rect":
      switch (element2.type) {
        case "rect":
          if (RectImpact(element1, element2)) {
            return company ? {
              direction: getDirectionElement(element1, element2),
              element: element2
            } : true;
          }

          break;

        case "circle":
          if (CircleImpactRect(element2, element1)) {
            return company ? {
              direction: getDirectionElement(element1, element2),
              element: element2
            } : true;
          }

          break;

        case "point":
          if (RectImpactPoint(element1, element2.x, element2.y)) {
            return company ? {
              direction: getDirectionElement(element1, element2),
              element: element2
            } : true;
          }

          break;
      }

      break;

    case "circle":
      switch (element2.type) {
        case "rect":
          return interfering(element2, element1, company);

        case "circle":
          if (CircleImpact(element1, element2)) {
            return company ? {
              direction: getDirectionElement(element1, element2),
              element: element2
            } : true;
          }

          break;

        case "point":
          if (CircleImpactPoint(element1, element2.x, element2.y)) {
            return company ? {
              direction: getDirectionElement(element1, element2),
              element: element2
            } : true;
          }

          break;
      }

      break;

    case "point":
      {
        switch (element2.type) {
          case "rect":
          case "circle":
            return interfering(element2, element1, company);

          case "point":
            if (element1.x === element2.x && element1.y === element2.y) {
              return company ? {
                direction: getDirectionElement(element1, element2),
                element: element2
              } : true;
            }

        }
      }
  }

  return company ? false : null;
}

function presser(el) {
  var _result2;

  var result;

  for (var _len18 = arguments.length, otherEl = new Array(_len18 > 1 ? _len18 - 1 : 0), _key19 = 1; _key19 < _len18; _key19++) {
    otherEl[_key19 - 1] = arguments[_key19];
  }

  otherEl.some(function (el2) {
    var r = interfering(el, el2);

    if (r) {
      result = r;
      return true;
    }
  });
  return (_result2 = result) !== null && _result2 !== void 0 ? _result2 : null;
}

function pressed(el) {
  for (var _len19 = arguments.length, otherEl = new Array(_len19 > 1 ? _len19 - 1 : 0), _key20 = 1; _key20 < _len19; _key20++) {
    otherEl[_key20 - 1] = arguments[_key20];
  }

  return otherEl.some(function (el2) {
    return interfering(el, el2, false);
  });
}

export default fCanvas;
export { Animate, Camera, Emitter, Resource, Store, Vector, aspectRatio, cancelAnimationFrame, changeSize, constrain, createElement, cutImage, _draw as draw, even, getDirectionElement, hypot, isMobile, isTouch, keyPressed, lerp, loadAudio, loadImage, loadResourceImage, map, mouseClicked, mouseMoved, mousePressed, mouseWheel, odd, passive, pressed, presser, random, randomInt, range, requestAnimationFrame, _setup2 as setup, touchEnd, touchMove, touchStart, unlimited };
