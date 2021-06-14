export type AnimateType =
  | "ease"
  | "quadratic"
  | "sine-ease-in-out"
  | "quintic-ease"
  | "exp-ease-in-out"
  | "linear";
type StoreData =
  | number[]
  | {
      [propName: string]: number;
    };
interface Observe {
  [propName: string]: [number, number];
}
interface InputStore {
  [propName: string]: number | Observe | void;
  __observe?: Observe;
}
interface StoreObserve {
  [propName: string]: number | Observe;
  __observe: Observe;
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
/**
 * @param {AnimateType} type
 * @param {number} start
 * @param {number} stop
 * @param {number} frame
 * @param {number} frames
 * @param {number=3} power
 * @return {number}
 */

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
function timeToFrames(time: number, fps: number = 1000 / 60): number {
  return time / fps;
}
function toObject(obj: number[] | any): InputStore {
  if (Array.isArray(obj)) {
    let tmp: {
      [propName: string]: number;
    } = Object.create(null);

    obj.forEach((value, index) => {
      tmp[`${index}`] = value as number;
    });

    obj = tmp;
  }

  return obj;
}

function reactive(obj: InputStore, $this: Animate): StoreObserve {
  delete obj.__observe;

  obj = toObject(obj);
  const store: Observe = {};

  for (const key in obj) {
    store[key] = [obj[key] as number, obj[key] as number];
    Object.defineProperty(obj, key, {
      get(): number {
        return getValueInFrame(
          $this.easing,
          store[key][0],
          store[key][1],
          $this.frame,
          $this.frames
        );
      },
      set(value: number) {
        store[key][1] = value;
      },
    });
  }

  Object.defineProperty(obj, "__observe", {
    writable: true,
    enumerable: false,
    configurable: true,
    value: store,
  });

  return obj as StoreObserve;
}

function splitNumberString(
  params: Array<number | string | void>
): [string | void, number | void] {
  const indexString = params.findIndex((item) => typeof item === "string");

  if (indexString > -1) {
    return [params[indexString] as string, +params[indexString === 0 ? 1 : 0]];
  } else {
    return [params[1] as string, +params[0]];
  }
}

function converParams(
  ...params: number[]
): [InputStore, number | void, AnimateType | void];
function converParams(
  params: InputStore,
  easing?: AnimateType,
  duration?: number
): [InputStore, number | void, AnimateType | void];
function converParams(
  params: InputStore,
  duration?: number,
  easing?: AnimateType
): [InputStore, number | void, AnimateType | void];
function converParams(
  ...params: any[]
): [InputStore, number | void, AnimateType | void] {
  let data: InputStore, time: number | void, easing: AnimateType | void;
  if (
    "length" in params[0] ||
    (params[0] !== null && typeof params[0] === "object")
  ) {
    /// install to params[0] | time = params[1] | easing = params[2]
    data = params[0];
    [easing, time] = splitNumberString(params.slice(1)) as [
      AnimateType,
      number
    ];
  } else {
    /// install to params | time  = 0 | easing = linear
    data = toObject(params);
  }

  return [data, time, easing];
}

export default class Animate {
  private __data: StoreObserve = {
    __observe: {},
  };
  // private get data(): StoreObserve {
  //   return this.__data;
  // }
  private set data(data: InputStore) {
    this.__data = reactive(data, this);
    for (const key in this.__data) {
      Object.defineProperty(this, key, {
        get(): number {
          return this.__data[key];
        },
      });
    }
  }
  /**
   * @param {string} key
   * @return {*}  {(number | void)}
   * @memberof Animate
   */
  public get(key: string): number | void {
    return this.__data[key] as number | void;
  }
  private __fps: number = 1000 / 60;
  private __eventsStore: {
    [propName: string]: Function[];
  } = Object.create(null);
  private __queue: Array<[InputStore, number | void, AnimateType | void]> = [];

  public time: number = 0;
  public easing: AnimateType = "ease";

  public get frames(): number {
    return Math.max(timeToFrames(this.time, this.__fps), 1);
  }
  private __frame: number = 1;
  public get frame(): number {
    return Math.min(this.__frame, this.frames);
  }
  public set frame(value: number) {
    this.__frame = Math.min(value, this.frames);

    if (this.frame === this.frames) {
      this.emit("done");

      if (this.__queue.length > 0) {
        this._to(...(this.__queue[0] as [StoreData, number, AnimateType]));
        this.__queue.splice(0, 1);
      }
    }
  }

  constructor(...params: number[]);
  constructor(params: StoreData, easing?: AnimateType, duration?: number);
  constructor(params: StoreData, duration?: number, easing?: AnimateType);
  constructor(...params: any[]) {
    const [data, time, easing] = converParams(...params);

    this.data = data ?? this.data;
    this.time = Number.isNaN(time) ? this.time : (time as number) ?? this.time;
    this.easing = (easing as AnimateType) ?? this.easing;
  }
  public on(name: string, callback: Function): void {
    if (name in this.__eventsStore) {
      this.__eventsStore[name].push(callback);
    } else {
      this.__eventsStore[name] = [callback];
    }
  }
  public off(name: string, callback?: Function): void {
    if (callback) {
      this.__eventsStore[name] = this.__eventsStore[name]?.filter(
        (item) => item !== callback
      );

      if (this.__eventsStore[name]?.length === 0) {
        delete this.__eventsStore[name];
      }
    } else {
      delete this.__eventsStore[name];
    }
  }
  public emit(name: string, ...params: any[]): void {
    this.__eventsStore[name]?.forEach((callback) => {
      callback.call(this, ...params);
    });
  }
  public once(name: string, callback: Function): void {
    const callbackVirual = (...params: any[]): void => {
      callback.call(this, ...params);
      this.off(name, callbackVirual);
    };

    this.on(name, callbackVirual);
  }

  public setFPS(value: number): void {
    this.__fps = value;
  }
  public action(): void {
    this.frame++;
  }
  public cancel(key?: string): void {
    if (key) {
      if (key in this.__data && key in this.__data.__observe) {
        this.__data.__observe[key][0] = this.__data[key] as number;
        this.emit("cancel", key);
      }
    } else {
      for (const key in this.__data) {
        this.cancel(key);
      }
    }
  }
  private _to(...params: number[]): void;
  private _to(params: StoreData, easing?: AnimateType, duration?: number): void;
  private _to(params: StoreData, duration?: number, easing?: AnimateType): void;
  private _to(...params: any[]): void {
    const [data, time, easing] = converParams(...params);

    for (const key in data) {
      if (key in this.__data && key in this.__data.__observe) {
        this.cancel(key);
        this.__data.__observe[key][1] = +data[key];
        // this.__data.__observe[key][1] = +data[key] as number;
      } else {
        console.error(`fCanvas<animate.ts>: "${key}" is not signed.`);
      }
    }

    this.frame = 0;
    this.time = Number.isNaN(time) ? this.time : (time as number) ?? this.time;
    this.easing = (easing as AnimateType) ?? this.easing;
  }
  public to(...params: number[]): void;
  public to(params: StoreData, easing?: AnimateType, duration?: number): void;
  public to(params: StoreData, duration?: number, easing?: AnimateType): void;
  public to(...params: any[]): void {
    this._to(...params);
    this.__queue.splice(0);
  }
  public get running(): boolean {
    return this.frame < this.frames;
  }
  public add(...params: number[]): void;
  public add(params: StoreData, easing?: AnimateType, duration?: number): void;
  public add(params: StoreData, duration?: number, easing?: AnimateType): void;
  public add(...params: any[]): void {
    this.__queue.push(converParams(...params));
  }
  public set(...params: number[]): void;
  public set(params: StoreData): void;
  public set(...params: any[]): void {
    this.data = converParams(...params)[0];
  }
}
