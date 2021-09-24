import mitt from "mitt";

export type AnimateType =
  | "ease"
  | "quadratic"
  | "sine-ease-in-out"
  | "quintic-ease"
  | "exp-ease-in-out"
  | "linear";

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
  power = 3
): number {
  const distance: number = stop - start;

  return getAnimate(type, frame, start, distance, frames, power);
}
function timeToFrames(time: number, fps: number = 1000 / 60): number {
  return time / fps;
}

export function createAnimate<
  State extends
    | readonly number[]
    | {
        readonly [propName: string]: number;
      }
>(
  state: State,
  duration?: number,
  easing?: AnimateType
): AnimateClass<State> & State {
  return new AnimateClass(state, duration, easing) as AnimateClass<State> &
    State;
}
class AnimateClass<
  State extends
    | readonly number[]
    | {
        readonly [propName: string]: number;
      }
> {
  private readonly fps = 1000 / 60;
  // eslint-disable-next-line functional/prefer-readonly-type
  private readonly queue: {
    readonly state: Partial<State>;
    readonly duration?: number;
    readonly easing?: AnimateType;
  }[] = [];
  // eslint-disable-next-line functional/prefer-readonly-type
  time: number;
  // eslint-disable-next-line functional/prefer-readonly-type
  easing: AnimateType;
  get frames(): number {
    return Math.max(timeToFrames(this.time, this.fps), 1);
  }
  // eslint-disable-next-line functional/prefer-readonly-type
  private __frame = 1;
  public get frame(): number {
    return Math.min(this.__frame, this.frames);
  }
  public set frame(value: number) {
    this.__frame = Math.min(value, this.frames);

    if (this.frame === this.frames) {
      this.emitter.emit("done");

      if (this.queue.length > 0) {
        this._to(
          this.queue[0].state,
          this.queue[0].duration,
          this.queue[0].easing
        );
        // eslint-disable-next-line functional/immutable-data
        this.queue.splice(0, 1);
      }
    }
  }
  private readonly store: Record<
    keyof State,
    {
      // eslint-disable-next-line functional/prefer-readonly-type
      start: number;
      // eslint-disable-next-line functional/prefer-readonly-type
      to: number;
    }
  >;
  private readonly emitter = mitt<{
    readonly cancel: keyof State;
    readonly done: void;
  }>();

  constructor(state: State, duration = 0, easing: AnimateType = "ease") {
    const store: typeof this.store = {} as typeof this.store;
    // eslint-disable-next-line functional/no-loop-statement
    for (const prop in state) {
      store[prop as keyof State] = {
        start: state[prop] as unknown as number,
        to: state[prop] as unknown as number,
      };

      Object.defineProperty(this, prop, {
        get: (): number => {
          return this.get(prop);
        },
      });
    }
    this.store = store;
    this.time = duration;
    this.easing = easing;
  }
  increment(): void {
    // eslint-disable-next-line functional/immutable-data
    this.frame++;
  }
  get(prop: keyof State): number {
    return getValueInFrame(
      this.easing,
      this.store[prop].start,
      this.store[prop].to,
      this.frame,
      this.frames
    );
  }
  cancel(prop?: keyof State): void {
    if (prop) {
      // eslint-disable-next-line functional/immutable-data
      this.store[prop].start = this.get(prop);
      this.emitter.emit("cancel", prop);
    } else {
      // eslint-disable-next-line functional/no-loop-statement
      for (const prop in this.store) {
        this.cancel(prop);
      }
    }
  }
  private _to(state: Partial<State>, duration?: number, easing?: AnimateType): void {
    // eslint-disable-next-line functional/no-loop-statement
    for (const prop in state) {
      this.cancel(prop);
      // eslint-disable-next-line functional/immutable-data
      this.store[prop].to = state[prop] as unknown as number;
    }

    this.frame = 0;
    this.time = duration ?? this.time;
    this.easing = easing ?? this.easing;
  }
  to(state: Partial<State>, duration?: number, easing?: AnimateType): void {
    this._to(state, duration, easing);

    // eslint-disable-next-line functional/immutable-data
    this.queue.splice(0);
  }
  get running(): boolean {
    return this.frame < this.frames;
  }
  add(state: Partial<State>, duration?: number, easing?: AnimateType): void {
    // eslint-disable-next-line functional/immutable-data
    this.queue.push({ state, duration, easing });
  }
}
