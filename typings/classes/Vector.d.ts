export default class Vector {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x?: Vector | [number?, number?, number?] | number, y?: number, z?: number): this;
    copy(): Vector;
    add(x?: Vector | [number?, number?, number?] | number, y?: number, z?: number): this;
    rem(x?: Vector | [number, number, number?] | number, y?: number, z?: number): this | void;
    sub(vector: Vector): this;
    sub(x?: number, y?: number, z?: number): this;
    mult(n: number): this;
    div(n: number): this;
    mag(): number;
    magSq(): number;
    dot(vector: Vector): number;
    dot(x?: number, y?: number, z?: number): number;
    cross(v: Vector | {
        x: number;
        y: number;
        z: number;
    }): Vector;
    normalize(): this;
    limit(max: number): this;
    setMag(n: number): this;
    heading(): number;
    rotate(a: number): this;
    angleBetween(v: Vector): number;
    lerp(vector: Vector, amt: number): this;
    lerp(x: number, y: number, z: number, amt: number): this;
    reflect(surfaceNormal: Vector): this;
    array(): [number, number, number];
    equals(x: Vector | [number, number, number] | number, y?: number, z?: number): boolean;
    toString(): string;
}
