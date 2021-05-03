import { constrain } from "../methods/index.js";
import Emitter from "./Emitter.js";

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
      return (
        -1 * (distance / 2) * (currentProgress * (currentProgress - 2) - 1) +
        start
      );
    case "sine-ease-in-out":
      return (
        (-distance / 2) * (Math.cos((Math.PI * currentProgress) / steps) - 1) +
        start
      );
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
  static getFrames(time, fps = 1000 / 60) {
    //// time use miniseconds
    /// 1 frame = 100 / 6
    /// x frame = time
    return time / fps; /// time * 1 / fps
  }
  static getValueInFrame = getValueInFrame;

  $ = new Emitter();
  _frame = 1;
  type = "linear";

  xFrom = 0;
  xTo = 0;
  yFrom = 0;
  yTo = 0;
  zFrom = 0;
  zTo = 0;

  get x() {
    const frame = Math.min(this.frame, this.frames);
    return getValueInFrame(this.type, this.xFrom, this.xTo, frame, this.frames);
  }
  get y() {
    const frame = Math.min(this.frame, this.frames);
    return getValueInFrame(this.type, this.yFrom, this.yTo, frame, this.frames);
  }
  get z() {
    const frame = Math.min(this.frame, this.frames);
    return getValueInFrame(this.type, this.zFrom, this.zTo, frame, this.frames);
  }

  time = 0;

  fps = 1000 / 60;

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

  constructor(config) {
    this.config(config);
  }

  config({
    xFrom = 0,
    xTo = 0,
    yFrom = 0,
    yTo = 0,
    zFrom = 0,
    zTo = 0,
    type = "linear",
    time,
    fps = 1000 / 60,
  } = {}) {
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
    [this.xFrom, this.yFrom, this.zFrom] = [x, y, z];
  }
  move(x, y, z) {
    this.frame = 1;
    [this.xTo, this.yTo, this.zTo] = [x, y, z];
  }
  addFrame() {
    this.frame++;
  }
  setType(type) {
    this.type = type;
  }
  setTime(time) {
    this.time = time;
  }

  moveImmediate(x, y, z) {
    [this.xFrom, this.yFrom, this.zFrom] = [this.x, this.y, this.z];
    this.move(x, y, z);
  }
}

export default Animate;
export { getValueInFrame };
