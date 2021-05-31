/**
 * @param {any} e
 * @return {any}
 */
const requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
        return setTimeout(callback, 100 / 6);
    };
const cancelAnimationFrame = window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    function (timeoutId) {
        clearTimeout(timeoutId);
    };
const isTouch = "ontouchstart" in window || "onmsgesturechange" in window;
let supportPassive = false;
function noop() { }
try {
    let opts = Object.defineProperty({}, "passive", {
        get() {
            supportPassive = true;
            return false;
        },
    });
    window.addEventListener("testPassive", noop, opts);
    window.removeEventListener("testPassive", noop, opts);
}
catch {
    supportPassive = false;
}
const passive = supportPassive;
const windowSize = {
    windowWidth: {
        get: () => window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
    },
    windowHeight: {
        get: () => window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight,
    },
};
/**
 * @param {string|null} string
 * @return {string}
 */
function trim(string) {
    if (string == null) {
        return "null";
    }
    else {
        return string.replace(/^\s+|\s+$/g, "");
    }
}
/**
 * @param {string} font
 * @return {InfoFont}
 */
function fontToArray(font) {
    const _font = font.split(" ");
    if (_font.length === 2) {
        return {
            size: parseFloat(_font[0]),
            family: trim(_font[1]),
            weight: "normal",
        };
    }
    return {
        size: parseFloat(_font[1]),
        family: trim(_font[2]),
        weight: trim(_font[0]),
    };
}
/**
 * @param {string|number} string
 * @param {number} fi
 * @param {number} fontSize?
 * @return {number}
 */
function AutoToPx(string, fi, fontSize) {
    if (typeof string === "string") {
        string = trim(string);
        const number = parseFloat(string);
        const dp = string.match(/[a-z%]+$/i)?.[1] || "px";
        switch (dp) {
            case "px":
                return number;
            case "em":
                return (fontSize || 0) * number;
            case "rem":
                return (fontSize || 0) * 16;
            case "vw":
                return (windowSize.windowWidth.get() * number) / 100;
            case "vh":
                return (windowSize.windowHeight.get() * number) / 100;
            case "vmin":
                return ((Math.min(windowSize.windowWidth.get(), windowSize.windowHeight.get()) *
                    number) /
                    100);
            case "vmax":
                return ((Math.max(windowSize.windowWidth.get(), windowSize.windowHeight.get()) *
                    number) /
                    100);
            case "%":
                return (fi / 100) * number;
            default:
                return +number;
        }
    }
    else {
        return parseFloat(string + "");
    }
}
/**
 * @param {HTMLCanvasElement} element
 * @param {any[]} touches
 * @return {InfoTouch[]}
 */
function getTouchInfo(element, touches) {
    const rect = element.getBoundingClientRect();
    const sx = element.scrollWidth / element.width || 1;
    const sy = element.scrollHeight / element.height || 1;
    const _touches = [], length = touches.length;
    let i = 0, touch;
    while (i < length) {
        touch = touches[i++];
        _touches.push({
            x: (touch.clientX - rect.left) / sx,
            y: (touch.clientY - rect.top) / sy,
            winX: touch.clientX,
            winY: touch.clientY,
            id: touch.identifier,
        });
    }
    return _touches;
}
/**
 * @return {boolean}
 */
function isMobile() {
    const agent = typeof navigator === "undefined"
        ? ""
        : navigator.userAgent || navigator.vendor;
    /// code from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(agent.substr(0, 4)));
}
/**
 * @param {number|string|boolean} value
 * @return {number}
 */
function extractNumber(value) {
    if (typeof value === "number") {
        return value;
    }
    return parseFloat(`${value}`);
}

class Emitter {
    constructor() {
        this.__events = Object.create(null);
    }
    /**
     * @param {any} typeofcallback==="function"
     * @return {any}
     */
    on(name, callback) {
        if (typeof callback === "function") {
            if (name in this.__events) {
                this.__events[name].push(callback);
            }
            else {
                this.__events[name] = [callback];
            }
        }
        return () => {
            this.off(name, callback);
        };
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback?
     * @return {void}
     */
    off(name, callback) {
        if (typeof callback === "function") {
            this.__events[name] = this.__events[name].filter((item) => item !== callback);
            if (this.__events[name].length === 0) {
                delete this.__events[name];
            }
        }
        else {
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
    emit(name, ...payload) {
        if (name in this.__events) {
            for (let index = this.__events[name].length - 1; index > -1; index--) {
                this.__events[name][index](...payload);
            }
        }
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback
     * @return {void}
     */
    once(name, callback) {
        const handler = (...args) => {
            callback(...args);
            this.off(name, handler);
        };
        this.on(name, handler);
    }
}

function reactiveDefine(value, callback, parent = []) {
    if (value !== null && typeof value === "object") {
        /// reactive children
        if (Array.isArray(value)) {
            /// bind to propertyes
            /// reactive method array
            if (!value.__reactive) {
                ["push", "pop", "shift", "unshift", "splice"].forEach((name) => {
                    const proto = value[name];
                    Object.defineProperty(value, name, {
                        writable: false,
                        enumerable: false,
                        configurable: true,
                        value() {
                            const newValue = proto.apply(this, arguments);
                            callback([...parent], this, newValue);
                            return newValue;
                        },
                    });
                });
                Object.defineProperty(value, "__reactive", {
                    writable: false,
                    enumerable: false,
                    configurable: true,
                    value: true,
                });
            }
            ////
            value.forEach((item, index) => {
                if (item !== null && typeof item === "object") {
                    reactiveDefine(item, callback, [...parent, index + ""]);
                }
            });
        }
        else {
            //// if object ===> reactive attribute
            /// create __store if not exists
            /// reactive social
            if (!value.__reactive) {
                Object.defineProperty(value, "__store", {
                    writable: true,
                    enumerable: false,
                    configurable: true,
                    value: { ...value },
                });
                Object.defineProperty(value, "__reactive", {
                    writable: false,
                    enumerable: false,
                    configurable: true,
                    value: true,
                });
            }
            else {
                value.__store = { ...value };
            }
            for (const key in value) {
                Object.defineProperty(value, key, {
                    get() {
                        return value.__store?.[key];
                    },
                    enumerable: true,
                    set(newValue) {
                        const old = value.__store?.[key];
                        if (value.__store) {
                            value.__store[key] = newValue;
                        }
                        reactiveDefine(newValue, callback, [...parent, key]);
                        callback([...parent, key], old, newValue);
                    },
                });
                reactiveDefine(value[key], callback, [...parent, key]);
            }
        }
    }
}
class Store {
    /**
     * @param {Object} store?
     * @return {any}
     */
    constructor(store) {
        this.__emitter = new Emitter();
        for (const key in store) {
            this[key] = store[key];
        }
        reactiveDefine(this, (paths, oldVal, newVal) => {
            this.__emitter.emit(paths.join("."), oldVal, newVal);
        });
    }
    /**
     * @param {Store|Object} object
     * @param {string} key
     * @param {any} value
     * @return {void}
     */
    $set(object, key, value) {
        object[key] = value;
        reactiveDefine(object, (paths, oldVal, newVal) => {
            this.__emitter.emit(paths.join("."), oldVal, newVal);
        });
        object[key] = value;
    }
    /**
     * @param {string} key
     * @param {CallbackEvent} callback
     * @return {any}
     */
    $watch(key, callback) {
        return this.__emitter.on(key, callback);
    }
}

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
class Vector {
    /**
     * Creates an instance of Vector.
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     * @memberof Vector
     */
    constructor(x = 0, y = 0, z = 0) {
        [this.x, this.y, this.z] = [x, y, z];
    }
    /**
     *
     *
     * @param {(Vector | [number?, number?, number?] | number)} x
     * @param {number} [y]
     * @param {number} [z]
     * @return {*}  {this}
     * @memberof Vector
     */
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
    /**
     *
     *
     * @return {*}  {Vector}
     * @memberof Vector
     */
    copy() {
        return new Vector(this.x, this.y, this.z);
    }
    /**
     *
     *
     * @param {(Vector | [number?, number?, number?] | number)} x
     * @param {number} [y]
     * @param {number} [z]
     * @return {*}  {this}
     * @memberof Vector
     */
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
    /**
     *
     *
     * @param {(Vector | [number, number?, number?])} x
     * @memberof Vector
     */
    rem(x) {
        if (x instanceof Vector) {
            if (Number.isFinite(x.x) &&
                Number.isFinite(x.y) &&
                Number.isFinite(x.z)) {
                calculateRemainder3D(x.x, x.y, x.z, this);
            }
        }
        else if (x instanceof Array) {
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
        }
        else if (arguments.length === 1) {
            if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
                this.x = this.x % arguments[0];
                this.y = this.y % arguments[0];
                this.z = this.z % arguments[0];
            }
        }
        else if (arguments.length === 2) {
            const vectorComponents = [].slice.call(arguments);
            if (vectorComponents.every(function (element) {
                return Number.isFinite(element);
            })) {
                if (vectorComponents.length === 2) {
                    calculateRemainder2D(vectorComponents[0], vectorComponents[1], this);
                }
            }
        }
        else if (arguments.length === 3) {
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
     *
     *
     * @param {(Vector | [number?, number?, number?] | number)} x
     * @param {number} [y]
     * @param {number} [z]
     * @return {*}  {this}
     * @memberof Vector
     */
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
    /**
     *
     *
     * @param {number} n
     * @return {*}  {this}
     * @memberof Vector
     */
    mult(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    }
    /**
     *
     *
     * @param {number} n
     * @return {*}  {this}
     * @memberof Vector
     */
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
    /**
     *
     *
     * @return {*}  {number}
     * @memberof Vector
     */
    mag() {
        return Math.sqrt(this.magSq());
    }
    /**
     *
     *
     * @return {*}  {number}
     * @memberof Vector
     */
    magSq() {
        const { x, y, z } = this;
        return x * x + y * y + z * z;
    }
    /**
     *
     *
     * @param {(number | Vector)} [x]
     * @param {number} [y]
     * @param {number} [z]
     * @return {*}  {number}
     * @memberof Vector
     */
    dot(x, y, z) {
        if (x instanceof Vector) {
            return this.dot(x.x, x.y, x.z);
        }
        return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
    }
    /**
     *
     *
     * @param {Vector} v
     * @return {*}  {Vector}
     * @memberof Vector
     */
    cross(v) {
        return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }
    /**
     *
     *
     * @return {*}  {this}
     * @memberof Vector
     */
    normalize() {
        const len = this.mag();
        if (len !== 0) {
            this.mult(1 / len);
        }
        return this;
    }
    /**
     *
     *
     * @param {number} max
     * @return {*}  {this}
     * @memberof Vector
     */
    limit(max) {
        const mSq = this.magSq();
        if (mSq > max ** 2) {
            this.div(Math.sqrt(mSq)) //normalize it
                .mult(max);
        }
        return this;
    }
    /**
     *
     *
     * @param {number} n
     * @return {*}  {this}
     * @memberof Vector
     */
    setMag(n) {
        return this.normalize().mult(n);
    }
    /**
     *
     *
     * @return {*}  {number}
     * @memberof Vector
     */
    heading() {
        return Math.atan2(this.y, this.x);
    }
    /**
     *
     *
     * @param {number} angle
     * @return {*}  {this}
     * @memberof Vector
     */
    rotate(angle) {
        const newHeading = this.heading() + angle;
        const mag = this.mag();
        this.x = Math.cos(newHeading) * mag;
        this.y = Math.sin(newHeading) * mag;
        return this;
    }
    /**
     *
     *
     * @param {Vector} vector
     * @return {*}  {number}
     * @memberof Vector
     */
    angleBetween(vector) {
        const dotmagmag = this.dot(vector) / (this.mag() * vector.mag());
        const angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag))) *
            Math.sign(this.cross(vector).z || 1);
        return angle;
    }
    /**
     *
     *
     * @param {(Vector | number)} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     * @param {number} [amt=0]
     * @return {*}  {this}
     * @memberof Vector
     */
    lerp(x = 0, y = 0, z = 0, amt = 0) {
        if (x instanceof Vector) {
            return this.lerp(x.x, x.y, x.z, y);
        }
        this.x += (x - this.x) * amt || 0;
        this.y += (y - this.y) * amt || 0;
        this.z += (z - this.z) * amt || 0;
        return this;
    }
    /**
     *
     *
     * @param {Vector} surfaceNormal
     * @return {*}  {this}
     * @memberof Vector
     */
    reflect(surfaceNormal) {
        surfaceNormal.normalize();
        return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
    }
    /**
     *
     *
     * @return {*}  {[number, number, number]}
     * @memberof Vector
     */
    array() {
        return [this.x || 0, this.y || 0, this.z || 0];
    }
    /**
     *
     *
     * @param {(Vector | [number?, number?, number?] | number)} [x]
     * @param {number} [y]
     * @param {number} [z]
     * @return {*}  {boolean}
     * @memberof Vector
     */
    equals(x, y, z) {
        let a, b, c;
        if (x instanceof Vector) {
            a = x.x || 0;
            b = x.y || 0;
            c = x.z || 0;
        }
        else if (x instanceof Array) {
            a = x[0] || 0;
            b = x[1] || 0;
            c = x[2] || 0;
        }
        else {
            a = x || 0;
            b = y || 0;
            c = z || 0;
        }
        return this.x === a && this.y === b && this.z === c;
    }
    /**
     *
     *
     * @return {*}  {string}
     * @memberof Vector
     */
    toString() {
        return "Vector: [" + this.array().join(", ") + "]";
    }
}

/**
 * @param {Circle} circle1
 * @param {Circle} circle2
 * @return {boolean}
 */
function CircleImpact(circle1, circle2) {
    return ((circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2 <
        (circle1.radius + circle2.radius) ** 2);
}
/**
 * @param {Circle} circle
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
function CircleImpactPoint(circle, x, y) {
    if (x == null || y == null) {
        return false;
    }
    return (x - circle.x) ** 2 + (y - circle.y) ** 2 < circle.radius ** 2;
}
/**
 * @param {Circle} circle
 * @param {Rect} rect
 * @return {boolean}
 */
function CircleImpactRect(circle, rect) {
    const x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    const distance = (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);
    return distance < circle.radius ** 2;
}
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
    const img = new Image();
    img.src = src;
    return new Promise((resolve, reject) => {
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
 * @param {string} src
 * @return {Promise<HTMLAudioElement>}
 */
function loadAudio(src) {
    const audio = new Audio();
    audio.src = src;
    return new Promise((resolve, reject) => {
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
    return ((value - start) * (max - min)) / (stop - start) + min;
}
function random(...args) {
    if (args.length === 1) {
        if (args[0] !== null &&
            typeof args[0] === "object" &&
            "length" in args[0]) {
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
    const arr = [];
    let isChar = false;
    if (stop === undefined)
        (stop = start), (start = 1);
    if (typeof start === "string") {
        start = start.charCodeAt(0);
        stop = stop.charCodeAt(0);
        isChar = true;
    }
    if (start !== stop && Math.abs(stop - start) < Math.abs(step))
        throw new Error("range(): step exceeds the specified range.");
    if (stop > start) {
        step < 0 && (step *= -1);
        while (start <= stop) {
            arr.push(isChar ? String.fromCharCode(start) : start);
            start += step;
        }
    }
    else {
        step > 0 && (step *= -1);
        while (start >= stop) {
            arr.push(isChar ? String.fromCharCode(start) : start);
            start += step;
        }
    }
    return arr;
}
/**
 * @param {Rect} rect1
 * @param {Rect} rect2
 * @return {boolean}
 */
function RectImpact(rect1, rect2) {
    return (rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.y + rect1.height >= rect2.y);
}
/**
 * @param {Rect} rect
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
function RectImpactPoint(rect, x, y) {
    if (x == null || y == null) {
        return false;
    }
    return (rect.x < x &&
        rect.x + rect.width > x &&
        rect.y < y &&
        rect.y + rect.height > y);
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
const hypot = typeof Math.hypot === "function"
    ? Math.hypot
    : (...args) => {
        const len = args.length;
        let i = 0, result = 0;
        while (i < len)
            result += Math.pow(args[i++], 2);
        return Math.sqrt(result);
    };
/**
 * @param {number} value
 * @param {number} max
 * @param {number} prevent
 * @return {number}
 */
function odd(value, max, prevent) {
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
function off(value, min, prevent) {
    if (value === min) {
        return prevent;
    }
    return value - 1;
}
///// https://jsfiddle.net/casamia743/xqh48gno/
function calcProjectedRectSizeOfRotatedRect(width, height, rad) {
    const rectProjectedWidth = Math.abs(width * Math.cos(rad)) + Math.abs(height * Math.sin(rad));
    const rectProjectedHeight = Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad));
    return [rectProjectedWidth, rectProjectedHeight];
}
let virualContext;
function cutImage(image, x = 0, y = 0, width = extractNumber(`${image.width}`), height = extractNumber(`${image.height}`), rotate = 0) {
    if (virualContext === undefined) {
        virualContext = document
            .createElement("canvas")
            .getContext("2d"); /// never null
    }
    /// ------------------ draw image canvas -----------------
    const rad = (rotate * Math.PI) / 180;
    const [nwidth, nheight] = calcProjectedRectSizeOfRotatedRect(width, height, rad);
    virualContext.canvas.width = width;
    virualContext.canvas.height = height;
    virualContext.save();
    virualContext.translate(width / 2, height / 2);
    virualContext.rotate((rotate * Math.PI) / 180);
    virualContext.drawImage(image, x, y, nwidth, nheight, -nwidth / 2, -nheight / 2, nwidth, nheight);
    virualContext.restore();
    /// -----------------------------------------------------------
    const imageCuted = new Image();
    imageCuted.src = virualContext.canvas.toDataURL();
    virualContext.clearRect(0, 0, width, height);
    return imageCuted;
}

function getAnimate(type, currentProgress, start, distance, steps, power) {
    switch (type) {
        case "ease":
            currentProgress /= steps / 2;
            if (currentProgress < 1) {
                return (distance / 2) * Math.pow(currentProgress, power) + start;
            }
            currentProgress -= 2;
            return (distance / 2) * (Math.pow(currentProgress, power) + 2) + start;
        case "quadratic":
            currentProgress /= steps / 2;
            if (currentProgress <= 1) {
                return (distance / 2) * currentProgress * currentProgress + start;
            }
            currentProgress--;
            return (-1 * (distance / 2) * (currentProgress * (currentProgress - 2) - 1) +
                start);
        case "sine-ease-in-out":
            return ((-distance / 2) * (Math.cos((Math.PI * currentProgress) / steps) - 1) +
                start);
        case "quintic-ease":
            currentProgress /= steps / 2;
            if (currentProgress < 1) {
                return (distance / 2) * Math.pow(currentProgress, 5) + start;
            }
            currentProgress -= 2;
            return (distance / 2) * (Math.pow(currentProgress, 5) + 2) + start;
        case "exp-ease-in-out":
            currentProgress /= steps / 2;
            if (currentProgress < 1)
                return (distance / 2) * Math.pow(2, 10 * (currentProgress - 1)) + start;
            currentProgress--;
            return (distance / 2) * (-Math.pow(2, -10 * currentProgress) + 2) + start;
        case "linear":
            return start + (distance / steps) * currentProgress;
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
function getValueInFrame(type, start, stop, frame, frames, power = 3) {
    const distance = stop - start;
    return getAnimate(type, frame, start, distance, frames, power);
}
class Animate {
    /**
     * @param {AnimateConfig={time:0}} config
     * @return {any}
     */
    constructor(config = { time: 0 }) {
        this.event = new Emitter();
        this._frame = 1;
        this.type = "linear";
        this.time = 0;
        this.fps = 1000 / 60;
        this.xFrom = 0;
        this.xTo = 0;
        this.yFrom = 0;
        this.yTo = 0;
        this.zFrom = 0;
        this.zTo = 0;
        this.config(config);
    }
    /**
     * Get frames from time
     * @param {number} time
     * @param {number=1000/60} fps
     * @return {number}
     */
    static getFrames(time, fps = 1000 / 60) {
        return time / fps; /// time * 1 / fps
    }
    /**
     * @return {number}
     */
    get x() {
        return getValueInFrame(this.type, this.xFrom, this.xTo, this.frame, this.frames);
    }
    /**
     * @return {number}
     */
    get y() {
        return getValueInFrame(this.type, this.yFrom, this.yTo, this.frame, this.frames);
    }
    /**
     * @return {number}
     */
    get z() {
        return getValueInFrame(this.type, this.zFrom, this.zTo, this.frame, this.frames);
    }
    /**
     * @return {number}
     */
    get frames() {
        return Animate.getFrames(this.time, this.fps);
    }
    /**
     * @return {number}
     */
    get frame() {
        return this._frame;
    }
    /**
     * @param {number} value
     * @return {any}
     */
    set frame(value) {
        this._frame = constrain(value, 0, this.frames);
        if (this._frame === this.frames) {
            this.event.emit("done");
        }
    }
    /**
     * @return {boolean}
     */
    get running() {
        return this.frame < this.frames;
    }
    /**
     * @return {boolean}
     */
    get done() {
        return this.frame === this.frames;
    }
    /**
     * @param {any} {xFrom=0
     * @param {any} xTo=0
     * @param {any} yFrom=0
     * @param {any} yTo=0
     * @param {any} zFrom=0
     * @param {any} zTo=0
     * @param {any} type="linear"
     * @param {any} time
     * @param {any} fps=1000/60
     * @param {AnimateConfig} }
     * @return {void}
     */
    config({ xFrom = 0, xTo = 0, yFrom = 0, yTo = 0, zFrom = 0, zTo = 0, type = "linear", time, fps = 1000 / 60, }) {
        [this.xFrom, this.xTo, this.yFrom, this.yTo, this.zFrom, this.zTo] = [
            xFrom,
            xTo,
            yFrom,
            yTo,
            zFrom,
            zTo,
        ];
        this.type = type;
        this.time = time;
        this.fps = fps;
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    set(x, y, z) {
        [this.xFrom, this.yFrom, this.zFrom] = [x || 0, y || 0, z || 0];
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    moveTo(x, y, z) {
        this.frame = 1;
        [this.xTo, this.yTo, this.zTo] = [x || 0, y || 0, z || 0];
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {Promise<void>}
     */
    moveToSync(x, y, z) {
        this.moveTo(x, y, z);
        return new Promise((resolve) => {
            this.event.once("done", () => resolve());
        });
    }
    /**
     * @returns void
     */
    addFrame() {
        this.frame++;
    }
    /**
     * @param  {AnimateType} type
     * @returns void
     */
    setType(type) {
        this.type = type;
    }
    /**
     * @returns number
     */
    getTime() {
        return this.time;
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    moveImmediate(x, y, z) {
        [this.xFrom, this.yFrom, this.zFrom] = [this.x, this.y, this.z];
        this.moveTo(x, y, z);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {Promise<void>}
     */
    moveImmediateSync(x, y, z) {
        this.moveImmediate(x, y, z);
        return new Promise((resolve) => {
            this.event.once("done", () => resolve());
        });
    }
}
Animate.getValueInFrame = getValueInFrame;

class Camera {
    /**
     * @param {number} width?
     * @param {number} height?
     * @param {number} x?
     * @param {number} y?
     * @param {number} vWidth?
     * @param {number} vHeight?
     * @param {number|false} cix?
     * @param {number} ciy?
     * @param {number} cwidth?
     * @param {number} cheight?
     * @return {any}
     */
    constructor(width, height, x, y, vWidth, vHeight, cix, ciy, cwidth, cheight) {
        this.viewport = {
            width: 0,
            height: 0,
        }; /// view port 100% frame
        this.viewBox = {
            mx: 0,
            my: 0,
            width: 0,
            height: 0,
        }; /// view box for full canvas
        this._cx = 0; /// x camera
        this._cy = 0; /// y camera
        this.cursor = {
            __camera: this,
            use: true,
            idealX: 0,
            idealY: 0,
            idealRX: 0,
            offsetTop: 0,
            offsetRight: 0,
            offsetBottom: 0,
            offsetLeft: 0,
            width: 0,
            height: 0,
            get x() {
                if (this.__camera._cx < -this.__camera.viewBox.mx) {
                    const dx = -this.__camera.viewBox.mx - this.__camera._cx;
                    return this.idealX - dx;
                }
                if (this.__camera._cx >
                    this.__camera.viewport.width - this.__camera.viewBox.width) {
                    const dx = this.__camera.viewport.width -
                        this.__camera.viewBox.width -
                        this.__camera._cx;
                    return this.idealX - dx;
                }
                return this.idealX;
            },
            set x(x) {
                if (x < this.idealX) {
                    this.__camera._cx = x - this.idealX - this.__camera.viewBox.mx;
                }
                if (x > this.idealX + this.idealRX) {
                    this.__camera._cx =
                        x -
                            this.idealX +
                            this.__camera.viewport.width -
                            this.__camera.viewBox.width -
                            this.width;
                }
            },
            get y() {
                if (this.__camera._cy < -this.__camera.viewBox.my) {
                    const dy = -this.__camera.viewBox.my - this.__camera._cy;
                    return this.idealY - dy;
                }
                if (this.__camera._cy >
                    this.__camera.viewport.height - this.__camera.viewBox.height) {
                    const dy = this.__camera.viewport.height -
                        this.__camera.viewBox.height -
                        this.__camera._cy;
                    return this.idealY - dy;
                }
                return this.idealY;
            },
            set y(y) {
                if (y < this.idealY) {
                    this.__camera._cy = y - this.idealY - this.__camera.viewBox.my;
                }
                if (y > this.idealY) {
                    this.__camera._cy =
                        y -
                            this.idealY +
                            this.__camera.viewport.height -
                            this.__camera.viewBox.height -
                            this.height;
                }
            },
        };
        this.setViewport(width || 0, height || 0);
        this.setViewBox(x || 0, y || 0, vWidth || 0, vHeight || 0);
        if (cix === false) {
            this.setCursor(false);
        }
        else {
            this.setCursor(cix, ciy, cwidth, cheight);
        }
    }
    get cx() {
        return this._cx;
    }
    set cx(x) {
        if (this.cursor.use) {
            this._cx = constrain(x, -this.cursor.idealX - this.viewBox.mx - this.cursor.offsetLeft, this.viewport.width -
                this.viewBox.width +
                (this.viewBox.width - this.cursor.idealX - this.cursor.width) +
                this.cursor.offsetRight);
        }
        else {
            this._cx = constrain(x, -this.viewBox.mx, this.viewport.width - this.viewBox.width);
        }
    }
    get cy() {
        return this._cy;
    }
    set cy(y) {
        if (this.cursor.use) {
            this._cy = constrain(y, -this.cursor.idealY - this.viewBox.my - this.cursor.offsetTop, this.viewport.height -
                this.viewBox.height +
                (this.viewBox.height - this.cursor.idealY - this.cursor.height) +
                this.cursor.offsetBottom);
        }
        else {
            this._cy = constrain(y, -this.viewBox.my, this.viewport.height - this.viewBox.height);
        }
    }
    /**
     * @param {number} width?
     * @param {number} height?
     * @return {void}
     */
    setViewport(width, height) {
        this.viewport.width = width || 0;
        this.viewport.height = height || 0;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {void}
     */
    setViewBox(x, y, width, height) {
        this.viewBox.mx = x || 0;
        this.viewBox.my = y || 0;
        this.viewBox.width = width || 0;
        this.viewBox.height = height || 0;
    }
    /**
     * @param {number|false} idealX
     * @param {number} idealY?
     * @param {number} width?
     * @param {number} height?
     * @return {void}
     */
    setCursor(idealX, idealY, width, height) {
        if (arguments.length === 1) {
            if (idealX === false) {
                this.cursor.use = false;
            }
        }
        else {
            this.cursor.idealX = idealX || 0;
            this.cursor.idealY = idealY || 0;
            this.cursor.width = width || 0;
            this.cursor.height = height || 0;
        }
    }
    /**
     * @param {number} x
     * @param {number=1} scale
     * @return {number}
     */
    followX(x, scale = 1) {
        return (x -
            constrain(this._cx * scale, -this.viewBox.mx, this.viewport.width - this.viewBox.width));
    }
    /**
     * @param {number} y
     * @param {number=1} scale
     * @return {number}
     */
    followY(y, scale = 1) {
        return (y -
            constrain(this._cy * scale, -this.viewBox.my, this.viewport.height - this.viewBox.height));
    }
    /**
     * @param {Vector} vector
     * @param {number=1} scaleX
     * @param {number=scaleX} scaleY
     * @return {Vector}
     */
    followVector(vector, scaleX = 1, scaleY = scaleX) {
        return vector.set(this.followX(vector.x, scaleX), this.followY(vector.y, scaleY));
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number=1} scaleX
     * @param {number=scaleX} scaleY
     * @return {any}
     */
    follow(x, y, scaleX = 1, scaleY = scaleX) {
        return {
            x: this.followX(x, scaleX),
            y: this.followY(y, scaleY),
        };
    }
    /**
     * @param {number} x
     * @param {number=0} width
     * @param {number=1} scale
     * @return {boolean}
     */
    xInViewBox(x, width = 0, scale = 1) {
        x = this.followX(x, scale);
        if (this.viewBox.mx < x + width &&
            this.viewBox.mx + this.viewBox.width > x) {
            return true;
        }
        return false;
    }
    /**
     * @param {number} y
     * @param {number=0} height
     * @param {number=1} scale
     * @return {boolean}
     */
    yInViewBox(y, height = 0, scale = 1) {
        y = this.followY(y, scale);
        if (this.viewBox.my < y + height &&
            this.viewBox.my + this.viewBox.height > y) {
            return true;
        }
        return false;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number=0} width
     * @param {number=0} height
     * @param {number=1} scaleX
     * @param {number=scaleX} scaleY
     * @return {boolean}
     */
    inViewBox(x, y, width = 0, height = 0, scaleX = 1, scaleY = scaleX) {
        return (this.xInViewBox(x, width, scaleX) && this.yInViewBox(y, height, scaleY));
    }
    /**
     * @param {number} x
     * @param {number=0} width
     * @param {number=1} scale
     * @return {boolean}
     */
    xAfterViewBox(x, width = 0, scale = 1) {
        x = this.followX(x, scale);
        if (this.viewBox.mx >= x + width) {
            return true;
        }
        return false;
    }
    /**
     * @param {number} y
     * @param {number=0} height
     * @param {number=1} scale
     * @return {boolean}
     */
    yAfterViewBox(y, height = 0, scale = 1) {
        y = this.followY(y, scale);
        if (this.viewBox.my >= y + height) {
            return true;
        }
        return false;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number=0} width
     * @param {number=0} height
     * @param {number=1} scaleX
     * @param {number=scaleX} scaleY
     * @return {boolean}
     */
    afterViewBox(x, y, width = 0, height = 0, scaleX = 1, scaleY = scaleX) {
        return (this.xAfterViewBox(x, width, scaleX) && this.yAfterViewBox(y, height, scaleY));
    }
    /**
     * @param {number} x
     * @param {number=0} width
     * @param {number=1} scale
     * @return {boolean}
     */
    xBeforeViewBox(x, scale = 1) {
        x = this.followX(x, scale);
        if (this.viewBox.mx + this.viewBox.width <= x) {
            return true;
        }
        return false;
    }
    /**
     * @param {number} y
     * @param {number=0} height
     * @param {number=1} scale
     * @return {boolean}
     */
    yBeforeViewBox(y, scale = 1) {
        y = this.followY(y, scale);
        if (this.viewBox.my + this.viewBox.height <= y) {
            return true;
        }
        return false;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number=0} width
     * @param {number=0} height
     * @param {number=1} scaleX
     * @param {number=scaleX} scaleY
     * @return {boolean}
     */
    beforeViewBox(x, y, scaleX = 1, scaleY = scaleX) {
        return (this.xBeforeViewBox(x, scaleX) && this.yBeforeViewBox(y, scaleY));
    }
}

class Stament {
    constructor() {
        this.__store = new Store();
    }
    /**
     * @param {string} name
     * @param {CallbackEvent} callback
     * @return {void}
     */
    on(name, callback) {
        if (this.__store[name]) {
            callback();
        }
        else {
            const watcher = this.__store.$watch(name, () => {
                callback();
                watcher();
            });
        }
    }
    /**
     * @param {string} name
     * @return {void}
     */
    emit(name) {
        this.__store.$set(this.__store, name, true);
    }
}

function convertFieldToJson(keyItem) {
    const key = keyItem.textContent;
    let value = keyItem.nextElementSibling;
    if (value == null) {
        throw new Error("fCanvas<addons/loadResourceImage>: Error because syntax error in file plist.");
    }
    if (value.tagName === "dict") {
        let result = {};
        Array.from(value.childNodes)
            .filter((item) => item.tagName === "key")
            .forEach((keyItem) => {
            result = {
                ...result,
                ...convertFieldToJson(keyItem),
            };
        });
        return {
            [key]: result,
        };
    }
    if (value.tagName === "array") {
        let result = [];
        Array.from(value.childNodes)
            .filter((item) => item.tagName === "key")
            .forEach((keyItem) => {
            result.push(convertFieldToJson(keyItem));
        });
        return {
            [key]: result,
        };
    }
    if (value.tagName === "string") {
        return {
            [key]: value.textContent,
        };
    }
    if (value.tagName === "integer") {
        return {
            [key]: parseInt(value.textContent),
        };
    }
    if (value.tagName === "float") {
        return {
            [key]: parseFloat(value.textContent),
        };
    }
    if (value.tagName === "true") {
        return {
            [key]: true,
        };
    }
    if (value.tagName === "false") {
        return {
            [key]: false,
        };
    }
    return {};
}
function resolvePath(...params) {
    const root = (params[0]).replace(/\/$/, "").split("/");
    params[0] = root.slice(0, root.length - 1).join("/");
    return params.join("/");
}
class ResourceTile {
    constructor(image, plist) {
        this.__caching = Object.create(null);
        this.image = image;
        this.plist = plist;
    }
    /**
     * @param {string} name
     * @return {any}
     */
    get(name) {
        const { frame, rotated, sourceSize } = this.plist.frames[name];
        const frameArray = frame.replace(/\{|\}|\s/g, "").split(",");
        const sizeArray = sourceSize.replace(/\{|\}|\s/g, "").split(",");
        if (name in this.__caching === false) {
            this.__caching[name] = cutImage(this.image, +frameArray[0], +frameArray[1], +frameArray[2], +frameArray[3], rotated ? -90 : 0);
        }
        const imageCuted = Object.assign(this.__caching[name], {
            image: this.__caching[name],
            size: {
                width: +sizeArray[0],
                height: +sizeArray[1],
            },
        });
        return imageCuted;
    }
    /*
     * @param {string} name
     * @return {boolean}
     */
    has(name) {
        return name in this.plist.frames;
    }
}
/**
 * @param {string} path
 * @return {Promise<ResourceTile>}
 */
async function loadResourceImage(path) {
    if (path.match(/\.plist$/) == null) {
        path += `.plist`;
    }
    const plist = await fetch(`${path}`)
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "text/xml"));
    let plistJson = {};
    plist
        .querySelectorAll("plist > dict:first-child > key")
        .forEach((itemKey) => {
        plistJson = {
            ...plistJson,
            ...convertFieldToJson(itemKey),
        };
    });
    const image = await loadImage(resolvePath(path, plistJson?.metadata.realTextureFileName ||
        plistJson?.metadata.textureFileName));
    return new ResourceTile(image, plistJson);
    //// ----------------- convert to json ------------------
}

class MyElement {
    /**
     * @param {fCanvas} canvas?
     * @return {any}
     */
    constructor(canvas) {
        this.__autodraw = true;
        this._els = Object.create(null);
        this._idActiveNow = -1;
        this._queue = [];
        if (canvas?.constructor !== fCanvas) {
            canvas = noopFCanvas;
        }
        this.__addEl(canvas);
    }
    __addEl(canvas) {
        if (canvas.id in this._els === false) {
            this._els[canvas.id] = canvas;
        }
    }
    /**
     * @return {HTMLCanvasElement}
     */
    get $el() {
        return this.$parent.$el;
    }
    _run(canvas) {
        this.__addEl(canvas);
        this._idActiveNow = canvas.id;
        if (typeof this.update === "function") {
            if (this.__autodraw === true && typeof this.draw === "function") {
                this.draw();
            }
            this.update();
        }
        else if (typeof this.draw === "function") {
            this.draw();
        }
        if (this._queue.length > 0) {
            const { length } = this._queue;
            let index = 0;
            while (index < length) {
                this.run(this._queue[index]);
                index++;
            }
        }
        this._idActiveNow = -1;
    }
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */
    addQueue(element) {
        this._queue.push(element);
    }
    /**
     * @param {number} index
     * @return {LikeMyElement | undefined}
     */
    getQueue(index) {
        if (index < 0) {
            index += this._queue.length;
        }
        return this._queue[index];
    }
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */
    run(element) {
        this.$parent.run(element);
    }
    /**
     * @return {fCanvas}
     */
    get $parent() {
        const canvas = this._els[this._idActiveNow === -1 ? 0 : this._idActiveNow];
        if (canvas?.constructor === fCanvas) {
            return canvas;
        }
        else {
            console.warn("fCanvas: The current referenced version of the fCanvas.run function is incorrect.");
            return this._els[0];
        }
    }
    /**
     * @return {CanvasRenderingContext2D}
     */
    get $context2d() {
        return this.$parent.$context2d;
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
        this.$context2d.fillStyle = this.$parent._toRgb(args);
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
        this.$context2d.strokeStyle = this.$parent._toRgb(args);
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
     * @param {number} angle?
     * @return {number | void}
     */
    rotate(angle) {
        if (angle === undefined) {
            return this.$parent.rotate();
        }
        this.$parent.rotate(angle);
    }
    /**
     * @param {number} x?
     * @param {number} y?
     * @return {any}
     */
    translate(x, y) {
        if (arguments.length === 0) {
            return this.$parent.translate();
        }
        this.$parent.translate(x, y);
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
        this.$context2d.arc(x, y, radius, this.$parent._toRadius(astart) - Math.PI / 2, this.$parent._toRadius(astop) - Math.PI / 2, reverse);
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
        this.begin();
        this.move(x1, y1);
        this.to(x2, y2);
        this.close();
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
        this.$context2d.ellipse(x, y, radius1, radius2, this.$parent._toRadius(astart) - Math.PI / 2, this.$parent._toRadius(astop), reverse);
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
    rect(x, y, w, h, radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft) {
        this.begin();
        [x, y] = this.$parent._figureOffset(x, y, w, h);
        if (arguments.length < 5) {
            this.$context2d.rect(x, y, w, h);
        }
        else {
            const fontSize = this.$parent.fontSize();
            const arc = [
                AutoToPx(radiusTopLeft, w, fontSize),
                AutoToPx(radiusTopRight, h, fontSize),
                AutoToPx(radiusBottomRight, w, fontSize),
                AutoToPx(radiusBottomLeft, h, fontSize),
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
    lineDashOffset(value) {
        if (value === undefined) {
            return this.$context2d.lineDashOffset;
        }
        this.$context2d.lineDashOffset = value;
    }
    lineDash(...segments) {
        if (segments.length === 0) {
            return this.$context2d.getLineDash();
        }
        if (Array.isArray(segments[0])) {
            this.$context2d.setLineDash(segments[0]);
        }
        this.$context2d.setLineDash(segments);
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
            ? this.$parent.createImageData(width, height)
            : this.$parent.createImageData(width);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {ImageData}
     */
    getImageData(x, y, width, height) {
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
     * @return {void}
     */
    putImageData(imageData, x, y, xs, ys, width, height) {
        if (arguments.length === 7) {
            this.$parent.putImageData(imageData, x, y, xs, ys, width, height);
        }
        else {
            this.$parent.putImageData(imageData, x, y);
        }
    }
    /**
     * @param {CanvasImageSource} image
     * @param {"repeat"|"repeat-x"|"repeat-y"|"no-repeat"} direction
     * @return {CanvasPattern | null}
     */
    createPattern(image, direction) {
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
    createRadialGradient(x1, y1, r1, x2, y2, r2) {
        return this.$parent.createRadialGradient(x1, y1, r1, x2, y2, r2);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {CanvasGradient}
     */
    createLinearGradient(x, y, width, height) {
        return this.$parent.createLinearGradient(x, y, width, height);
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
        this.$context2d.shadowColor = this.$parent._toRgb(args);
    }
    drawFocusIfNeeded(path, element) {
        if (element === undefined) {
            this.$context2d.drawFocusIfNeeded(path);
        }
        else {
            this.$context2d.drawFocusIfNeeded(path, element);
        }
    }
}
class EAnimate extends MyElement {
    constructor(animate) {
        super();
        this.animate = new Animate();
        if (animate) {
            this.animate.config(animate);
        }
    }
}
class RectElement extends MyElement {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {any}
     */
    constructor(x, y, width, height) {
        super();
        this.type = "rect";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        [this.x, this.y, this.width, this.height] = [
            x || 0,
            y || 0,
            width || 0,
            height || 0,
        ];
    }
    /**
     * @return {boolean}
     */
    get interact() {
        return RectImpactPoint(this, this.mouseX, this.mouseY);
    }
}
class CircleElement extends MyElement {
    /**
     * Describe your function
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @return {any}
     */
    constructor(x, y, radius) {
        super();
        this.type = "circle";
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        [this.x, this.y, this.radius] = [x || 0, y || 0, radius || 0];
    }
    /**
     * @return {boolean}
     */
    get interact() {
        return CircleImpactPoint(this, this.mouseX, this.mouseY);
    }
}
class Point3D extends MyElement {
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {any}
     */
    constructor(x, y, z) {
        super();
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.draw = () => {
            this.point(this.x, this.y);
        };
        [this.x, this.y, this.z] = [x || 0, y || 0, z || 0];
    }
    /**
     * @param {number} angle
     * @return {void}
     */
    rotateX(angle) {
        this.y =
            this.y * this.$parent.cos(angle) + this.z * this.$parent.sin(angle);
        this.z =
            -this.y * this.$parent.sin(angle) + this.z * this.$parent.cos(angle);
    }
    /**
     * @param {number} angle
     * @return {void}
     */
    rotateY(angle) {
        this.x =
            this.x * this.$parent.cos(angle) + this.z * this.$parent.sin(angle);
        this.z =
            -this.x * this.$parent.sin(angle) + this.z * this.$parent.cos(angle);
    }
    /**
     * @param {number} angle
     * @return {void}
     */
    rotateZ(angle) {
        this.x =
            this.x * this.$parent.cos(angle) - this.y * this.$parent.sin(angle);
        this.y =
            this.x * this.$parent.sin(angle) + this.y * this.$parent.cos(angle);
    }
}

let inited = false;
const emitter = new Emitter();
function bindEvent(name, callback, element) {
    element.addEventListener(name, callback);
    return () => {
        element.removeEventListener(name, callback);
    };
}
/**
 * @param {any} document.readyState==="complete"
 * @return {any}
 */
async function setup(callback) {
    if (document.readyState === "complete") {
        //// readyState === "complete"
        const ret = callback();
        if (ret && "length" in ret) {
            await ret;
        }
        inited = true;
        emitter.emit("load");
    }
    else {
        await new Promise((resolve) => {
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
    }
}
function __draw(callback, canvas) {
    if (canvas.acceptClear === true) {
        canvas.clear();
    }
    callback();
    if (canvas.acceptLoop === true) {
        requestAnimationFrame(() => __draw(callback, canvas));
    }
}
/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */
function draw(callback, canvas) {
    if (inited) {
        if (!canvas) {
            void callback();
        }
        else {
            void __draw(callback, canvas);
        }
    }
    else {
        emitter.once("load", () => {
            draw(callback, canvas);
        });
    }
}

class fCanvas {
    /**
     * @return {any}
     */
    constructor() {
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
        this.__attributeContext = {
            alpha: true,
            desynchronized: false,
        };
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
    _createNewContext2d() {
        this._context2dCaching = this.$el.getContext("2d", this.__attributeContext);
    }
    /**
     * @return {boolean}
     */
    acceptBlur() {
        return this.__attributeContext.alpha;
    }
    /**
     * @return {void}
     */
    blur() {
        this.__attributeContext.alpha = true;
        this._createNewContext2d();
    }
    /**
     * @return {void}
     */
    noBlur() {
        this.__attributeContext.alpha = false;
        this._createNewContext2d();
    }
    /**
     * Describe your function
     * @return {boolean}
     */
    acceptDesync() {
        return this.__attributeContext.desynchronized;
    }
    /**
     * Describe your function
     * @return {void}
     */
    desync() {
        this.__attributeContext.desynchronized = true;
        this._createNewContext2d();
    }
    /**
     * Describe your function
     * @return {void}
     */
    noDesync() {
        this.__attributeContext.desynchronized = false;
        this._createNewContext2d();
    }
    /**
     * @return {CanvasRenderingContext2D}
     */
    get $context2d() {
        if (this._context2dCaching === null) {
            this._createNewContext2d();
        }
        return this._context2dCaching;
    }
    /**
     * @param {HTMLElement=document.body} parent
     * @return {void}
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
     * @param {LikeMyElement} element
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
        return this._ENV.angleMode === "degress" ? (value * Math.PI) / 180 : value;
    }
    _toDegress(value) {
        return this._ENV.angleMode === "radial" ? (value * 180) / Math.PI : value;
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
        this.$context2d.fillStyle = this._toRgb(params);
        this.$context2d.fill();
        this.$context2d.fillRect(0, 0, this.width, this.height);
    }
    /**
     * @param {CanvasImageSource} image
     * @return {void}
     */
    backgroundImage(image) {
        this.$context2d.drawImage(image, 0, 0, this.width, this.height);
    }
    /**
     * @param {ImageData|number} width
     * @param {number} height?
     * @return {ImageData}
     */
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
     * @param {noop} callback
     * @return {*}  {MyElement}
     * @memberof fCanvas
     */
    createElement(callback) {
        return new (class extends MyElement {
            constructor() {
                super(...arguments);
                this.draw = callback;
            }
        })();
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
    operation(value) {
        if (value === undefined) {
            return this.$context2d
                .globalCompositeOperation;
        }
        this.$context2d.globalCompositeOperation = value;
    }
    /**
     * @param {number} alpha?
     * @return {number | void}
     */
    alpha(alpha) {
        if (alpha === undefined) {
            return this.$context2d.globalAlpha;
        }
        this.$context2d.globalAlpha = alpha;
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
            cancelAnimationFrame(this.__idFrame);
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
    mouseIn(callback) {
        return bindEvent("mouseover", callback, this.$el);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseOut(callback) {
        return bindEvent("mouseout", callback, this.$el);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseDown(callback) {
        return bindEvent("mousedown", callback, this.$el);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    touchStart(callback) {
        return bindEvent("touchstart", callback, this.$el);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    touchMove(callback) {
        return bindEvent("touchmove", callback, this.$el);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    touchEnd(callback) {
        return bindEvent("touchend", callback, this.$el);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseMoved(callback) {
        return bindEvent("mousemove", callback, this.$el);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseUped(callback) {
        return bindEvent("mouseup", callback, this.$el);
    }
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseClicked(callback) {
        return bindEvent("click", callback, this.$el);
    }
}
fCanvas.Element = MyElement;
fCanvas.EAnimate = EAnimate;
fCanvas.RectElement = RectElement;
fCanvas.CircleElement = CircleElement;
fCanvas.Point3D = Point3D;
fCanvas.count = 0;
const noopFCanvas = new fCanvas();

export default fCanvas;
export { Animate, Camera, CircleImpact, CircleImpactPoint, CircleImpactRect, Emitter, RectImpact, RectImpactPoint, Stament, Store, Vector, cancelAnimationFrame, constrain, cutImage, hypot, isMobile, isTouch, lerp, loadAudio, loadImage, loadResourceImage, map, odd, off, passive, random, randomInt, range, requestAnimationFrame, windowSize };
