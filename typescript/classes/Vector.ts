function calculateRemainder2D(
  vector: Vector,
  xComponent: number,
  yComponent: number
): Vector {
  if (xComponent !== 0) {
    vector.x = vector.x % xComponent;
  }

  if (yComponent !== 0) {
    vector.y = vector.y % yComponent;
  }

  return vector;
}

function calculateRemainder3D(
  vector: Vector,
  xComponent: number,
  yComponent: number,
  zComponent: number
): Vector {
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
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    [this.x, this.y, this.z] = [x, y, z];
  }

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
  copy(): Vector {
    return new Vector(this.x, this.y, this.z);
  }
  add(
    x?: Vector | [number?, number?, number?] | number,
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
  rem(
    x?: Vector | [number, number, number?] | number,
    y?: number,
    z?: number
  ): this | void {
    if (x instanceof Vector) {
      if (
        Number.isFinite(x.x) &&
        Number.isFinite(x.y) &&
        Number.isFinite(x.z)
      ) {
        var xComponent = parseFloat(x.x + "");
        var yComponent = parseFloat(x.y + "");
        var zComponent = parseFloat(x.z + "");
        calculateRemainder3D(this, xComponent, yComponent, zComponent);
      }
    } else if (x instanceof Array) {
      if (
        x.every(function (element) {
          return Number.isFinite(element);
        })
      ) {
        if (x.length === 2) {
          calculateRemainder2D(this, x[0], x[1]);
        }

        if (x.length === 3) {
          calculateRemainder3D(this, x[0], x[1], x[2] || 0);
        }
      }
    } else if (arguments.length === 1) {
      if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
        this.x = this.x % arguments[0];
        this.y = this.y % arguments[0];
        this.z = this.z % arguments[0];
        return this;
      }
    } else if (arguments.length === 2) {
      var vectorComponents = [].slice.call(arguments);

      if (
        vectorComponents.every(function (element) {
          return Number.isFinite(element);
        })
      ) {
        if (vectorComponents.length === 2) {
          calculateRemainder2D(this, vectorComponents[0], vectorComponents[1]);
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
            this,
            _vectorComponents[0],
            _vectorComponents[1],
            _vectorComponents[2]
          );
        }
      }
    }
  }
  sub(vector: Vector): this;
  // sub([number]): this;
  sub(x?: number, y?: number, z?: number): this;
  sub(
    x?: Vector | [number?, number?, number?] | number,
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
  mult(n: number): this {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }
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
  mag(): number {
    return Math.sqrt(this.magSq());
  }
  magSq(): number {
    const { x, y, z } = this;
    return x * x + y * y + z * z;
  }
  dot(vector: Vector): number;
  dot(x?: number, y?: number, z?: number): number;
  dot(x?: Vector | number, y?: number, z?: number): number {
    if (x instanceof Vector) {
      return this.dot(x.x, x.y, x.z);
    }

    return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
  }
  cross(v: Vector | { x: number; y: number; z: number }): Vector {
    var x: number = this.y * v.z - this.z * v.y;
    var y: number = this.z * v.x - this.x * v.z;
    var z: number = this.x * v.y - this.y * v.x;

    return new Vector(x, y, z);
  }
  normalize(): this {
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }
  limit(max: number): this {
    const mSq = this.magSq();

    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
    }

    return this;
  }
  setMag(n: number): this {
    return this.normalize().mult(n);
  }
  heading(): number {
    return Math.atan2(this.y, this.x);
  }
  rotate(a: number): this {
    var newHeading = this.heading() + a;
    var mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }
  angleBetween(v: Vector): number {
    var dotmagmag = this.dot(v) / (this.mag() * v.mag());
    var angle;
    angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    angle = angle * Math.sign(this.cross(v).z || 1);

    return angle;
  }
  lerp(vector: Vector, amt: number): this;
  lerp(x: number, y: number, z: number, amt: number): this;
  lerp(x: Vector | number, y?: number, z?: number, amt: number = 1): this {
    if (x instanceof Vector) {
      return this.lerp(x.x, x.y, x.z, y || 0);
    }

    this.x += (x - this.x) * amt || 0;
    this.y += (y || 0 - this.y) * amt || 0;
    this.z += (z || 0 - this.z) * amt || 0;
    return this;
  }
  reflect(surfaceNormal: Vector): this {
    surfaceNormal.normalize();
    return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
  }
  array(): [number, number, number] {
    return [this.x || 0, this.y || 0, this.z || 0];
  }
  equals(
    x: Vector | [number, number, number] | number,
    y?: number,
    z?: number
  ): boolean {
    var a, b, c;

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
  toString(): string {
    return "Vector: [" + this.array().join(", ") + "]";
  }
}
