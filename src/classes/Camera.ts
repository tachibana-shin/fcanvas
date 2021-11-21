import { Block } from "../core/Block";
import fCanvas from "../core/fCanvas";
import constrain from "../functions/constrain";
import type Noop from "../types/Noop";
import type ReadonlyOffset from "../types/ReadonlyOffset";
import type ReadonlySize from "../types/ReadonlySize";

type ViewPort = ReadonlyOffset & ReadonlySize;
type Range = {
  readonly min: number;
  readonly max: number;
  readonly default: number;
  // eslint-disable-next-line functional/prefer-readonly-type
  current: number;
  readonly dynamic: boolean;
};

class Cursor {
  readonly #camera: Camera;
  readonly #config: ReadonlyOffset<Range>;

  public get x(): number {
    return this.#config.x.current;
  }
  public get y(): number {
    return this.#config.y.current;
  }

  constructor(camera: Camera, config: ReadonlyOffset<Range>) {
    this.#camera = camera;

    this.#config = config;

    const watch = (prop: keyof ReadonlyOffset<Range>) => {
      this.#camera.$watch(prop, (newValue, oldValue) => {
        const dist = newValue - oldValue;
        // min = this._config.x.min;

        if (this.#config[prop].dynamic) {
          if (
            dist < 0
              ? this[prop] > this.#config[prop].min
              : this[prop] < this.#config[prop].max
          ) {
            this.#config[prop].current += dist;
            return false;
          }
        } else {
          if (
            (prop === "x"
              ? this.#camera.isLimitX()
              : this.#camera.isLimitY()) === (dist < 0 ? -1 : 1)
          ) {
            if (this[prop] > this.#config[prop].min) {
              this.#config[prop].current += dist;
            }
          }
        }
      });
    };

    watch("x");
    watch("y");
  }
}

export class Camera {
  static readonly Cursor: typeof Cursor = Cursor;
  readonly #canvas: fCanvas;
  readonly #viewport: ViewPort;
  readonly #offset: {
    // eslint-disable-next-line functional/prefer-readonly-type
    x: number;
    // eslint-disable-next-line functional/prefer-readonly-type
    y: number;
  } = Object.create({
    x: 0,
    y: 0,
  });
  readonly #watchers: {
    // eslint-disable-next-line @typescript-eslint/ban-types, functional/prefer-readonly-type
    readonly [propName: string]: Function[];
  } = Object.create(null);

  public get x(): number {
    return this.#offset.x;
  }
  public set x(value: number) {
    const old = this.#offset.x;
    // eslint-disable-next-line functional/no-let
    let allowChange = true;
    this.#watchers.x?.forEach((callback) => {
      if (callback(value, old) === false) {
        allowChange = false;
      }
    });

    if (allowChange) {
      // eslint-disable-next-line functional/immutable-data
      this.#offset.x = value;
    }
  }
  public get y(): number {
    return this.#offset.y;
  }
  public set y(value: number) {
    const old = this.#offset.y;
    // eslint-disable-next-line functional/no-let
    let allowChange = true;
    this.#watchers.y?.forEach((callback) => {
      if (callback(value, old) === false) {
        allowChange = false;
      }
    });

    if (allowChange) {
      // eslint-disable-next-line functional/immutable-data
      this.#offset.y = value;
    }
  }
  public $watch(
    name: string,
    callback: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newValue: any, oldValue: any): void;
    }
  ): Noop {
    if (name in this.#watchers === false) {
      // eslint-disable-next-line functional/immutable-data
      this.#watchers[name].splice(0);
    }

    // eslint-disable-next-line functional/immutable-data
    this.#watchers[name].push(callback);

    return () => {
      const index = this.#watchers[name]?.findIndex(
        (item) => item === callback
      );

      if (index && index !== -1) {
        // eslint-disable-next-line functional/immutable-data
        this.#watchers[name].splice(index, 1);
      }
    };
  }

  constructor(
    canvas: fCanvas,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.#canvas = canvas;

    this.#viewport = {
      x,
      y,
      width,
      height,
    };
  }

  public getXOffset(value: number, diffSpeed = 1): number {
    return (
      value -
      constrain(
        this.x * diffSpeed,
        this.#viewport.x,
        this.#viewport.width - this.#canvas.width
      )
    );
  }
  public getYOffset(value: number, diffSpeed = 1): number {
    return (
      value -
      constrain(
        this.y * diffSpeed,
        this.#viewport.y,
        this.#viewport.height - this.#canvas.height
      )
    );
  }
  public isLimitX(): -1 | 0 | 1 {
    if (this.x < this.#viewport.x) {
      return -1;
    }

    if (this.x > this.#viewport.width - this.#canvas.width) {
      return 1;
    }

    return 0;
  }
  public isLimitY(): -1 | 0 | 1 {
    if (this.y < this.#viewport.y) {
      return -1;
    }

    if (this.y > this.#viewport.height - this.#canvas.height) {
      return 1;
    }

    return 0;
  }

  public isXInViewBox(element: Block, diffSpeed: number): boolean;
  public isXInViewBox(value: number, width: number, diffSpeed: number): boolean;
  public isXInViewBox(
    value: number | Block,
    width = 0,
    diffSpeed = 1
  ): boolean {
    if (value instanceof Block) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      width = (value as any).width || 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value = ((value as any).x as number) || 0;
    }

    value = this.getXOffset(value, diffSpeed);

    return value + width > 0 || value < this.#canvas.width;
  }
  public isYInViewBox(element: Block, diffSpeed: number): boolean;
  public isYInViewBox(
    value: number,
    height: number,
    diffSpeed: number
  ): boolean;
  public isYInViewBox(
    value: number | Block,
    height = 0,
    diffSpeed = 1
  ): boolean {
    if (value instanceof Block) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      height = (value as any).height || 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value = ((value as any).y as number) || 0;
    }

    value = this.getYOffset(value, diffSpeed);

    return value + height > 0 || value < this.#canvas.height;
  }

  public isInViewBox(
    element: Block,
    diffSpeedX: number,
    diffSpeedY: number
  ): boolean;
  public isInViewBox(
    x: number,
    y: number,
    width: number,
    height: number,
    diffSpeedX: number,
    diffSpeedY: number
  ): boolean;
  public isInViewBox(
    x: Block | number,
    y: number,
    width = 0,
    height = 0,
    diffSpeedX = 1,
    diffSpeedY = 1
  ): boolean {
    if (x instanceof Block) {
      return (
        this.isXInViewBox(x, diffSpeedX) && this.isYInViewBox(x, diffSpeedY)
      );
    }

    return (
      this.isXInViewBox(x, width, diffSpeedX) &&
      this.isYInViewBox(y, height, diffSpeedY)
    );
  }
}

export function createCamera(
  canvas: fCanvas,
  x: number,
  y: number,
  width: number,
  height: number
): Camera {
  return new Camera(canvas, x, y, width, height);
}
