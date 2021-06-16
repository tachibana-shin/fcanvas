import fCanvas from "../core/fCanvas";
import MyElement from "../core/MyElement";
import { constrain } from "../functions/index";
import { noop, Offset } from "../utils/index";

interface ViewPort {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface Range {
  min: number;
  max: number;
  default: number;
  current: number;
  dynamic: boolean;
}
interface ConfigCursor {
  x: Range;
  y: Range;
}

class Cursor {
  private _camera: Camera;
  private _config: ConfigCursor;

  public get x(): number {
    return this._config.x.current;
  }
  public set x(value: number) {}
  public get y(): number {
    return this._config.y.current;
  }
  public set y(value: number) {}

  constructor(camera: Camera, config: ConfigCursor) {
    this._camera = camera;

    this._config = config;

    const watch = (prop: keyof ConfigCursor) => {
      this._camera.$watch(prop, (newValue, oldValue) => {
        const dist = newValue - oldValue;
        // min = this._config.x.min;

        if (this._config[prop].dynamic) {
          if (
            dist < 0
              ? this[prop] > this._config[prop].min
              : this[prop] < this._config[prop].max
          ) {
            this[prop] += dist;
            return false;
          }
        } else {
          if (
            (prop === "x"
              ? this._camera.isLimitX()
              : this._camera.isLimitY()) === (dist < 0 ? -1 : 1)
          ) {
            if (this[prop] > this._config[prop].min) {
              this[prop] += dist;
            }
          }
        }
      });
    };

    watch("x");
    watch("y");
  }
}

export default class Camera {
  static Cursor: typeof Cursor = Cursor;
  private _canvas: fCanvas;
  private _viewport: ViewPort;
  private _offset: Offset = Object.create({
    x: 0,
    y: 0,
  });
  private _watchers: {
    [propName: string]: Function[];
  } = Object.create(null);

  public get x(): number {
    return this._offset.x;
  }
  public set x(value: number) {
    const old = this._offset.x;
    let allowChange = true;
    this._watchers.x?.forEach((callback) => {
      if (callback(value, old) === false) {
        allowChange = false;
      }
    });

    if (allowChange) {
      this._offset.x = value;
    }
  }
  public get y(): number {
    return this._offset.y;
  }
  public set y(value: number) {
    const old = this._offset.y;
    let allowChange = true;
    this._watchers.y?.forEach((callback) => {
      if (callback(value, old) === false) {
        allowChange = false;
      }
    });

    if (allowChange) {
      this._offset.y = value;
    }
  }
  public $watch(
    name: string,
    callback: {
      (newValue: any, oldValue: any): void;
    }
  ): noop {
    if (name in this._watchers === false) {
      this._watchers[name] = [];
    }

    this._watchers[name].push(callback);

    return () => {
      const index = this._watchers[name]?.findIndex(
        (item) => item === callback
      );

      if (index && index !== -1) {
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

  public getXOffset(value: number, diffSpeed: number = 1): number {
    return (
      value -
      constrain(
        this.x * diffSpeed,
        this._viewport.x,
        this._viewport.width - this._canvas.width
      )
    );
  }
  public getYOffset(value: number, diffSpeed: number = 1): number {
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

  public isXInViewBox(element: MyElement, diffSpeed: number): boolean;
  public isXInViewBox(value: number, width: number, diffSpeed: number): boolean;
  public isXInViewBox(
    value: number | MyElement,
    width: number = 0,
    diffSpeed: number = 1
  ): boolean {
    if (value instanceof MyElement) {
      width = (value as any).width || 0;
      value = ((value as any).x as number) || 0;
    }

    value = this.getXOffset(value, diffSpeed);

    return value + width > 0 || value < this._canvas.width;
  }
  public isYInViewBox(element: MyElement, diffSpeed: number): boolean;
  public isYInViewBox(
    value: number,
    height: number,
    diffSpeed: number
  ): boolean;
  public isYInViewBox(
    value: number | MyElement,
    height: number = 0,
    diffSpeed: number = 1
  ): boolean {
    if (value instanceof MyElement) {
      height = (value as any).height || 0;
      value = ((value as any).y as number) || 0;
    }

    value = this.getYOffset(value, diffSpeed);

    return value + height > 0 || value < this._canvas.height;
  }

  public isInViewBox(
    element: MyElement,
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
    x: MyElement | number,
    y: number,
    width: number = 0,
    height: number = 0,
    diffSpeedX: number = 1,
    diffSpeedY: number = 1
  ): boolean {
    if (x instanceof MyElement) {
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
