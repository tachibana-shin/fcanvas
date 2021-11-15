import { CanvasElement } from "../core/CanvasElement";
import fCanvas from "../core/fCanvas";
import constrain from "../functions/constrain";
import type { noop, ReadonlySize } from "../types/index";
import type { ReadonlyOffset } from "../utils/getTouchInfo";
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
  private readonly _camera: Camera;
  private readonly _config: ReadonlyOffset<Range>;

  public get x(): number {
    return this._config.x.current;
  }
  public get y(): number {
    return this._config.y.current;
  }

  constructor(camera: Camera, config: ReadonlyOffset<Range>) {
    this._camera = camera;

    this._config = config;

    const watch = (prop: keyof ReadonlyOffset<Range>) => {
      this._camera.$watch(prop, (newValue, oldValue) => {
        const dist = newValue - oldValue;
        // min = this._config.x.min;

        if (this._config[prop].dynamic) {
          if (
            dist < 0
              ? this[prop] > this._config[prop].min
              : this[prop] < this._config[prop].max
          ) {
            this._config[prop].current += dist;
            return false;
          }
        } else {
          if (
            (prop === "x"
              ? this._camera.isLimitX()
              : this._camera.isLimitY()) === (dist < 0 ? -1 : 1)
          ) {
            if (this[prop] > this._config[prop].min) {
              this._config[prop].current += dist;
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
  private readonly _canvas: fCanvas;
  private readonly _viewport: ViewPort;
  private readonly _offset: {
    // eslint-disable-next-line functional/prefer-readonly-type
    x: number;
    // eslint-disable-next-line functional/prefer-readonly-type
    y: number;
  } = Object.create({
    x: 0,
    y: 0,
  });
  private readonly _watchers: {
    // eslint-disable-next-line @typescript-eslint/ban-types, functional/prefer-readonly-type
    readonly [propName: string]: Function[];
  } = Object.create(null);

  public get x(): number {
    return this._offset.x;
  }
  public set x(value: number) {
    const old = this._offset.x;
    // eslint-disable-next-line functional/no-let
    let allowChange = true;
    this._watchers.x?.forEach((callback) => {
      if (callback(value, old) === false) {
        allowChange = false;
      }
    });

    if (allowChange) {
      // eslint-disable-next-line functional/immutable-data
      this._offset.x = value;
    }
  }
  public get y(): number {
    return this._offset.y;
  }
  public set y(value: number) {
    const old = this._offset.y;
    // eslint-disable-next-line functional/no-let
    let allowChange = true;
    this._watchers.y?.forEach((callback) => {
      if (callback(value, old) === false) {
        allowChange = false;
      }
    });

    if (allowChange) {
      // eslint-disable-next-line functional/immutable-data
      this._offset.y = value;
    }
  }
  public $watch(
    name: string,
    callback: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newValue: any, oldValue: any): void;
    }
  ): noop {
    if (name in this._watchers === false) {
      // eslint-disable-next-line functional/immutable-data
      this._watchers[name].splice(0);
    }

    // eslint-disable-next-line functional/immutable-data
    this._watchers[name].push(callback);

    return () => {
      const index = this._watchers[name]?.findIndex(
        (item) => item === callback
      );

      if (index && index !== -1) {
        // eslint-disable-next-line functional/immutable-data
        this._watchers[name].splice(index, 1);
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
    this._canvas = canvas;

    this._viewport = {
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
        this._viewport.x,
        this._viewport.width - this._canvas.width
      )
    );
  }
  public getYOffset(value: number, diffSpeed = 1): number {
    return (
      value -
      constrain(
        this.y * diffSpeed,
        this._viewport.y,
        this._viewport.height - this._canvas.height
      )
    );
  }
  public isLimitX(): -1 | 0 | 1 {
    if (this.x < this._viewport.x) {
      return -1;
    }

    if (this.x > this._viewport.width - this._canvas.width) {
      return 1;
    }

    return 0;
  }
  public isLimitY(): -1 | 0 | 1 {
    if (this.y < this._viewport.y) {
      return -1;
    }

    if (this.y > this._viewport.height - this._canvas.height) {
      return 1;
    }

    return 0;
  }

  public isXInViewBox(element: CanvasElement, diffSpeed: number): boolean;
  public isXInViewBox(value: number, width: number, diffSpeed: number): boolean;
  public isXInViewBox(
    value: number | CanvasElement,
    width = 0,
    diffSpeed = 1
  ): boolean {
    if (value instanceof CanvasElement) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      width = (value as any).width || 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value = ((value as any).x as number) || 0;
    }

    value = this.getXOffset(value, diffSpeed);

    return value + width > 0 || value < this._canvas.width;
  }
  public isYInViewBox(element: CanvasElement, diffSpeed: number): boolean;
  public isYInViewBox(
    value: number,
    height: number,
    diffSpeed: number
  ): boolean;
  public isYInViewBox(
    value: number | CanvasElement,
    height = 0,
    diffSpeed = 1
  ): boolean {
    if (value instanceof CanvasElement) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      height = (value as any).height || 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value = ((value as any).y as number) || 0;
    }

    value = this.getYOffset(value, diffSpeed);

    return value + height > 0 || value < this._canvas.height;
  }

  public isInViewBox(
    element: CanvasElement,
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
    x: CanvasElement | number,
    y: number,
    width = 0,
    height = 0,
    diffSpeedX = 1,
    diffSpeedY = 1
  ): boolean {
    if (x instanceof CanvasElement) {
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
