type Offset = {
  x: number;
  y: number
}

export default class Transform {
  private dirty = false;
  public m: number[] = [1, 0, 0, 1, 0, 0];
  constructor(m?: number[]) {
    this.m = m || this.m
  }
  reset() {
    this.m[0] = 1;
    this.m[1] = 0;
    this.m[2] = 0;
    this.m[3] = 1;
    this.m[4] = 0;
    this.m[5] = 0;
  }
  /**
   * Copy Konva.Transform object
   * @method
   * @name Konva.Transform#copy
   * @returns {Konva.Transform}
   * @example
   * const tr = shape.getTransform().copy()
   */
  copy() {
    return new Transform(this.m);
  }
  copyInto(tr: Transform) {
    tr.m[0] = this.m[0];
    tr.m[1] = this.m[1];
    tr.m[2] = this.m[2];
    tr.m[3] = this.m[3];
    tr.m[4] = this.m[4];
    tr.m[5] = this.m[5];
  }
  /**
   * Transform point
   * @method
   * @name Konva.Transform#point
   * @param {Object} point 2D point(x, y)
   * @returns {Object} 2D point(x, y)
   */
  point(point: Offset): Offset {
    const m = this.m;
    return {
      x: m[0] * point.x + m[2] * point.y + m[4],
      y: m[1] * point.x + m[3] * point.y + m[5],
    };
  }
  /**
   * Apply translation
   * @method
   * @name Konva.Transform#translate
   * @param {Number} x
   * @param {Number} y
   * @returns {Konva.Transform}
   */
  translate(x: number, y: number): this {
    this.m[4] += this.m[0] * x + this.m[2] * y;
    this.m[5] += this.m[1] * x + this.m[3] * y;
    return this;
  }
  /**
   * Apply scale
   * @method
   * @name Konva.Transform#scale
   * @param {Number} sx
   * @param {Number} sy
   * @returns {Konva.Transform}
   */
  scale(sx: number, sy: number): this {
    this.m[0] *= sx;
    this.m[1] *= sx;
    this.m[2] *= sy;
    this.m[3] *= sy;
    return this;
  }
  /**
   * Apply rotation
   * @method
   * @name Konva.Transform#rotate
   * @param {Number} rad  Angle in radians
   * @returns {Konva.Transform}
   */
  rotate(rad: number): this {
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const m11 = this.m[0] * c + this.m[2] * s;
    const m12 = this.m[1] * c + this.m[3] * s;
    const m21 = this.m[0] * -s + this.m[2] * c;
    const m22 = this.m[1] * -s + this.m[3] * c;
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    return this;
  }
  /**
   * Returns the translation
   * @method
   * @name Konva.Transform#getTranslation
   * @returns {Object} 2D point(x, y)
   */
  getTranslation(): Offset {
    return {
      x: this.m[4],
      y: this.m[5],
    };
  }
  /**
   * Apply skew
   * @method
   * @name Konva.Transform#skew
   * @param {Number} sx
   * @param {Number} sy
   * @returns {Konva.Transform}
   */
  skew(sx: number, sy: number): this {
    const m11 = this.m[0] + this.m[2] * sy;
    const m12 = this.m[1] + this.m[3] * sy;
    const m21 = this.m[2] + this.m[0] * sx;
    const m22 = this.m[3] + this.m[1] * sx;
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    return this;
  }
  /**
   * Transform multiplication
   * @method
   * @name Konva.Transform#multiply
   * @param {Konva.Transform} matrix
   * @returns {Konva.Transform}
   */
  multiply(matrix: Transform): this {
    const m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
    const m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
    const m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
    const m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
    const dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
    const dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    this.m[4] = dx;
    this.m[5] = dy;
    return this;
  }
  /**
   * Invert the matrix
   * @method
   * @name Konva.Transform#invert
   * @returns {Konva.Transform}
   */
  invert(): this {
    const d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
    const m0 = this.m[3] * d;
    const m1 = -this.m[1] * d;
    const m2 = -this.m[2] * d;
    const m3 = this.m[0] * d;
    const m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
    const m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
    this.m[0] = m0;
    this.m[1] = m1;
    this.m[2] = m2;
    this.m[3] = m3;
    this.m[4] = m4;
    this.m[5] = m5;
    return this;
  }
  /**
   * return matrix
   * @method
   * @name Konva.Transform#getMatrix
   */
  getMatrix() {
    return this.m;
  }
  /**
   * set to absolute position via translation
   * @method
   * @name Konva.Transform#setAbsolutePosition
   * @returns {Konva.Transform}
   * @author ericdrowell
   */
  setAbsolutePosition(x: number, y: number) {
    const m0 = this.m[0],
      m1 = this.m[1],
      m2 = this.m[2],
      m3 = this.m[3],
      m4 = this.m[4],
      m5 = this.m[5],
      yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2),
      xt = (x - m4 - m2 * yt) / m0;
    return this.translate(xt, yt);
  }
  /**
   * convert transformation matrix back into node's attributes
   * @method
   * @name Konva.Transform#decompose
   * @returns {Konva.Transform}
   */
  decompose(): Offset &
  {
    rotation: number
    scaleX: number
    scaleY: number
    skewX: number
    skewY: number

  } {
    const a = this.m[0];
    const b = this.m[1];
    const c = this.m[2];
    const d = this.m[3];
    const e = this.m[4];
    const f = this.m[5];
    const delta = a * d - b * c;
    let result = {
      x: e,
      y: f,
      rotation: 0,
      scaleX: 0,
      scaleY: 0,
      skewX: 0,
      skewY: 0,
    };
    // Apply the QR-like decomposition.
    if (a != 0 || b != 0) {
      const r = Math.sqrt(a * a + b * b);
      result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
      result.scaleX = r;
      result.scaleY = delta / r;
      result.skewX = (a * c + b * d) / delta;
      result.skewY = 0;
    }
    else if (c != 0 || d != 0) {
      const s = Math.sqrt(c * c + d * d);
      result.rotation =
        Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
      result.scaleX = delta / s;
      result.scaleY = s;
      result.skewX = 0;
      result.skewY = (a * c + b * d) / delta;
    }
    else;
    // result.rotation = Util._getRotation(result.rotation);
    return result;
  }
}
