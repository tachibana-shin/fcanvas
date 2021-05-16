import { extractNumber } from "../utils/index";
/**
 * @param {Circle} circle1
 * @param {Circle} circle2
 * @return {boolean}
 */
export function CircleImpact(circle1, circle2) {
    return ((circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2 <
        (circle1.radius + circle2.radius) ** 2);
}
/**
 * @param {Circle} circle
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
export function CircleImpactPoint(circle, x, y) {
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
export function CircleImpactRect(circle, rect) {
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
export function constrain(value, min, max) {
    return Math.min(Math.max(min, value), max);
}
/**
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */
export function loadImage(src) {
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
 * @param {number} value
 * @param {number} start
 * @param {number} stop
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function map(value, start, stop, min, max) {
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
export { random, range };
/**
 * @param {Rect} rect1
 * @param {Rect} rect2
 * @return {boolean}
 */
export function RectImpact(rect1, rect2) {
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
export function RectImpactPoint(rect, x, y) {
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
export function lerp(start, stop, amt) {
    return amt * (stop - start) + start;
}
/**
 * @param {number[]} ...args
 * @return {number}
 */
export const hypot = typeof Math.hypot === "function"
    ? Math.hypot
    : (...args) => {
        const len = args.length;
        let i = 0, result = 0;
        while (i < len)
            result += Math.pow(args[i++], 2);
        return Math.sqrt(result);
    };
/**
 * @param {number|ArrayLike<any>|Object} start
 * @param {number|CallbackForeachObject} stop
 * @param {number|CallbackForeachObject|CallbackForeachNumber} step?
 * @param {CallbackForeachNumber|CallbackForeachObject=(} callback
 * @return {=>}
 */
function foreach(start, stop, step, callback = () => { }) {
    if (typeof start === "number") {
        if (typeof step === "function") {
            callback = step;
            step = 1;
        }
        step = step || 1;
        for (let index = start; index <= stop; index += step) {
            if (callback(index, start, stop, step) === true) {
                break;
            }
        }
    }
    else {
        if (typeof stop === "function") {
            callback = stop;
        }
        if (typeof step === "function") {
            callback = step;
        }
        if ("length" in start) {
            const { length } = start;
            let index = 0;
            if (typeof stop !== "number") {
                stop = length;
            }
            if (stop < 0) {
                stop += length;
            }
            while (index < length) {
                // @ts-expect-error
                if (callback.call(object, object[index], index, object) === true) {
                    break;
                }
                if (index > stop) {
                    break;
                }
                index++;
            }
        }
        else {
            for (const index in start) {
                if (callback.call(start, start[index], index, start) === true) {
                    break;
                }
            }
        }
    }
}
export { foreach };
/**
 * @param {number} value
 * @param {number} max
 * @param {number} prevent
 * @return {number}
 */
export function odd(value, max, prevent) {
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
export function off(value, min, prevent) {
    if (value === min) {
        return prevent;
    }
    return value - 1;
}
let virualContext;
export function cutImage(image, x = 0, y = 0, width = extractNumber(`${image.width}`), height = extractNumber(`${image.height}`)) {
    if (virualContext === undefined) {
        virualContext = document
            .createElement("canvas")
            .getContext("2d"); /// never null
    }
    [virualContext.canvas.width, virualContext.canvas.height] = [width, height];
    virualContext.drawImage(image, x, y, width, height, 0, 0, width, height);
    // const imageCuted: CanvasImageSource = virualContext.getImageData(
    //   0,
    //   0,
    //   width,
    //   height
    // );
    const imageCuted = new Image();
    imageCuted.src = virualContext.canvas.toDataURL();
    virualContext.clearRect(0, 0, width, height);
    return imageCuted;
}
