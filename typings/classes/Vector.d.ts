export default class Vector {
    x: number;
    y: number;
    z: number;
    /**
     * @param {number=0} x
     * @param {number=0} y
     * @param {number=0} z
     * @return {any}
     */
    constructor(x?: number, y?: number, z?: number);
    set(vector: Vector): this;
    set(params: [number, number, number?]): this;
    set(x?: number, y?: number, z?: number): this;
    /**
     * @return {Vector}
     */
    copy(): Vector;
    add(vector: Vector): this;
    add(params?: [number?, number?, number?]): this;
    add(x?: number, y?: number, z?: number): this;
    rem(vector: Vector): this | void;
    rem(params: [number, number, number?]): this | void;
    rem(x?: number, y?: number, z?: number): this | void;
    sub(vector: Vector): this;
    sub(params?: [number?, number?, number?]): this;
    sub(x?: number, y?: number, z?: number): this;
    /**
     * @param {number} n
     * @return {this}
     */
    mult(n: number): this;
    /**
     * @param {number} n
     * @return {this}
     */
    div(n: number): this;
    /**
     * @return {number}
     */
    mag(): number;
    /**
     * @return {number}
     */
    magSq(): number;
    /**
     * @param  {Vector} vector
     * @returns number
     */
    dot(vector: Vector): number;
    dot(x?: number, y?: number, z?: number): number;
    /**
     * @param {Vector|{x:number;y:number;z:number}} v
     * @return {Vector}
     */
    cross(v: Vector | {
        x: number;
        y: number;
        z: number;
    }): Vector;
    /**
     * @return {this}
     */
    normalize(): this;
    /**
     * @param {number} max
     * @return {this}
     */
    limit(max: number): this;
    /**
     * @param {number} n
     * @return {this}
     */
    setMag(n: number): this;
    /**
     * @return {number}
     */
    heading(): number;
    /**
     * @param {number} a
     * @return {this}
     */
    rotate(a: number): this;
    /**
     * @param {Vector} v
     * @return {number}
     */
    angleBetween(v: Vector): number;
    lerp(vector: Vector, amt: number): this;
    lerp(x: number, y: number, z: number, amt: number): this;
    /**
     * @param {Vector} surfaceNormal
     * @return {this}
     */
    reflect(surfaceNormal: Vector): this;
    /**
     * @return {[number, number, number]}
     */
    array(): [number, number, number];
    /**
     * @param {Vector|[number} x
     * @param {any} number
     * @param {any} number]|number
     * @param {number} y?
     * @param {number} z?
     * @return {boolean}
     */
    equals(x: Vector | [number, number, number] | number, y?: number, z?: number): boolean;
    /**
     * @return {string}
     */
    toString(): string;
}
