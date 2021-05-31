function calculateRemainder2D(
  xComponent: number,
  yComponent: number,
  vector: Vector
): typeof vector {
  if (xComponent !== 0) {
    vector.x = vector.x % xComponent;
  }

  if (yComponent !== 0) {
    vector.y = vector.y % yComponent;
  }

  return vector;
}

function calculateRemainder3D(
  xComponent: number,
  yComponent: number,
  zComponent: number,
  vector: Vector
): typeof vector {
  if (xComponent !== 0) {
    vector.x = vector.x % xComponent;
  }

  if (yComponent !== 0) {
    vector.y = vector.y % yComponent;
  }

  if (zComponent !== 0) {
    vector.z = vector.z % zComponent;
  }

  return vector;
}

export default class Vector {
  x: number;
  y: number;
  z: number;
  /**
   * Creates an instance of Vector.
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [z=0]
   * @memberof Vector
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    [this.x, this.y, this.z] = [x, y, z];
  }

  set(vector: Vector): this;
  set(offset: [number?, number?, number?]): this;
  set(x?: number, y?: number, z?: number): this;
  /**
   *
   *
   * @param {(Vector | [number?, number?, number?] | number)} x
   * @param {number} [y]
   * @param {number} [z]
   * @return {*}  {this}
   * @memberof Vector
   */
  set(
    x?: Vector | [number?, number?, number?] | number,
    y?: number,
    z?: number
  ): this {
    if (x instanceof Vector) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
      return this;
    }

    if (x instanceof Array) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
      return this;
    }

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    return this;
  }

  /**
   *
   *
   * @return {*}  {Vector}
   * @memberof Vector
   */
  copy(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  add(vector: Vector): this;
  add(offset: [number?, number?, number?]): this;
  add(x: number, y: number, z: number): this;
  /**
   *
   *
   * @param {(Vector | [number?, number?, number?] | number)} x
   * @param {number} [y]
   * @param {number} [z]
   * @return {*}  {this}
   * @memberof Vector
   */
  add(
    x: Vector | [number?, number?, number?] | number,
    y?: number,
    z?: number
  ): this {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      this.z += x.z || 0;
      return this;
    }

    if (x instanceof Array) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      this.z += x[2] || 0;
      return this;
    }

    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
  }

  rem(vector: Vector): void;
  rem(params: [number, number?, number?]): void;
  /**
   *
   *
   * @param {(Vector | [number, number?, number?])} x
   * @memberof Vector
   */
  rem(x: Vector | [number, number?, number?]): void {
    if (x instanceof Vector) {
      if (
        Number.isFinite(x.x) &&
        Number.isFinite(x.y) &&
        Number.isFinite(x.z)
      ) {
        calculateRemainder3D(x.x, x.y, x.z, this);
      }
    } else if (x instanceof Array) {
      if (
        x.every(function (element) {
          return Number.isFinite(element);
        })
      ) {
        if (x.length === 2) {
          calculateRemainder2D(x[0], x[1] as number, this);
        }

        if (x.length === 3) {
          calculateRemainder3D(x[0], x[1] as number, x[2] as number, this);
        }
      }
    } else if (arguments.length === 1) {
      if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
        this.x = this.x % arguments[0];
        this.y = this.y % arguments[0];
        this.z = this.z % arguments[0];
      }
    } else if (arguments.length === 2) {
      const vectorComponents = [].slice.call(arguments);

      if (
        vectorComponents.every(function (element) {
          return Number.isFinite(element);
        })
      ) {
        if (vectorComponents.length === 2) {
          calculateRemainder2D(vectorComponents[0], vectorComponents[1], this);
        }
      }
    } else if (arguments.length === 3) {
      var _vectorComponents = [].slice.call(arguments);

      if (
        _vectorComponents.every(function (element) {
          return Number.isFinite(element);
        })
      ) {
        if (_vectorComponents.length === 3) {
          calculateRemainder3D(
            _vectorComponents[0],
            _vectorComponents[1],
            _vectorComponents[2],
            this
          );
        }
      }
    }
  }

  sub(vector: Vector): this;
  sub(offset: [number?, number?, number?]): this;
  sub(x: number, y: number, z: number): this;
  /**
   *
   *
   * @param {(Vector | [number?, number?, number?] | number)} x
   * @param {number} [y]
   * @param {number} [z]
   * @return {*}  {this}
   * @memberof Vector
   */
  sub(
    x: Vector | [number?, number?, number?] | number,
    y?: number,
    z?: number
  ): this {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      this.z -= x.z || 0;
      return this;
    }

    if (x instanceof Array) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      this.z -= x[2] || 0;
      return this;
    }

    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  }

  /**
   *
   *
   * @param {number} n
   * @return {*}  {this}
   * @memberof Vector
   */
  mult(n: number): this {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }

  /**
   *
   *
   * @param {number} n
   * @return {*}  {this}
   * @memberof Vector
   */
  div(n: number): this {
    if (n === 0) {
      console.warn("div:", "divide by 0");
      return this;
    }

    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  }

  /**
   *
   *
   * @return {*}  {number}
   * @memberof Vector
   */
  mag(): number {
    return Math.sqrt(this.magSq());
  }

  /**
   *
   *
   * @return {*}  {number}
   * @memberof Vector
   */
  magSq(): number {
    const { x, y, z } = this;
    return x * x + y * y + z * z;
  }

  dot(vector: Vector): number;
  dot(x?: number, y?: number, z?: number): number;
  /**
   *
   *
   * @param {(number | Vector)} [x]
   * @param {number} [y]
   * @param {number} [z]
   * @return {*}  {number}
   * @memberof Vector
   */
  dot(x?: number | Vector, y?: number, z?: number): number {
    if (x instanceof Vector) {
      return this.dot(x.x, x.y, x.z);
    }

    return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
  }

  /**
   *
   *
   * @param {Vector} v
   * @return {*}  {Vector}
   * @memberof Vector
   */
  cross(v: Vector): Vector {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  /**
   *
   *
   * @return {*}  {this}
   * @memberof Vector
   */
  normalize(): this {
    const len = this.mag();
    if (len !== 0) {
      this.mult(1 / len);
    }
    return this;
  }

  /**
   *
   *
   * @param {number} max
   * @return {*}  {this}
   * @memberof Vector
   */
  limit(max: number): this {
    const mSq: number = this.magSq();

    if (mSq > max ** 2) {
      this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
    }

    return this;
  }

  /**
   *
   *
   * @param {number} n
   * @return {*}  {this}
   * @memberof Vector
   */
  setMag(n: number): this {
    return this.normalize().mult(n);
  }

  /**
   *
   *
   * @return {*}  {number}
   * @memberof Vector
   */
  heading(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   *
   *
   * @param {number} angle
   * @return {*}  {this}
   * @memberof Vector
   */
  rotate(angle: number): this {
    const newHeading: number = this.heading() + angle;
    const mag: number = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }

  /**
   *
   *
   * @param {Vector} vector
   * @return {*}  {number}
   * @memberof Vector
   */
  angleBetween(vector: Vector): number {
    const dotmagmag = this.dot(vector) / (this.mag() * vector.mag());
    const angle =
      Math.acos(Math.min(1, Math.max(-1, dotmagmag))) *
      Math.sign(this.cross(vector).z || 1);
    return angle;
  }

  lerp(vector: Vector, amt?: number): this;
  lerp(x?: number, y?: number, z?: number, amt?: number): this;
  /**
   *
   *
   * @param {(Vector | number)} [x=0]
   * @param {number} [y=0]
   * @param {number} [z=0]
   * @param {number} [amt=0]
   * @return {*}  {this}
   * @memberof Vector
   */
  lerp(
    x: Vector | number = 0,
    y: number = 0,
    z: number = 0,
    amt: number = 0
  ): this {
    if (x instanceof Vector) {
      return this.lerp(x.x, x.y, x.z, y);
    }

    this.x += (x - this.x) * amt || 0;
    this.y += (y - this.y) * amt || 0;
    this.z += (z - this.z) * amt || 0;
    return this;
  }

  /**
   *
   *
   * @param {Vector} surfaceNormal
   * @return {*}  {this}
   * @memberof Vector
   */
  reflect(surfaceNormal: Vector): this {
    surfaceNormal.normalize();
    return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
  }

  /**
   *
   *
   * @return {*}  {[number, number, number]}
   * @memberof Vector
   */
  array(): [number, number, number] {
    return [this.x || 0, this.y || 0, this.z || 0];
  }

  equals(vector: Vector): boolean;
  equals(params: [number?, number?, number?]): boolean;
  equals(x?: number, y?: number, z?: number): boolean;
  /**
   *
   *
   * @param {(Vector | [number?, number?, number?] | number)} [x]
   * @param {number} [y]
   * @param {number} [z]
   * @return {*}  {boolean}
   * @memberof Vector
   */
  equals(
    x?: Vector | [number?, number?, number?] | number,
    y?: number,
    z?: number
  ): boolean {
    let a, b, c;

    if (x instanceof Vector) {
      a = x.x || 0;
      b = x.y || 0;
      c = x.z || 0;
    } else if (x instanceof Array) {
      a = x[0] || 0;
      b = x[1] || 0;
      c = x[2] || 0;
    } else {
      a = x || 0;
      b = y || 0;
      c = z || 0;
    }

    return this.x === a && this.y === b && this.z === c;
  }

  /**
   *
   *
   * @return {*}  {string}
   * @memberof Vector
   */
  toString(): string {
    return "Vector: [" + this.array().join(", ") + "]";
  }
}
