import Emitter from "./Emitter";

type TypeAnimate =
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
  type?: TypeAnimate;
  time: number;
  fps?: number;
}

declare function getValueInFrame(
  type: TypeAnimate,
  start: number,
  stop: number,
  frame: number,
  frames: number,
  power?: number
): number;
declare class Animate {
  static getFrames(time: number, fps?: number): number;
  static getValueInFrame: typeof getValueInFrame;
  _frame: number;
  type: string;
  xFrom: number;
  xTo: number;
  yFrom: number;
  yTo: number;
  zFrom: number;
  zTo: number;
  running: boolean;
  done: boolean;
  get x(): number;
  get y(): number;
  get z(): number;
  time: number;
  fps: number;
  get frames(): number;
  get frame(): number;
  set frame(value: number);
  constructor(config?: AnimateConfig);
  config({
    xFrom,
    xTo,
    yFrom,
    yTo,
    zFrom,
    zTo,
    type,
    time,
    fps,
  }: AnimateConfig): void;
  set(x?: number, y?: number, z?: number): void;
  move(x?: number, y?: number, z?: number): void;
  moveImmediate(x?: number, y?: number, z?: number): void;
  addFrame(): void;
  setType(type: number): void;
  setTime(time: number): void;
  $: typeof Emitter;
}
export default Animate;
