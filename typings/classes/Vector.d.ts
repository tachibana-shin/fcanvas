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
    constructor(x?: number, y?: number, z?: number);
    set(vector: Vector): this;
    set(offset: [number?, number?, number?]): this;
    set(x?: number, y?: number, z?: number): this;
    /**
     *
     *
     * @return {*}  {Vector}
     * @memberof Vector
     */
    copy(): Vector;
    add(vector: Vector): this;
    add(offset: [number?, number?, number?]): this;
    add(x: number, y: number, z: number): this;
    rem(vector: Vector): void;
    rem(params: [number, number?, number?]): void;
    sub(vector: Vector): this;
    sub(offset: [number?, number?, number?]): this;
    sub(x: number, y: number, z: number): this;
    /**
     *
     *
     * @param {number} n
     * @return {*}  {this}
     * @memberof Vector
     */
    mult(n: number): this;
    /**
     *
     *
     * @param {number} n
     * @return {*}  {this}
     * @memberof Vector
     */
    div(n: number): this;
    /**
     *
     *
     * @return {*}  {number}
     * @memberof Vector
     */
    mag(): number;
    /**
     *
     *
     * @return {*}  {number}
     * @memberof Vector
     */
    magSq(): number;
    dot(vector: Vector): number;
    dot(x?: number, y?: number, z?: number): number;
    /**
     *
     *
     * @param {Vector} v
     * @return {*}  {Vector}
     * @memberof Vector
     */
    cross(v: Vector): Vector;
    /**
     *
     *
     * @return {*}  {this}
     * @memberof Vector
     */
    normalize(): this;
    /**
     *
     *
     * @param {number} max
     * @return {*}  {this}
     * @memberof Vector
     */
    limit(max: number): this;
    /**
     *
     *
     * @param {number} n
     * @return {*}  {this}
     * @memberof Vector
     */
    setMag(n: number): this;
    /**
     *
     *
     * @return {*}  {number}
     * @memberof Vector
     */
    heading(): number;
    /**
     *
     *
     * @param {number} angle
     * @return {*}  {this}
     * @memberof Vector
     */
    rotate(angle: number): this;
    /**
     *
     *
     * @param {Vector} vector
     * @return {*}  {number}
     * @memberof Vector
     */
    angleBetween(vector: Vector): number;
    lerp(vector: Vector, amt?: number): this;
    lerp(x?: number, y?: number, z?: number, amt?: number): this;
    /**
     *
     *
     * @param {Vector} surfaceNormal
     * @return {*}  {this}
     * @memberof Vector
     */
    reflect(surfaceNormal: Vector): this;
    /**
     *
     *
     * @return {*}  {[number, number, number]}
     * @memberof Vector
     */
    array(): [number, number, number];
    equals(vector: Vector): boolean;
    equals(params: [number?, number?, number?]): boolean;
    equals(x?: number, y?: number, z?: number): boolean;
    /**
     *
     *
     * @return {*}  {string}
     * @memberof Vector
     */
    toString(): string;
}
