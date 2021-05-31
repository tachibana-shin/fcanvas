import { constrain } from "../functions/index";
import Vector from "./Vector";

interface ViewBox {
  mx: number;
  my: number;
  width: number;
  height: number;
}
interface Viewport {
  width: number;
  height: number;
}
interface Cursor {
  __camera: Camera;

  idealX: number;
  idealY: number;

  width: number;
  height: number;

  offsetTop: number;
  offsetRight: number;
  offsetBottom: number;
  offsetLeft: number;

  x: number;
  y: number;
}

class Camera {
  public viewport: Viewport = {
    width: 0,
    height: 0,
  }; /// view port 100% frame
  public viewBox: ViewBox = {
    mx: 0,
    my: 0,
    width: 0,
    height: 0,
  }; /// view box for full canvas
  private _cx: number = 0; /// x camera
  private _cy: number = 0; /// y camera
  get cx(): number {
    return this._cx;
  }
  set cx(x: number) {
    if (this.cursor.use) {
      this._cx = constrain(
        x,
        -this.cursor.idealX - this.viewBox.mx - this.cursor.offsetLeft,
        this.viewport.width -
          this.viewBox.width +
          (this.viewBox.width - this.cursor.idealX - this.cursor.width) +
          this.cursor.offsetRight
      );
    } else {
      this._cx = constrain(
        x,
        -this.viewBox.mx,
        this.viewport.width - this.viewBox.width
      );
    }
  }
  get cy(): number {
    return this._cy;
  }
  set cy(y: number) {
    if (this.cursor.use) {
      this._cy = constrain(
        y,
        -this.cursor.idealY - this.viewBox.my - this.cursor.offsetTop,
        this.viewport.height -
          this.viewBox.height +
          (this.viewBox.height - this.cursor.idealY - this.cursor.height) +
          this.cursor.offsetBottom
      );
    } else {
      this._cy = constrain(
        y,
        -this.viewBox.my,
        this.viewport.height - this.viewBox.height
      );
    }
  }

  public readonly cursor: Cursor & {
    use: boolean;
    idealRX: number;
  } = {
    __camera: this,
    use: true,
    idealX: 0,
    idealY: 0,

    idealRX: 0,

    offsetTop: 0,
    offsetRight: 0,
    offsetBottom: 0,
    offsetLeft: 0,

    width: 0,
    height: 0,

    get x(): number {
      if (this.__camera._cx < -this.__camera.viewBox.mx) {
        const dx = -this.__camera.viewBox.mx - this.__camera._cx;

        return this.idealX - dx;
      }

      if (
        this.__camera._cx >
        this.__camera.viewport.width - this.__camera.viewBox.width
      ) {
        const dx =
          this.__camera.viewport.width -
          this.__camera.viewBox.width -
          this.__camera._cx;

        return this.idealX - dx;
      }

      return this.idealX;
    },
    set x(x: number) {
      if (x < this.idealX) {
        this.__camera._cx = x - this.idealX - this.__camera.viewBox.mx;
      }
      if (x > this.idealX + this.idealRX) {
        this.__camera._cx =
          x -
          this.idealX +
          this.__camera.viewport.width -
          this.__camera.viewBox.width -
          this.width;
      }
    },
    get y(): number {
      if (this.__camera._cy < -this.__camera.viewBox.my) {
        const dy = -this.__camera.viewBox.my - this.__camera._cy;

        return this.idealY - dy;
      }

      if (
        this.__camera._cy >
        this.__camera.viewport.height - this.__camera.viewBox.height
      ) {
        const dy =
          this.__camera.viewport.height -
          this.__camera.viewBox.height -
          this.__camera._cy;

        return this.idealY - dy;
      }

      return this.idealY;
    },
    set y(y: number) {
      if (y < this.idealY) {
        this.__camera._cy = y - this.idealY - this.__camera.viewBox.my;
      }
      if (y > this.idealY) {
        this.__camera._cy =
          y -
          this.idealY +
          this.__camera.viewport.height -
          this.__camera.viewBox.height -
          this.height;
      }
    },
  };

  /**
   * @param {number} width?
   * @param {number} height?
   * @param {number} x?
   * @param {number} y?
   * @param {number} vWidth?
   * @param {number} vHeight?
   * @param {number|false} cix?
   * @param {number} ciy?
   * @param {number} cwidth?
   * @param {number} cheight?
   * @return {any}
   */
  constructor(
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    vWidth?: number,
    vHeight?: number,
    cix?: number | false,
    ciy?: number,
    cwidth?: number,
    cheight?: number
  ) {
    this.setViewport(width || 0, height || 0);
    this.setViewBox(x || 0, y || 0, vWidth || 0, vHeight || 0);

    if (cix === false) {
      this.setCursor(false);
    } else {
      this.setCursor(
        cix as number,
        ciy as number,
        cwidth as number,
        cheight as number
      );
    }
  }

  /**
   * @param {number} width?
   * @param {number} height?
   * @return {void}
   */
  setViewport(width: number, height: number): void {
    this.viewport.width = width || 0;
    this.viewport.height = height || 0;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {void}
   */
  setViewBox(x: number, y: number, width: number, height: number): void {
    this.viewBox.mx = x || 0;
    this.viewBox.my = y || 0;
    this.viewBox.width = width || 0;
    this.viewBox.height = height || 0;
  }
  setCursor(
    idealX: number,
    idealY: number,
    width?: number,
    height?: number
  ): void;
  setCursor(use: false): void;
  /**
   * @param {number|false} idealX
   * @param {number} idealY?
   * @param {number} width?
   * @param {number} height?
   * @return {void}
   */
  setCursor(
    idealX: number | false,
    idealY?: number,
    width?: number,
    height?: number
  ): void {
    if (arguments.length === 1) {
      if (idealX === false) {
        this.cursor.use = false;
      }
    } else {
      this.cursor.idealX = idealX || 0;
      this.cursor.idealY = idealY || 0;
      this.cursor.width = width || 0;
      this.cursor.height = height || 0;
    }
  }
  /**
   * @param {number} x
   * @param {number=1} scale
   * @return {number}
   */
  followX(x: number, scale: number = 1): number {
    return (
      x -
      constrain(
        this._cx * scale,
        -this.viewBox.mx,
        this.viewport.width - this.viewBox.width
      )
    );
  }

  /**
   * @param {number} y
   * @param {number=1} scale
   * @return {number}
   */
  followY(y: number, scale: number = 1): number {
    return (
      y -
      constrain(
        this._cy * scale,
        -this.viewBox.my,
        this.viewport.height - this.viewBox.height
      )
    );
  }

  /**
   * @param {Vector} vector
   * @param {number=1} scaleX
   * @param {number=scaleX} scaleY
   * @return {Vector}
   */
  followVector(
    vector: Vector,
    scaleX: number = 1,
    scaleY: number = scaleX
  ): Vector {
    return vector.set(
      this.followX(vector.x, scaleX),
      this.followY(vector.y, scaleY)
    );
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number=1} scaleX
   * @param {number=scaleX} scaleY
   * @return {any}
   */
  follow(
    x: number,
    y: number,
    scaleX: number = 1,
    scaleY: number = scaleX
  ): {
    x: number;
    y: number;
  } {
    return {
      x: this.followX(x, scaleX),
      y: this.followY(y, scaleY),
    };
  }
  /**
   * @param {number} x
   * @param {number=0} width
   * @param {number=1} scale
   * @return {boolean}
   */
  xInViewBox(x: number, width: number = 0, scale: number = 1): boolean {
    x = this.followX(x, scale);

    if (
      this.viewBox.mx < x + width &&
      this.viewBox.mx + this.viewBox.width > x
    ) {
      return true;
    }

    return false;
  }
  /**
   * @param {number} y
   * @param {number=0} height
   * @param {number=1} scale
   * @return {boolean}
   */
  yInViewBox(y: number, height: number = 0, scale: number = 1): boolean {
    y = this.followY(y, scale);

    if (
      this.viewBox.my < y + height &&
      this.viewBox.my + this.viewBox.height > y
    ) {
      return true;
    }

    return false;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number=0} width
   * @param {number=0} height
   * @param {number=1} scaleX
   * @param {number=scaleX} scaleY
   * @return {boolean}
   */
  inViewBox(
    x: number,
    y: number,
    width: number = 0,
    height: number = 0,
    scaleX: number = 1,
    scaleY: number = scaleX
  ): boolean {
    return (
      this.xInViewBox(x, width, scaleX) && this.yInViewBox(y, height, scaleY)
    );
  }
  /**
   * @param {number} x
   * @param {number=0} width
   * @param {number=1} scale
   * @return {boolean}
   */
  xAfterViewBox(x: number, width: number = 0, scale: number = 1): boolean {
    x = this.followX(x, scale);

    if (this.viewBox.mx >= x + width) {
      return true;
    }

    return false;
  }
  /**
   * @param {number} y
   * @param {number=0} height
   * @param {number=1} scale
   * @return {boolean}
   */
  yAfterViewBox(y: number, height: number = 0, scale: number = 1): boolean {
    y = this.followY(y, scale);

    if (this.viewBox.my >= y + height) {
      return true;
    }

    return false;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number=0} width
   * @param {number=0} height
   * @param {number=1} scaleX
   * @param {number=scaleX} scaleY
   * @return {boolean}
   */
  afterViewBox(
    x: number,
    y: number,
    width: number = 0,
    height: number = 0,
    scaleX: number = 1,
    scaleY: number = scaleX
  ): boolean {
    return (
      this.xAfterViewBox(x, width, scaleX) && this.yAfterViewBox(y, height, scaleY)
    );
  }
  /**
   * @param {number} x
   * @param {number=0} width
   * @param {number=1} scale
   * @return {boolean}
   */
  xBeforeViewBox(x: number, width: number = 0, scale: number = 1): boolean {
    x = this.followX(x, scale);

    if (
      this.viewBox.mx + this.viewBox.width <= x
    ) {
      return true;
    }

    return false;
  }
  /**
   * @param {number} y
   * @param {number=0} height
   * @param {number=1} scale
   * @return {boolean}
   */
  yBeforeViewBox(y: number, height: number = 0, scale: number = 1): boolean {
    y = this.followY(y, scale);

    if (
      this.viewBox.my + this.viewBox.height <= y
    ) {
      return true;
    }

    return false;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number=0} width
   * @param {number=0} height
   * @param {number=1} scaleX
   * @param {number=scaleX} scaleY
   * @return {boolean}
   */
  beforeViewBox(
    x: number,
    y: number,
    width: number = 0,
    height: number = 0,
    scaleX: number = 1,
    scaleY: number = scaleX
  ): boolean {
    return (
      this.xBeforeViewBox(x, width, scaleX) && this.yBeforeViewBox(y, height, scaleY)
    );
  }
}

export default Camera;
