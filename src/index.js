import { AutoToPx, fontToArray, getTouchInfo, requestAnimationFrame, windowSize, isMobile, } from "./utils/index";
import Emitter from "./classes/Emitter";
import Stament from "./classes/Stament";
import Store from "./classes/Store";
import Vector from "./classes/Vector";
import Animate from "./classes/Animate";
class MyElement {
    /**
     * @param {fCanvas} canvas?
     * @return {any}
     */
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
    /**
     * @return {HTMLCanvasElement}
     */
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
    /**
     * @param {MyElement} element
     * @return {void}
     */
    addQueue(element) {
        if (element instanceof MyElement) {
            this._queue.push(element);
        }
        else {
            console.error(`fCanvas: the parameter passed to MyElement.addQueue() must be a fCanvas object.`);
        }
    }
    /**
     * @param {number} index
     * @return {MyElement | undefined}
     */
    getQueue(index) {
        if (index < 0) {
            index += this._queue.length;
        }
        return this._queue[index];
    }
    /**
     * @param {MyElement} element
     * @return {void}
     */
    run(element) {
        this.$parent.run(element);
    }
    /**
     * @param {number} id
     * @return {boolean}
     */
    has(id) {
        return this._els.some((item) => item.id === id);
    }
    /**
     * @return {fCanvas}
     */
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
    /**
     * @param {fCanvas} canvas
     * @return {void}
     */
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
    /**
     * @return {CanvasRenderingContext2D}
     */
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
    /**
     * @param {number} angle
     * @return {number}
     */
    sin(angle) {
        return this.$parent.sin(angle);
    }
    /**
     * @param {number} sin
     * @return {number}
     */
    asin(sin) {
        return this.$parent.asin(sin);
    }
    /**
     * @param {number} angle
     * @return {number}
     */
    cos(angle) {
        return this.$parent.cos(angle);
    }
    /**
     * @param {number} cos
     * @return {number}
     */
    acos(cos) {
        return this.$parent.asin(cos);
    }
    /**
     * @param {number} angle
     * @return {number}
     */
    tan(angle) {
        return this.$parent.tan(angle);
    }
    /**
     * @param {number} tan
     * @return {number}
     */
    atan(tan) {
        return this.$parent.atan(tan);
    }
    /**
     * @param {number} y
     * @param {number} x
     * @return {number}
     */
    atan2(y, x) {
        return this.$parent.atan2(y, x);
    }
    /**
     * @return {number | null}
     */
    get mouseX() {
        return this.$parent.mouseX;
    }
    /**
     * @return {number | null}
     */
    get mouseY() {
        return this.$parent.mouseY;
    }
    /**
     * @return {boolean}
     */
    get interact() {
        return this.$parent.interact;
    }
    /**
     * @return {number}
     */
    get width() {
        return this.$parent.width;
    }
    /**
     * @return {number}
     */
    get height() {
        return this.$parent.height;
    }
    /**
     * @return {number}
     */
    get windowWidth() {
        return this.$parent.windowWidth;
    }
    /**
     * @return {number}
     */
    get windowHeight() {
        return this.$parent.windowHeight;
    }
    fill(...args) {
        this.$context2d.fillStyle = this._toRgb(args);
        this.$context2d.fill();
    }
    /**
     * @param  {number} red
     * @param  {number} green
     * @param  {number} blue
     * @param  {number} alpha
     * @returns void
     */
    stroke(...args) {
        this.$context2d.strokeStyle = this._toRgb(args);
        this.$context2d.stroke();
    }
    /**
     * @return {void}
     */
    noFill() {
        this.fill(0, 0, 0, 0);
    }
    /**
     * @param {number} value?
     * @return {number|void}
     */
    lineWidth(value) {
        if (value === undefined) {
            return this.$context2d.lineWidth;
        }
        else {
            this.$context2d.lineWidth = value;
        }
    }
    /**
     * @param {number} value?
     * @return {number|void}
     */
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
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {void|{ x: number, y: number }}
     */
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
    /**
     * @param {string} text
     * @return {number}
     */
    measureText(text) {
        return this.$context2d.measureText(text).width;
    }
    /**
     * @return {void}
     */
    begin() {
        this.$context2d.beginPath();
    }
    /**
     * @return {void}
     */
    close() {
        this.$context2d.closePath();
    }
    /**
     * @return {void}
     */
    save() {
        this.$parent.save();
    }
    /**
     * @return {void}
     */
    restore() {
        this.$parent.restore();
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     * @returns void
     */
    arc(x, y, radius, astart, astop, reverse) {
        this.begin();
        this.$context2d.arc(x, y, radius, this._toRadius(astart) - Math.PI / 2, this._toRadius(astop) - Math.PI / 2, reverse);
        this.close();
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     */
    pie(x, y, radius, astart, astop, reverse) {
        this.begin();
        this.move(x, y);
        this.arc(x, y, radius, astart, astop, reverse);
        this.to(x, y);
        this.close();
    }
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @returns void
     */
    line(x1, y1, x2, y2) {
        this.move(x1, y1);
        this.to(x2, y2);
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius1
     * @param  {number} radius2
     * @param  {number} astart
     * @param  {number} astop
     * @param  {number} reverse
     * @returns void
     */
    ellipse(x, y, radius1, radius2, astart, astop, reverse) {
        this.begin();
        this.$context2d.ellipse(x, y, radius1, radius2, this._toRadius(astart) - Math.PI / 2, this._toRadius(astop), reverse);
        this.close();
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @returns void
     */
    circle(x, y, radius) {
        this.arc(x, y, radius, 0, this.$parent.angleMode() === "degress" ? 360 : Math.PI * 2);
    }
    /**
     * @param  {number} x
     * @param  {number} y
     * @returns void
     */
    point(x, y) {
        this.circle(x, y, 1);
    }
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @param  {number} x3
     * @param  {number} y3
     * @returns void
     */
    triange(x1, y1, x2, y2, x3, y3) {
        this.begin();
        this.move(x1, y1);
        this.to(x2, y2);
        this.to(x3, y3);
        this.close();
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
     * @returns void
     */
    drawImage(image, ...args) {
        // @ts-expect-error
        this.$context2d.drawImage(image, ...args);
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
    /**
     * @param  {number} cpx
     * @param  {number} cpy
     * @param  {number} x
     * @param  {number} y
     */
    quadratic(cpx, cpy, x, y) {
        this.$context2d.quadraticCurveTo(cpx, cpy, x, y);
    }
    /**
     * @param {number} cp1x
     * @param {number} cp1y
     * @param {number} cp2x
     * @param {number} cp2y
     * @param {number} x
     * @param {number} y
     * @return {void}
     */
    bezier(cp1x, cp1y, cp2x, cp2y, x, y) {
        this.$context2d.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {void}
     */
    move(x, y) {
        this.$context2d.moveTo(x, y);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {void}
     */
    to(x, y) {
        this.$context2d.lineTo(x, y);
    }
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {void}
     */
    fillText(text, x, y, maxWidth) {
        this.$context2d.fillText(text, x, y, maxWidth);
    }
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {void}
     */
    strokeText(text, x, y, maxWidth) {
        this.$context2d.strokeText(text, x, y, maxWidth);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {void}
     */
    fillRect(x, y, width, height) {
        this.$context2d.fillRect(x, y, width, height);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {void}
     */
    strokeRect(x, y, width, height) {
        this.$context2d.strokeRect(x, y, width, height);
    }
    /**
     * @param {number} value?
     * @return {any}
     */
    lineDash(value) {
        if (value === undefined) {
            return this.$context2d.lineDashOffset;
        }
        this.$context2d.lineDashOffset = value;
    }
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} radius
     * @return {void}
     */
    arcTo(x1, y1, x2, y2, radius) {
        this.$context2d.arcTo(x1, y1, x2, y2, radius);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    isPoint(x, y) {
        return this.$context2d.isPointInPath(x, y);
    }
    createImageData(width, height) {
        return height
            ? this.$context2d.createImageData(width, height)
            : this.$context2d.createImageData(width);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {ImageData}
     */
    getImageData(x, y, width, height) {
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
    putImageData(imageData, x, y, xs, ys, width, height) {
        if (arguments.length === 7) {
            this.$context2d.putImageData(imageData, x, y, xs, ys, width, height);
        }
        else {
            this.$context2d.putImageData(imageData, x, y);
        }
    }
    /**
     * @param {CanvasImageSource} image
     * @param {"repeat"|"repeat-x"|"repeat-y"|"no-repeat"} direction
     * @return {CanvasPattern | null}
     */
    createPattern(image, direction) {
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
    createRadialGradient(x1, y1, r1, x2, y2, r2) {
        return this.$context2d.createRadialGradient(x1, y1, r1, x2, y2, r2);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {CanvasGradient}
     */
    createLinearGradient(x, y, width, height) {
        return this.$context2d.createLinearGradient(x, y, width, height);
    }
    /**
     * @param {"bevel"|"round"|"miter"} type?
     * @return {any}
     */
    lineJoin(type) {
        if (type !== undefined) {
            this.$context2d.lineJoin = type;
        }
        else {
            return this.$context2d.lineJoin;
        }
    }
    /**
     * @param {"butt"|"round"|"square"} value?
     * @return {any}
     */
    lineCap(value) {
        if (value !== undefined) {
            this.$context2d.lineCap = value;
        }
        else {
            return this.$context2d.lineCap;
        }
    }
    /**
     * @param {number} opacity?
     * @return {any}
     */
    shadowBlur(opacity) {
        if (opacity === undefined) {
            return this.$context2d.shadowBlur;
        }
        this.$context2d.shadowBlur = opacity;
    }
    /**
     * @param {ParamsToRgb} ...args
     * @return {void}
     */
    shadowColor(...args) {
        this.$context2d.shadowColor = this._toRgb(args);
    }
}
class EAnimate extends MyElement {
    /**
     * @param {AnimateConfig} animate?
     * @return {any}
     */
    constructor(animate) {
        super();
        this.__animate = new Animate();
        if (animate) {
            this.__animate.config(animate);
        }
    }
    /**
     * @return {Animate}
     */
    get animate() {
        return this.__animate;
    }
    /**
     * @return {Emitter}
     */
    get $() {
        return this.animate.$;
    }
    /**
     * @return {boolean}
     */
    get running() {
        return this.animate.running;
    }
    /**
     * @return {boolean}
     */
    get done() {
        return this.animate.done;
    }
    /**
     * @return {number}
     */
    get xFrom() {
        return this.animate.xFrom;
    }
    /**
     * @return {number}
     */
    get yFrom() {
        return this.animate.yFrom;
    }
    /**
     * @return {number}
     */
    get zFrom() {
        return this.animate.zFrom;
    }
    /**
     * @return {number}
     */
    get xTo() {
        return this.animate.xTo;
    }
    /**
     * @return {number}
     */
    get yTo() {
        return this.animate.yTo;
    }
    /**
     * @return {number}
     */
    get zTo() {
        return this.animate.zTo;
    }
    /**
     * @return {number}
     */
    get x() {
        return this.animate.x;
    }
    /**
     * @return {number}
     */
    get y() {
        return this.animate.y;
    }
    /**
     * @return {number}
     */
    get z() {
        return this.animate.z;
    }
    /**
     * @return {number}
     */
    get frames() {
        return this.animate.frames;
    }
    /**
     * @return {number}
     */
    get frame() {
        return this.animate.frame;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    set frame(value) {
        this.animate.frame = value;
    }
    /**
     * @param {AnimateConfig} animate
     * @return {void}
     */
    config(animate) {
        this.animate.config(animate);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    set(x, y, z) {
        this.animate.set(x, y, z);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    moveTo(x, y, z) {
        this.animate.move(x, y, z);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {Promise<void>}
     */
    moveAsync(x, y, z) {
        return this.animate.moveAsync(x, y, z);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    moveImmediate(x, y, z) {
        this.animate.moveImmediate(x, y, z);
    }
    /**
     * @return {void}
     */
    addFrame() {
        this.animate.addFrame();
    }
    /**
     * @param {AnimateType} type
     * @return {void}
     */
    setType(type) {
        this.animate.setType(type);
    }
    /**
     * @param {number} time
     * @return {void}
     */
    setTime(time) {
        this.animate.setTime(time);
    }
}
class fCanvas {
    /**
     * @param {HTMLCanvasElement} element?
     * @return {any}
     */
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
    /**
     * @return {number | null}
     */
    get mouseX() {
        return this.touches[0]?.x || null;
    }
    /**
     * @return {number | null}
     */
    get mouseY() {
        return this.touches[0]?.y || null;
    }
    /**
     * @return {boolean}
     */
    get interact() {
        return this.touches.length > 0;
    }
    /**
     * @return {number}
     */
    get id() {
        return this._id;
    }
    /**
     * @return {HTMLCanvasElement}
     */
    get $el() {
        return this._el;
    }
    /**
     * @return {CanvasRenderingContext2D}
     */
    get $context2d() {
        if (this._context2dCaching === null) {
            this._context2dCaching = this.$el.getContext("2d");
        }
        return this._context2dCaching;
    }
    /**
     * @param {HTMLElement=document.body} parent
     * @return {any}
     */
    append(parent = document.body) {
        if (parent.contains(this.$el) === false) {
            parent.appendChild(this.$el);
        }
    }
    /**
     * @return {void}
     */
    noClear() {
        this._ENV.clear = false;
    }
    /**
     * @return {boolean}
     */
    get acceptClear() {
        return this._ENV.clear;
    }
    /**
     * @param {MyElement} element
     * @return {void}
     */
    run(element) {
        element._run(this);
    }
    /**
     * @return {number}
     */
    get width() {
        return this.$el.width;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    set width(value) {
        this.$el.width = value;
    }
    /**
     * @return {number}
     */
    get height() {
        return this.$el.height;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    set height(value) {
        this.$el.height = value;
    }
    /**
     * @return {number}
     */
    get windowWidth() {
        return windowSize.windowWidth.get();
    }
    /**
     * @return {number}
     */
    get windowHeight() {
        return windowSize.windowHeight.get();
    }
    /**
     * @return {void}
     */
    save() {
        this.$context2d.save();
    }
    /**
     * @return {void}
     */
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
    /**
     * @param {AngleType} value?
     * @return {any}
     */
    angleMode(value) {
        if (value === undefined) {
            return this._ENV.angleMode;
        }
        this._ENV.angleMode = value;
    }
    /**
     * @param {AlignType} value?
     * @return {any}
     */
    rectAlign(value) {
        if (value === undefined) {
            return this._ENV.rectAlign;
        }
        this._ENV.rectAlign = value;
    }
    /**
     * @param {ColorType} value?
     * @return {any}
     */
    colorMode(value) {
        if (value === undefined) {
            return this._ENV.colorMode;
        }
        this._ENV.colorMode = value;
    }
    /**
     * @param {BaselineType} value?
     * @return {any}
     */
    rectBaseline(value) {
        if (value === undefined) {
            return this._ENV.rectBaseline;
        }
        this._ENV.rectBaseline = value;
    }
    /**
     * @param {number} value?
     * @return {any}
     */
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
    /**
     * @param {string} value?
     * @return {any}
     */
    fontFamily(value) {
        const { size, weight, family } = fontToArray(this.font());
        if (value === undefined) {
            return family;
        }
        else {
            this.font([weight, `${size}px`, value].join(" "));
        }
    }
    /**
     * @param {string} value?
     * @return {any}
     */
    fontWeight(value) {
        const { size, weight, family } = fontToArray(this.font());
        if (value === undefined) {
            return weight;
        }
        else {
            this.font([value, `${size}px`, family].join(" "));
        }
    }
    /**
     * @param {number=0} x
     * @param {number=0} y
     * @param {number=this.width} w
     * @param {number=this.height} h
     * @return {void}
     */
    clear(x = 0, y = 0, w = this.width, h = this.height) {
        this.$context2d.clearRect(x, y, w, h);
    }
    /**
     * @param {ParamsToRgb} ...params
     * @return {void}
     */
    background(...params) {
        if (typeof params[0] === "object") {
            this.$context2d.drawImage(params[0], 0, 0, this.width, this.height);
        }
        else {
            this.$context2d.fillStyle = this._toRgb(params);
            this.$context2d.fill();
            this.$context2d.fillRect(0, 0, this.width, this.height);
        }
    }
    /**
     * @param {any} type="image/png"
     * @param {number} scale?
     * @return {string}
     */
    toDataURL(type = "image/png", scale) {
        return this.$el.toDataURL(type, scale);
    }
    /**
     * @param {number} value?
     * @return {any}
     */
    rotate(value) {
        if (value === undefined) {
            return this._ENV.rotate;
        }
        else {
            this.$context2d.rotate((this._ENV.rotate = this._toRadius(value)));
        }
    }
    /**
     * @return {void}
     */
    resetTransform() {
        this.setTransform(1, 0, 0, 1, 0, 0);
    }
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */
    async preload(callback) {
        this._existsPreload = true;
        await callback();
        this._stamentReady.emit("preloaded");
    }
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */
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
    /**
     * @param {Function} callback
     * @return {void}
     */
    draw(callback) {
        this._stamentReady.on("setuped", () => {
            draw(callback, this);
        });
    }
    /**
     * @param {string} value?
     * @return {any}
     */
    font(value) {
        if (value === undefined) {
            return this.$context2d.font;
        }
        this.$context2d.font = value;
    }
    /**
     * @param {TextAlignType} value?
     * @return {any}
     */
    textAlign(value) {
        if (value === undefined) {
            return this.$context2d.textAlign;
        }
        this.$context2d.textAlign = value;
    }
    /**
     * @param {TextBaselineType} value?
     * @return {any}
     */
    textBaseline(value) {
        if (value === undefined) {
            return this.$context2d.textBaseline;
        }
        this.$context2d.textBaseline = value;
    }
    /**
     * @param {GlobalCompositeOperationType} value?
     * @return {any}
     */
    globalOperation(value) {
        if (value === undefined) {
            return this.$context2d.globalCompositeOperation;
        }
        this.$context2d.globalCompositeOperation = value;
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {any}
     */
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
    /**
     * @return {void}
     */
    resetTranslate() {
        this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {any}
     */
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
    /**
     * @return {void}
     */
    resetScale() {
        this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
    }
    /**
     * @param {any} fillRule?
     * @param {any} path?
     * @return {void}
     */
    clip(fillRule, path) {
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
    /**
     * @param {number|DOMMatrix} m11
     * @param {number} m12?
     * @param {number} m21?
     * @param {number} m22?
     * @param {number} dx?
     * @param {number} dy?
     * @return {void}
     */
    setTransform(m11, m12, m21, m22, dx, dy) {
        if (m11 instanceof DOMMatrix) {
            const { a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = m11;
            this.$context2d.setTransform(a, b, c, d, e, f);
        }
        else {
            this.$context2d.setTransform(m11, m12, m21, m22, dx, dy);
        }
    }
    /**
     * @param {number} angle
     * @return {number}
     */
    sin(angle) {
        return Math.sin(this._toRadius(angle));
    }
    /**
     * @param {number} sin
     * @return {number}
     */
    asin(sin) {
        return this._toDegress(Math.asin(sin));
    }
    /**
     * @param {number} angle
     * @return {number}
     */
    cos(angle) {
        return Math.cos(this._toRadius(angle));
    }
    /**
     * @param {number} cos
     * @return {number}
     */
    acos(cos) {
        return this._toDegress(Math.acos(cos));
    }
    /**
     * @param {number} angle
     * @return {number}
     */
    tan(angle) {
        return Math.tan(this._toRadius(angle));
    }
    /**
     * @param {number} tan
     * @return {number}
     */
    atan(tan) {
        return this._toDegress(Math.atan(tan));
    }
    /**
     * @param {number} y
     * @param {number} x
     * @return {number}
     */
    atan2(y, x) {
        return this._toDegress(Math.atan2(y, x));
    }
    /**
     * @return {void}
     */
    cursor() {
        this.$el.style.cursor = "auto";
    }
    /**
     * @return {void}
     */
    noCursor() {
        this.$el.style.cursor = "none";
    }
    /**
     * @return {void}
     */
    loop() {
        this._ENV.loop = true;
        this._stamentReady.emit("setuped");
    }
    /**
     * @return {void}
     */
    noLoop() {
        this._ENV.loop = false;
        if (this.__idFrame) {
            (cancelAnimationFrame || webkitCancelAnimationFrame || clearTimeout)(this.__idFrame);
        }
    }
    /**
     * @return {boolean}
     */
    get acceptLoop() {
        return this._ENV.loop;
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    keyPressed(callback) {
        this.$el.addEventListener("keypress", callback);
        return () => {
            this.$el.removeEventListener("keypress", callback);
        };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseIn(callback) {
        this.$el.addEventListener("mouseover", callback);
        return () => {
            this.$el.removeEventListener("mouseover", callback);
        };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseOut(callback) {
        this.$el.addEventListener("mouseout", callback);
        return () => {
            this.$el.removeEventListener("mouseout", callback);
        };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseDowned(callback) {
        this.$el.addEventListener("mousedown", callback);
        return () => {
            this.$el.removeEventListener("mousedown", callback);
        };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    touchStarted(callback) {
        this.$el.addEventListener("touchstart", callback);
        return () => {
            this.$el.removeEventListener("touchstart", callback);
        };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    touchMoved(callback) {
        this.$el.addEventListener("touchmove", callback);
        return () => {
            this.$el.removeEventListener("touchmove", callback);
        };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    touchEned(callback) {
        this.$el.addEventListener("touchend", callback);
        return () => {
            this.$el.removeEventListener("touchend", callback);
        };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseMoved(callback) {
        this.$el.addEventListener("mousemove", callback);
        return () => {
            this.$el.removeEventListener("mousemove", callback);
        };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseUped(callback) {
        this.$el.addEventListener("mouseup", callback);
        return () => {
            this.$el.removeEventListener("mouseup", callback);
        };
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
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
/**
 * @param {any} document.readyState==="complete"
 * @return {any}
 */
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
/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */
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
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function keyPressed(callback, element = window) {
    return bindEvent("keypress", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function changeSize(callback, element = window) {
    return bindEvent("resize", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mouseWheel(callback, element = window) {
    return bindEvent("wheel", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mousePressed(callback, element = window) {
    return bindEvent("mousedown", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mouseClicked(callback, element = window) {
    return bindEvent("click", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mouseMoved(callback, element = window) {
    return bindEvent("mousemove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function touchStarted(callback, element = window) {
    return bindEvent("touchstart", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function touchMoved(callback, element = window) {
    return bindEvent("touchmove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function touchEnded(callback, element = window) {
    return bindEvent("touchend", callback, element);
}
export default fCanvas;
export * from "./methods/index";
