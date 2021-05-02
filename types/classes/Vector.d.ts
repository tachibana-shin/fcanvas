interface FnActive<T> {
  (x?: number, y?: number, z?: number): T;
  (prop: Array<number>[3 | 2 | 1]): T;
  (vector: Vector): T;
}
interface Fn<T> {
  (x: number, y?: number, z?: number): T;
  (vector: Vector): T;
}

export default class Vector {
  constructor(x?: number, y?: number, z?: number);
  set: FnActive<this>;
  copy(): Vector;
  add: FnActive<this>;
  rem: FnActive<this | void>;
  sub: FnActive<this>;
  mult(n: number): this;
  div(n: number): this;
  mag(): number;
  magSq(): number;
  dot: Fn<number>;
  cross(v: number): Vector;
  normalize(): this;
  limit(max: number): this;
  setMag(n: number): this;
  heading(): number;
  rotate(a: number): this;
  angleBetween(v: number): number;
  lerp: Fn<this>;
  reflect(surfaceNormal: Vector): this;
  array(): Array<number>[3];
  equals: FnActive<boolean>;
  toString(): string;
}
