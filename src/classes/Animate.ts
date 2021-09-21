export type AnimateType =
  | "ease"
  | "quadratic"
  | "sine-ease-in-out"
  | "quintic-ease"
  | "exp-ease-in-out"
  | "linear";
type StoreData =
  | readonly number[]
  | {
      readonly [propName: string]: number;
    };
type Observe = {
  // eslint-disable-next-line functional/prefer-readonly-type
  [propName: string]: [number, number];
};
// eslint-disable-next-line functional/no-mixed-type
type InputStore = {
  readonly [propName: string]: number | Observe | void;
  // eslint-disable-next-line functional/prefer-readonly-type
  __observe?: Observe;
};
// eslint-disable-next-line functional/no-mixed-type
type StoreObserve = {
  readonly [propName: string]: number | Observe;
  // eslint-disable-next-line functional/prefer-readonly-type
  __observe: Observe;
};

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toObject(obj: readonly number[] | any): InputStore {
  if (Array.isArray(obj)) {
    const tmp: {
      // eslint-disable-next-line functional/prefer-readonly-type
      [propName: string]: number;
    } = Object.create(null);

    obj.forEach((value, index) => {
      // eslint-disable-next-line functional/immutable-data
      tmp[`${index}`] = value as number;
    });

    obj = tmp;
  }

  return obj;
}

function reactive(obj: InputStore, $this: Animate): StoreObserve {
  // eslint-disable-next-line functional/immutable-data
  delete obj.__observe;

  obj = toObject(obj);
  const store: Observe = {};

  // eslint-disable-next-line functional/no-loop-statement
  for (const key in obj) {
    // eslint-disable-next-line functional/immutable-data
    store[key] = [obj[key] as number, obj[key] as number];
    // eslint-disable-next-line functional/immutable-data
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
        if (store[key]) {
          // eslint-disable-next-line functional/immutable-data
          store[key][1] = value;
        }
      },
    });
  }

  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(obj, "__observe", {
    writable: true,
    enumerable: false,
    configurable: true,
    value: store,
  });

  return obj as StoreObserve;
}

function splitNumberString(
  params: ReadonlyArray<number | string | void>
): readonly [string | void, number | void] {
  const indexString = params.findIndex((item) => typeof item === "string");

  if (indexString > -1) {
    return [params[indexString] as string, +params[indexString === 0 ? 1 : 0]];
  } else {
    return [params[1] as string, +params[0]];
  }
}

function convertParams(
  ...params: readonly number[]
): readonly [InputStore, number | void, AnimateType | void];
function convertParams(
  params: InputStore,
  easing?: AnimateType,
  duration?: number
): readonly [InputStore, number | void, AnimateType | void];
function convertParams(
  params: InputStore,
  duration?: number,
  easing?: AnimateType
): readonly [InputStore, number | void, AnimateType | void];
function convertParams(
  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  ...params: readonly any[]
): readonly [InputStore, number | void, AnimateType | void] {
  // eslint-disable-next-line functional/no-let
  let data: InputStore, time: number | void, easing: AnimateType | void;
  if (
    "length" in params[0] ||
    (params[0] !== null && typeof params[0] === "object")
  ) {
    /// install to params[0] | time = params[1] | easing = params[2]
    data = params[0];
    [easing, time] = splitNumberString(params.slice(1)) as readonly [
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
  // eslint-disable-next-line functional/prefer-readonly-type
  private __data: StoreObserve = {
    __observe: {},
  };
  // private get data(): StoreObserve {
  //   return this.__data;
  // }
  private set data(data: InputStore) {
    this.__data = reactive(data, this);
    // eslint-disable-next-line functional/no-loop-statement
    for (const key in this.__data) {
      Object.defineProperty(this, key, {
        get(): number {
          return this.__data[key];
        },
      });
    }
  }
  public get(key: string): number | void {
    return this.__data[key] as number | void;
  }
  // eslint-disable-next-line functional/prefer-readonly-type
  private __fps: number = 1000 / 60;
  private readonly __eventsStore: {
    // eslint-disable-next-line @typescript-eslint/ban-types, functional/prefer-readonly-type
     [propName: string]: Function[];
  } = Object.create(null);
  // eslint-disable-next-line functional/prefer-readonly-type
  private readonly __queue: Array<
    readonly [InputStore, number | void, AnimateType | void]
  > = [];

  // eslint-disable-next-line functional/prefer-readonly-type
  public time = 0;
  // eslint-disable-next-line functional/prefer-readonly-type
  public easing: AnimateType = "ease";

  public get frames(): number {
    return Math.max(timeToFrames(this.time, this.__fps), 1);
  }
  // eslint-disable-next-line functional/prefer-readonly-type
  private __frame = 1;
  public get frame(): number {
    return Math.min(this.__frame, this.frames);
  }
  public set frame(value: number) {
    this.__frame = Math.min(value, this.frames);

    if (this.frame === this.frames) {
      this.emit("done");

      if (this.__queue.length > 0) {
        this._to(
          ...(this.__queue[0] as readonly [StoreData, number, AnimateType])
        );
        // eslint-disable-next-line functional/immutable-data
        this.__queue.splice(0, 1);
      }
    }
  }

  constructor(...params: readonly number[]);
  constructor(params: StoreData, easing?: AnimateType, duration?: number);
  constructor(params: StoreData, duration?: number, easing?: AnimateType);
  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  constructor(...params: readonly any[]) {
    const [data, time, easing] = convertParams(...params);

    this.data = data ?? this.data;
    this.time = Number.isNaN(time) ? this.time : (time as number) ?? this.time;
    this.easing = (easing as AnimateType) ?? this.easing;
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  public on(name: string, callback: Function): void {
    if (name in this.__eventsStore) {
      // eslint-disable-next-line functional/immutable-data
      this.__eventsStore[name].push(callback);
    } else {
      // eslint-disable-next-line functional/immutable-data
      this.__eventsStore[name] = [callback];
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  public off(name: string, callback?: Function): void {
    if (callback) {
      // eslint-disable-next-line functional/immutable-data
      this.__eventsStore[name] = this.__eventsStore[name]?.filter(
        (item) => item !== callback
      );

      if (this.__eventsStore[name]?.length === 0) {
        // eslint-disable-next-line functional/immutable-data
        delete this.__eventsStore[name];
      }
    } else {
      // eslint-disable-next-line functional/immutable-data
      delete this.__eventsStore[name];
    }
  }
  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  public emit(name: string, ...params: readonly any[]): void {
    this.__eventsStore[name]?.forEach((callback) => {
      callback.call(this, ...params);
    });
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  public once(name: string, callback: Function): void {
    // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
    const callbackVirual = (...params: readonly any[]): void => {
      callback.call(this, ...params);
      this.off(name, callbackVirual);
    };

    this.on(name, callbackVirual);
  }

  public setFPS(value: number): void {
    this.__fps = value;
  }
  public action(): void {
    // eslint-disable-next-line functional/immutable-data
    this.frame++;
  }
  public cancel(key?: string): void {
    if (key) {
      if (key in this.__data && key in this.__data.__observe) {
        // eslint-disable-next-line functional/immutable-data
        this.__data.__observe[key][0] = this.__data[key] as number;
        this.emit("cancel", key);
      }
    } else {
      // eslint-disable-next-line functional/no-loop-statement
      for (const key in this.__data) {
        this.cancel(key);
      }
    }
  }
  private _to(...params: readonly number[]): void;
  private _to(params: StoreData, easing?: AnimateType, duration?: number): void;
  private _to(params: StoreData, duration?: number, easing?: AnimateType): void;
  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  private _to(...params: readonly any[]): void {
    const [data, time, easing] = convertParams(...params);

    // eslint-disable-next-line functional/no-loop-statement
    for (const key in data) {
      if (key in this.__data && key in this.__data.__observe) {
        this.cancel(key);
        // eslint-disable-next-line functional/immutable-data
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
  public to(...params: readonly number[]): void;
  public to(params: StoreData, easing?: AnimateType, duration?: number): void;
  public to(params: StoreData, duration?: number, easing?: AnimateType): void;
  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  public to(...params: readonly any[]): void {
    this._to(...params);
    // eslint-disable-next-line functional/immutable-data
    this.__queue.splice(0);
  }
  public get running(): boolean {
    return this.frame < this.frames;
  }
  public add(...params: readonly number[]): void;
  public add(params: StoreData, easing?: AnimateType, duration?: number): void;
  public add(params: StoreData, duration?: number, easing?: AnimateType): void;
  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  public add(...params: readonly any[]): void {
    // eslint-disable-next-line functional/immutable-data
    this.__queue.push(convertParams(...params));
  }
  public set(...params: readonly number[]): void;
  public set(params: StoreData): void;
  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  public set(...params: readonly any[]): void {
    this.data = convertParams(...params)[0];
  }
}
