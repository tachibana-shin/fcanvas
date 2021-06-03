import MyElement from "../src/core/MyElement";
import Vector from "../src/classes/Vector";

export class Poly extends MyElement {
  public static persistent: number = 1000;
  public persistent: number = Poly.persistent;
  protected __store: [number, number, number][] = [];
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  constructor(...points: number[] | [number, number, number][]) {
    super();
    if (Array.isArray(points[0])) {
      this.__store.push(...(points as [number, number, number][]));
    } else {
      for (let i = 0; i < points.length - 3; i += 3) {
        this.__store.push(points.slice(i, 3) as [number, number, number]);
      }
    }
  }

  protected getScale(z: number): number {
    return this.persistent / (this.persistent + z);
  }
  protected getX(x: number, z: number): number {
    return (
      (x + this.x - this.$parent.width / 2) * this.getScale(z + this.z) +
      this.$parent.width / 2
    );
  }
  protected getY(y: number, z: number): number {
    return (
      (y + this.y - this.$parent.height / 2) * this.getScale(z + this.z) +
      this.$parent.height / 2
    );
  }
  public set(vector: Vector): void;
  public set(x: number, y: number, z: number): void;
  public set(x: Vector | number, y?: number, z?: number): void {
    if (x instanceof Vector) {
      [this.x, this.y, this.z] = [x.x, x.y, x.z];
    } else {
      [this.x, this.y, this.z] = [x || 0, y || 0, z || 0];
    }
  }
}

export class Polyline3D extends Poly {
  constructor(...points: number[]);
  constructor(...points: [number, number, number][]);
  constructor(...points: number[] | [number, number, number][]) {
    super(...points);
  }

  poly(): void {
    if (this.__store.length > 0) {
      this.move(
        this.getX(this.__store[0][0], this.__store[0][2]),
        this.getY(this.__store[0][1], this.__store[0][2])
      );

      let index = 1;

      const { length } = this.__store;

      while (index < length) {
        this.to(
          this.getX(this.__store[index][0], this.__store[index][2]),
          this.getY(this.__store[index][1], this.__store[index][2])
        );
        index++;
      }
    }
  }
}

export class Polygon3D extends Polyline3D {
  constructor(...points: number[]);
  constructor(...points: [number, number, number][]);
  constructor(...points: number[] | [number, number, number][]) {
    if (Array.isArray(points[0])) {
      super(...(points as any), points[0]);
    } else {
      super(
        ...(points as any),
        points[0] as number,
        points[1] as number,
        points[2] as number
      );
    }
  }
}
