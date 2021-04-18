export declare class Vector {

   constructor(x?: number, y?: number, z?: number)

   set(x: Vector | number, y?: number, z?: number): Vector
   copy(): Vector
   add(x: Vector | number, y?: number, z?: number): Vector
   rem(x: Vector | number, y?: number, z?: number): Vector | void
   sub(x: Vector | number, y?: number, z?: number): Vector
   mult(n: number): Vector
   div(n: number): Vector
   mag(): number
   magSq(): number
   dot(x: Vector | number, y?: number, z?: number): Number
   cross(v: number): Vector
   normalize(): Vector
   limit(max: number): Vector
   setMag(n: number): Vector
   heading(): number
   rotate(a: number
   ): Vector
   angleBetween(v: number): number
   lerp(x: Vector | number, y?: number, z?: number, amt?: number): Vector
   reflect(surfaceNormal: Vector): Vector
   array(): Array<number>
   equals(x: Vector | Array<number> | number, y?: number, z?: number): boolean
   toString(): string
}