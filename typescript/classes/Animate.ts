import { constrain } from "../methods/index";
import Emitter from "./Emitter";

export type AnimateType =
  | "ease"
  | "quadratic"
  | "sine-ease-in-out"
  | "quintic-ease"
  | "exp-ease-in-out"
  | "linear";

export interface AnimateConfig {
  xFrom?: number;
  xTo?: number;
  yFrom?: number;
  yTo?: number;
  zFrom?: number;
  zTo?: number;
  type?: AnimateType;
  time: number;
  fps?: number;
}

function getAnimate(
  type: AnimateType,
  currentProgress: number,
  start: number,
  distance: number,
  steps: number,
  power: number
): number {
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

function getValueInFrame(
  type: AnimateType,
  start: number,
  stop: number,
  frame: number,
  frames: number,
  power: number = 3
): number {
  const distance: number = stop - start;

  return getAnimate(type, frame, start, distance, frames, power);
}

class Animate {
  static getFrames(time: number, fps: number = 1000 / 60): number {
    return time / fps; /// time * 1 / fps
  }
  static getValueInFrame = getValueInFrame;

  public $: Emitter = new Emitter();
  private _frame: number = 1;
  private type: AnimateType = "linear";
  private time = 0;
  private fps = 1000 / 60;

  public xFrom: number = 0;
  public xTo: number = 0;
  public yFrom: number = 0;
  public yTo: number = 0;
  public zFrom: number = 0;
  public zTo: number = 0;

  get x(): number {
    return getValueInFrame(
      this.type,
      this.xFrom,
      this.xTo,
      this.frame,
      this.frames
    );
  }
  get y(): number {
    return getValueInFrame(
      this.type,
      this.yFrom,
      this.yTo,
      this.frame,
      this.frames
    );
  }
  get z(): number {
    return getValueInFrame(
      this.type,
      this.zFrom,
      this.zTo,
      this.frame,
      this.frames
    );
  }

  get frames(): number {
    return Animate.getFrames(this.time, this.fps);
  }
  get frame(): number {
    return this._frame;
  }
  set frame(value: number) {
    this._frame = constrain(value, 0, this.frames);
    if (this._frame === this.frames) {
      this.$.emit("done");
    }
  }
  get running(): boolean {
    return this.frame < this.frames;
  }
  get done(): boolean {
    return this.frame === this.frames;
  }

  constructor(config: AnimateConfig = { time: 0 }) {
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
  }: AnimateConfig): void {
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
  set(x?: number, y?: number, z?: number): void {
    [this.xFrom, this.yFrom, this.zFrom] = [x || 0, y || 0, z || 0];
  }
  move(x?: number, y?: number, z?: number): void {
    this.frame = 1;
    [this.xTo, this.yTo, this.zTo] = [x || 0, y || 0, z || 0];
  }
  moveAsync(x?: number, y?: number, z?: number): Promise<void> {
    this.move(x, y, z);
    return new Promise((resolve): void => {
      this.$.once("done", () => resolve());
    });
  }
  addFrame(): void {
    this.frame++;
  }
  setType(type: AnimateType): void {
    this.type = type;
  }
  getType(): AnimateType {
    return this.type;
  }
  setTime(time: number): void {
    this.time = time;
  }
  getTime(): number {
    return this.time;
  }

  moveImmediate(x?: number, y?: number, z?: number): void {
    [this.xFrom, this.yFrom, this.zFrom] = [this.x, this.y, this.z];
    this.move(x, y, z);
  }
}

export default Animate;
export { getValueInFrame };
