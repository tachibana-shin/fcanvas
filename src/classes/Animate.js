import { constrain } from "../methods/index";
import Emitter from "./Emitter";
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
function getValueInFrame(type, start, stop, frame, frames, power = 3) {
    const distance = stop - start;
    return getAnimate(type, frame, start, distance, frames, power);
}
class Animate {
    constructor(config = { time: 0 }) {
        this.$ = new Emitter();
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
    static getFrames(time, fps = 1000 / 60) {
        return time / fps; /// time * 1 / fps
    }
    get x() {
        return getValueInFrame(this.type, this.xFrom, this.xTo, this.frame, this.frames);
    }
    get y() {
        return getValueInFrame(this.type, this.yFrom, this.yTo, this.frame, this.frames);
    }
    get z() {
        return getValueInFrame(this.type, this.zFrom, this.zTo, this.frame, this.frames);
    }
    get frames() {
        return Animate.getFrames(this.time, this.fps);
    }
    get frame() {
        return this._frame;
    }
    set frame(value) {
        this._frame = constrain(value, 0, this.frames);
        if (this._frame === this.frames) {
            this.$.emit("done");
        }
    }
    get running() {
        return this.frame < this.frames;
    }
    get done() {
        return this.frame === this.frames;
    }
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
    set(x, y, z) {
        [this.xFrom, this.yFrom, this.zFrom] = [x || 0, y || 0, z || 0];
    }
    move(x, y, z) {
        this.frame = 1;
        [this.xTo, this.yTo, this.zTo] = [x || 0, y || 0, z || 0];
    }
    moveAsync(x, y, z) {
        this.move(x, y, z);
        return new Promise((resolve) => {
            this.$.once("done", () => resolve());
        });
    }
    addFrame() {
        this.frame++;
    }
    setType(type) {
        this.type = type;
    }
    getType() {
        return this.type;
    }
    setTime(time) {
        this.time = time;
    }
    getTime() {
        return this.time;
    }
    moveImmediate(x, y, z) {
        [this.xFrom, this.yFrom, this.zFrom] = [this.x, this.y, this.z];
        this.move(x, y, z);
    }
}
Animate.getValueInFrame = getValueInFrame;
export default Animate;
export { getValueInFrame };
