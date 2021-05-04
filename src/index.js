import { AutoToPx, fontToArray, getTouchInfo, requestAnimationFrame, windowSize, isMobile, } from "./utils/index";
import Emitter from "./classes/Emitter";
import Stament from "./classes/Stament";
import Store from "./classes/Store";
import Vector from "./classes/Vector";
import Animate from "./classes/Animate";
class MyElement {
    constructor(canvas) {
        this._els = [];
        this._idActiveNow = -1;
        this._queue = [];
        if (canvas?.constructor === fCanvas) {
            this._els.push(canvas);
        }
        else {
            this._els.push(noopFCanvas);
        }
    }
    get $el() {
        return this.$parent.$el;
    }
    _run(canvas) {
        this.bind(canvas);
        this._idActiveNow = canvas.id;
        if (typeof this.update === "function") {
            this.update();
        }
        else if (typeof this.draw === "function") {
            this.draw();
        }
        if (this._queue.length > 0) {
            for (let index = 0, length = this._queue.length; index < length; index++) {
                this.run(this._queue[index]);
            }
        }
        this._idActiveNow = -1;
    }
    addQueue(element) {
        if (element instanceof MyElement) {
            this._queue.push(element);
        }
        else {
            console.error(`fCanvas: the parameter passed to MyElement.addQueue() must be a fCanvas object.`);
        }
    }
    getQueue(index) {
        if (index < 0) {
            index += this._queue.length;
        }
        return this._queue[index];
    }
    run(element) {
        this.$parent.run(element);
    }
    has(id) {
        return this._els.some((item) => item.id === id);
    }
    get $parent() {
        const canvas = this._idActiveNow === null
            ? this._els[this._els.length - 1]
            : this._els.find((item) => item.id === this._idActiveNow);
        if (canvas instanceof fCanvas) {
            return canvas;
        }
        else {
            console.warn("fCanvas: The current referenced version of the fCanvas.run function is incorrect.");
            return this._els[0];
        }
    }
    bind(canvas) {
        if (canvas instanceof fCanvas) {
            if (this.has(canvas.id) === false) {
                this._els.push(canvas);
            }
        }
        else {
            console.error("fCanvas: the parameter passed to MyElement.bind() must be a fCanvas object.");
        }
    }
    get $context2d() {
        return this.$parent.$context2d;
    }
    _toRadius(value) {
        return this.$parent._toRadius(value);
    }
    _toDegress(value) {
        return this.$parent._toDegress(value);
    }
    _toRgb(...params) {
        return this.$parent._toRgb(params);
    }
    _figureOffset(x, y, width, height) {
        return this.$parent._figureOffset(x, y, width, height);
    }
    sin(angle) {
        return this.$parent.sin(angle);
    }
    asin(sin) {
        return this.$parent.asin(sin);
    }
    cos(angle) {
        return this.$parent.cos(angle);
    }
    acos(cos) {
        return this.$parent.asin(cos);
    }
    tan(angle) {
        return this.$parent.tan(angle);
    }
    atan(tan) {
        return this.$parent.atan(tan);
    }
    atan2(y, x) {
        return this.$parent.atan2(y, x);
    }
    get mouseX() {
        return this.$parent.mouseX;
    }
    get mouseY() {
        return this.$parent.mouseY;
    }
    get interact() {
        return this.$parent.interact;
    }
    get width() {
        return this.$parent.width;
    }
    get height() {
        return this.$parent.height;
    }
    get windowWidth() {
        return this.$parent.windowWidth;
    }
    get windowHeight() {
        return this.$parent.windowHeight;
    }
    fill(...args) {
        this.$context2d.fillStyle = this._toRgb(args);
        this.$context2d.fill();
    }
    stroke(...args) {
        this.$context2d.strokeStyle = this._toRgb(args);
        this.$context2d.stroke();
    }
    noFill() {
        this.fill(0, 0, 0, 0);
    }
    lineWidth(value) {
        if (value === undefined) {
            return this.$context2d.lineWidth;
        }
        else {
            this.$context2d.lineWidth = value;
        }
    }
    miterLimit(value) {
        if (value === undefined) {
            return this.$context2d.miterLimit;
        }
        else {
            if (this.lineJoin() !== "miter") {
                this.lineJoin("miter");
            }
            this.$context2d.miterLimit = value;
        }
    }
    shadowOffset(x, y) {
        if (arguments.length === 0) {
            return {
                x: this.$context2d.shadowOffsetX,
                y: this.$context2d.shadowOffsetY,
            };
        }
        else {
            [this.$context2d.shadowOffsetX, this.$context2d.shadowOffsetY] = [
                x || 0,
                y || 0,
            ];
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
        this.$parent.save();
    }
    restore() {
        this.$parent.restore();
    }
    arc(x, y, radius, astart, astop, reverse) {
        this.begin();
        this.$context2d.arc(x, y, radius, this._toRadius(astart) - Math.PI / 2, this._toRadius(astop) - Math.PI / 2, reverse);
        this.close();
    }
    pie(x, y, radius, astart, astop, reverse) {
        this.begin();
        this.move(x, y);
        this.arc(x, y, radius, astart, astop, reverse);
        this.to(x, y);
        this.close();
    }
    line(x1, y1, x2, y2) {
        this.move(x1, y1);
        this.to(x2, y2);
    }
    ellipse(x, y, radius1, radius2, astart, astop, reverse) {
        this.begin();
        this.$context2d.ellipse(x, y, radius1, radius2, this._toRadius(astart) - Math.PI / 2, this._toRadius(astop), reverse);
        this.close();
    }
    circle(x, y, radius) {
        this.arc(x, y, radius, 0, this.$parent.angleMode() === "degress" ? 360 : Math.PI * 2);
    }
    point(x, y) {
        this.circle(x, y, 1);
    }
    triange(x1, y1, x2, y2, x3, y3) {
        this.begin();
        this.move(x1, y1);
        this.to(x2, y2);
        this.to(x3, y3);
        this.close();
    }
    drawImage(image, ...args) {
        if (args.length === 2) {
            args = this._figureOffset(args[0], args[1], image.width, image.height);
        }
        else if (args.length === 6) {
            [args[5], args[6]] = this._figureOffset(args[0], args[1], args[2], args[3]);
        }
        this.$context2d.drawImage(image, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
    }
    rect(x, y, w, h, $1, $2, $3, $4) {
        this.begin();
        [x, y] = this._figureOffset(x, y, w, h);
        if (arguments.length < 5) {
            this.$context2d.rect(x, y, w, h);
        }
        else {
            const fontSize = this.$parent.fontSize();
            const arc = [
                AutoToPx($1, w, fontSize),
                AutoToPx($2, h, fontSize),
                AutoToPx($3, w, fontSize),
                AutoToPx($4, h, fontSize),
            ];
            this.move(x, y);
            this.arcTo(x + w, y, x + w, y + h - arc[1], arc[1]);
            this.arcTo(x + w, y + h, x + w - arc[2], y + h, arc[2]);
            this.arcTo(x, y + h, x, y + h - arc[3], arc[3]);
            this.arcTo(x, y, x + w - arc[0], y, arc[0]);
        }
        this.close();
    }
    quadratic(cpx, cpy, x, y) {
        this.$context2d.quadraticCurveTo(cpx, cpy, x, y);
    }
    bezier(cp1x, cp1y, cp2x, cp2y, x, y) {
        this.$context2d.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    move(x, y) {
        this.$context2d.moveTo(x, y);
    }
    to(x, y) {
        this.$context2d.lineTo(x, y);
    }
    fillText(text, x, y, maxWidth) {
        this.$context2d.fillText(text, x, y, maxWidth);
    }
    strokeText(text, x, y, maxWidth) {
        this.$context2d.strokeText(text, x, y, maxWidth);
    }
    fillRect(x, y, width, height) {
        this.$context2d.fillRect(x, y, width, height);
    }
    strokeRect(x, y, width, height) {
        this.$context2d.strokeRect(x, y, width, height);
    }
    lineDash(value) {
        if (value === undefined) {
            return this.$context2d.lineDashOffset;
        }
        this.$context2d.lineDashOffset = value;
    }
    arcTo(x1, y1, x2, y2, radius) {
        this.$context2d.arcTo(x1, y1, x2, y2, radius);
    }
    isPoint(x, y) {
        return this.$context2d.isPointInPath(x, y);
    }
    createImageData(width, height) {
        return height
            ? this.$context2d.createImageData(width, height)
            : this.$context2d.createImageData(width);
    }
    getImageData(x, y, width, height) {
        return this.$context2d.getImageData(x, y, width, height);
    }
    putImageData(imageData, x, y, xs, ys, width, height) {
        if (arguments.length === 7) {
            this.$context2d.putImageData(imageData, x, y, xs, ys, width, height);
        }
        else {
            this.$context2d.putImageData(imageData, x, y);
        }
    }
    createPattern(image, direction) {
        return this.$context2d.createPattern(image, direction);
    }
    createRadialGradient(x1, y1, r1, x2, y2, r2) {
        return this.$context2d.createRadialGradient(x1, y1, r1, x2, y2, r2);
    }
    createLinearGradient(x, y, width, height) {
        return this.$context2d.createLinearGradient(x, y, width, height);
    }
    lineJoin(type) {
        if (type !== undefined) {
            this.$context2d.lineJoin = type;
        }
        else {
            return this.$context2d.lineJoin;
        }
    }
    lineCap(value) {
        if (value !== undefined) {
            this.$context2d.lineCap = value;
        }
        else {
            return this.$context2d.lineCap;
        }
    }
    shadowBlur(opacity) {
        if (opacity === undefined) {
            return this.$context2d.shadowBlur;
        }
        this.$context2d.shadowBlur = opacity;
    }
    shadowColor(...args) {
        this.$context2d.shadowColor = this._toRgb(args);
    }
}
class EAnimate extends MyElement {
    constructor(animate) {
        super();
        this.__animate = new Animate();
        if (animate) {
            this.__animate.config(animate);
        }
    }
    get animate() {
        return this.__animate;
    }
    get $() {
        return this.animate.$;
    }
    get running() {
        return this.animate.running;
    }
    get done() {
        return this.animate.done;
    }
    get xFrom() {
        return this.animate.xFrom;
    }
    get yFrom() {
        return this.animate.yFrom;
    }
    get zFrom() {
        return this.animate.zFrom;
    }
    get xTo() {
        return this.animate.xTo;
    }
    get yTo() {
        return this.animate.yTo;
    }
    get zTo() {
        return this.animate.zTo;
    }
    get x() {
        return this.animate.x;
    }
    get y() {
        return this.animate.y;
    }
    get z() {
        return this.animate.z;
    }
    get frames() {
        return this.animate.frames;
    }
    get frame() {
        return this.animate.frame;
    }
    set frame(value) {
        this.animate.frame = value;
    }
    config(animate) {
        this.animate.config(animate);
    }
    set(x, y, z) {
        this.animate.set(x, y, z);
    }
    moveTo(x, y, z) {
        this.animate.move(x, y, z);
    }
    moveAsync(x, y, z) {
        return this.animate.moveAsync(x, y, z);
    }
    moveImmediate(x, y, z) {
        this.animate.moveImmediate(x, y, z);
    }
    addFrame() {
        this.animate.addFrame();
    }
    setType(type) {
        this.animate.setType(type);
    }
    setTime(time) {
        this.animate.setTime(time);
    }
}
class fCanvas {
    constructor(element) {
        this._ENV = {
            angleMode: "degress",
            rectAlign: "left",
            rectBaseline: "top",
            colorMode: "rgb",
            rotate: 0,
            clear: true,
            loop: true,
        };
        this._id = fCanvas.count++;
        this._el = document.createElement("canvas");
        this._context2dCaching = null;
        this._stamentReady = new Stament();
        this._existsPreload = false;
        this.__translate = {
            x: 0,
            y: 0,
            sumX: 0,
            sumY: 0,
        };
        this.__scale = {
            x: 0,
            y: 0,
            sumX: 0,
            sumY: 0,
        };
        this.__idFrame = null;
        this.preventTouch = false;
        this.stopTouch = false;
        this.touches = [];
        this.changedTouches = [];
        const handlerEvent = (event) => {
            try {
                if (event.type !== "mouseout") {
                    this.touches = getTouchInfo(this.$el, event.touches || [event]);
                    this.changedTouches = getTouchInfo(this.$el, event.changedTouches || [event]);
                }
                else {
                    this.touches = [];
                }
                this.preventTouch && event.preventDefault();
                this.stopTouch && event.stopPropagation();
            }
            catch (e) {
                // throw e;
            }
        };
        if (element instanceof HTMLCanvasElement) {
            this._el = element;
        }
        this.$el.addEventListener(isMobile() ? "touchstart" : "mouseover", handlerEvent);
        this.$el.addEventListener(isMobile() ? "touchmove" : "mousemove", handlerEvent);
        this.$el.addEventListener(isMobile() ? "touchend" : "mouseout", handlerEvent);
    }
    get mouseX() {
        return this.touches[0]?.x || null;
    }
    get mouseY() {
        return this.touches[0]?.y || null;
    }
    get interact() {
        return this.touches.length > 0;
    }
    get id() {
        return this._id;
    }
    get $el() {
        return this._el;
    }
    get $context2d() {
        if (this._context2dCaching === null) {
            this._context2dCaching = this.$el.getContext("2d");
        }
        return this._context2dCaching;
    }
    append(parent = document.body) {
        if (parent.contains(this.$el) === false) {
            parent.appendChild(this.$el);
        }
    }
    noClear() {
        this._ENV.clear = false;
    }
    get acceptClear() {
        return this._ENV.clear;
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
    save() {
        this.$context2d.save();
    }
    restore() {
        this.$context2d.restore();
    }
    _toRadius(value) {
        return this._ENV.angleMode === "radial" ? (value * Math.PI) / 180 : value;
    }
    _toDegress(value) {
        return this._ENV.angleMode === "degress" ? (value * 180) / Math.PI : value;
    }
    _toRgb([red = 0, green = red, blue = green, alpha = 1]) {
        if (Array.isArray(red)) {
            return this._toRgb(red);
        }
        else {
            if (typeof red === "string") {
                return red;
            }
            else {
                const after = this._ENV.colorMode.match(/hsl|hsb/i) ? "%" : "";
                return `${this._ENV.colorMode}a(${[
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
            case "center":
                x -= width / 2;
                break;
            case "right":
                x -= width;
                break;
        }
        switch (this._ENV.rectBaseline) {
            case "middle":
                y -= height / 2;
                break;
            case "bottom":
                y -= height;
                break;
        }
        return [x, y];
    }
    angleMode(value) {
        if (value === undefined) {
            return this._ENV.angleMode;
        }
        this._ENV.angleMode = value;
    }
    rectAlign(value) {
        if (value === undefined) {
            return this._ENV.rectAlign;
        }
        this._ENV.rectAlign = value;
    }
    colorMode(value) {
        if (value === undefined) {
            return this._ENV.colorMode;
        }
        this._ENV.colorMode = value;
    }
    rectBaseline(value) {
        if (value === undefined) {
            return this._ENV.rectBaseline;
        }
        this._ENV.rectBaseline = value;
    }
    fontSize(value) {
        const { size, weight, family } = fontToArray(this.font());
        if (value === undefined) {
            return size;
        }
        else {
            value = AutoToPx(value, size, size);
            this.font([weight, `${value}px`, family].join(" "));
        }
    }
    fontFamily(value) {
        const { size, weight, family } = fontToArray(this.font());
        if (value === undefined) {
            return family;
        }
        else {
            this.font([weight, `${size}px`, value].join(" "));
        }
    }
    fontWeight(value) {
        const { size, weight, family } = fontToArray(this.font());
        if (value === undefined) {
            return weight;
        }
        else {
            this.font([value, `${size}px`, family].join(" "));
        }
    }
    clear(x = 0, y = 0, w = this.width, h = this.height) {
        this.$context2d.clearRect(x, y, w, h);
    }
    background(...params) {
        if (params[0]?.constructor === HTMLImageElement) {
            this.$context2d.drawImage(params[0], 0, 0, this.width, this.height);
        }
        else {
            this.$context2d.fillStyle = this._toRgb(params);
            this.$context2d.fill();
            this.$context2d.fillRect(0, 0, this.width, this.height);
        }
    }
    toDataURL(type = "image/png", scale) {
        return this.$el.toDataURL(type, scale);
    }
    rotate(value) {
        if (value === undefined) {
            return this._ENV.rotate;
        }
        else {
            this.$context2d.rotate((this._ENV.rotate = this._toRadius(value)));
        }
    }
    resetTransform() {
        this.setTransform(1, 0, 0, 1, 0, 0);
    }
    async preload(callback) {
        this._existsPreload = true;
        await callback();
        this._stamentReady.emit("preloaded");
    }
    async setup(callback) {
        if (this._existsPreload) {
            this._stamentReady.on("preloaded", async () => {
                await setup(callback);
                this._stamentReady.emit("setuped");
            });
        }
        else {
            await setup(callback);
            this._stamentReady.emit("setuped");
        }
    }
    draw(callback) {
        this._stamentReady.on("setuped", () => {
            draw(callback, this);
        });
    }
    font(value) {
        if (value === undefined) {
            return this.$context2d.font;
        }
        this.$context2d.font = value;
    }
    textAlign(value) {
        if (value === undefined) {
            return this.$context2d.textAlign;
        }
        this.$context2d.textAlign = value;
    }
    textBaseline(value) {
        if (value === undefined) {
            return this.$context2d.textBaseline;
        }
        this.$context2d.textBaseline = value;
    }
    globalOperation(value) {
        if (value === undefined) {
            return this.$context2d.globalCompositeOperation;
        }
        this.$context2d.globalCompositeOperation = value;
    }
    translate(x, y) {
        if (arguments.length === 0) {
            return {
                x: this.__translate.x,
                y: this.__translate.y,
            };
        }
        this.$context2d.translate(x, y);
        this.__translate.sumX += x || 0;
        this.__translate.sumY += y || 0;
    }
    resetTranslate() {
        this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
    }
    scale(x, y) {
        if (arguments.length === 0) {
            return {
                x: this.__scale.x,
                y: this.__scale.y,
            };
        }
        this.$context2d.scale(x, y);
        this.__scale.sumX += x || 0;
        this.__scale.sumY += y || 0;
    }
    resetScale() {
        this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
    }
    clip(fillRule, path) {
        if (path === undefined) {
            this.$context2d.clip(fillRule);
        }
        this.$context2d.clip(path, fillRule);
    }
    transform(m11, m12, m21, m22, dx, dy) {
        if (arguments.length === 0) {
            return this.$context2d.getTransform();
        }
        if (m11 instanceof DOMMatrix) {
            const { a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = m11;
            this.$context2d.transform(a, b, c, d, e, f);
        }
        else {
            this.$context2d.transform(m11, m12, m21, m22, dx, dy);
        }
    }
    setTransform(m11, m12, m21, m22, dx, dy) {
        if (m11 instanceof DOMMatrix) {
            const { a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = m11;
            this.$context2d.setTransform(a, b, c, d, e, f);
        }
        else {
            this.$context2d.setTransform(m11, m12, m21, m22, dx, dy);
        }
    }
    sin(angle) {
        return Math.sin(this._toRadius(angle));
    }
    asin(sin) {
        return this._toDegress(Math.asin(sin));
    }
    cos(angle) {
        return Math.cos(this._toRadius(angle));
    }
    acos(cos) {
        return this._toDegress(Math.acos(cos));
    }
    tan(angle) {
        return Math.tan(this._toRadius(angle));
    }
    atan(tan) {
        return this._toDegress(Math.atan(tan));
    }
    atan2(y, x) {
        return this._toDegress(Math.atan2(y, x));
    }
    cursor() {
        this.$el.style.cursor = "auto";
    }
    noCursor() {
        this.$el.style.cursor = "none";
    }
    loop() {
        this._ENV.loop = true;
        this._stamentReady.emit("setuped");
    }
    noLoop() {
        this._ENV.loop = false;
        if (this.__idFrame) {
            (cancelAnimationFrame || webkitCancelAnimationFrame || clearTimeout)(this.__idFrame);
        }
    }
    get acceptLoop() {
        return this._ENV.loop;
    }
    keyPressed(callback) {
        this.$el.addEventListener("keypress", callback);
        return () => {
            this.$el.removeEventListener("keypress", callback);
        };
    }
    mouseIn(callback) {
        this.$el.addEventListener("mouseover", callback);
        return () => {
            this.$el.removeEventListener("mouseover", callback);
        };
    }
    mouseOut(callback) {
        this.$el.addEventListener("mouseout", callback);
        return () => {
            this.$el.removeEventListener("mouseout", callback);
        };
    }
    mouseDowned(callback) {
        this.$el.addEventListener("mousedown", callback);
        return () => {
            this.$el.removeEventListener("mousedown", callback);
        };
    }
    touchStarted(callback) {
        this.$el.addEventListener("touchstart", callback);
        return () => {
            this.$el.removeEventListener("touchstart", callback);
        };
    }
    touchMoved(callback) {
        this.$el.addEventListener("touchmove", callback);
        return () => {
            this.$el.removeEventListener("touchmove", callback);
        };
    }
    touchEned(callback) {
        this.$el.addEventListener("touchend", callback);
        return () => {
            this.$el.removeEventListener("touchend", callback);
        };
    }
    mouseMoved(callback) {
        this.$el.addEventListener("mousemove", callback);
        return () => {
            this.$el.removeEventListener("mousemove", callback);
        };
    }
    mouseUped(callback) {
        this.$el.addEventListener("mouseup", callback);
        return () => {
            this.$el.removeEventListener("mouseup", callback);
        };
    }
    mouseClicked(callback) {
        this.$el.addEventListener("click", callback);
        return () => {
            this.$el.removeEventListener("click", callback);
        };
    }
}
fCanvas.Element = MyElement;
fCanvas.EAnimate = EAnimate;
fCanvas.count = 0;
const noopFCanvas = new fCanvas();
function bindEvent(name, callback, element) {
    element.addEventListener(name, callback);
    return () => {
        element.removeEventListener(name, callback);
    };
}
export { Emitter, Stament, Store, Vector, Animate };
let inited = false;
const emitter = new Emitter();
export async function setup(callback) {
    if (document.readyState === "complete") {
        //// readyState === "complete"
        inited = true;
        emitter.emit("load");
        const ret = callback();
        if (ret && "length" in ret) {
            await ret;
        }
    }
    else {
        await new Promise((resolve, reject) => {
            function load() {
                document.removeEventListener("DOMContentLoaded", load);
                window.removeEventListener("load", load);
                inited = true;
                emitter.emit("load");
                callback();
                resolve();
            }
            document.addEventListener("DOMContentLoaded", load);
            window.addEventListener("load", load);
        });
    }
}
export function draw(callback, canvas) {
    if (inited) {
        if (canvas && canvas.acceptClear === true) {
            canvas.clear();
        }
        callback();
        if (!canvas || canvas.acceptLoop === true) {
            requestAnimationFrame(() => draw(callback, canvas));
        }
    }
    else {
        emitter.once("load", () => {
            draw(callback, canvas);
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
export * from "./methods/index";
