import { Vector  } from "./classes/Vector";

interface CircleElement {
   x: number,
   y: number,
   radius: number
}
interface RectElement {
   x: number,
   y: number,
   width: number,
   height: number
}

export interface CircleImpact {
   (el1: CircleElement, el2: CircleElement): boolean
}
export interface CircleImpactPoint {
   (el: CircleElement, x: number, y: number): boolean
}
export interface CircleImpactRect {
   (rect: RectElement, circle: CircleElement): boolean
}
export interface RectImpact {
   (rect1: RectElement, rect2: RectElement): boolean
}
export interface RectImpactPoint {
   (rect: RectElement, x: number, y: number): boolean
}

export interface constrain {
   (value: number, min: number, max: number): number
}
export interface createMatrix {
   (css: string): Array<number>
}
export interface createVector {
   (...args: any): Vector
}

export interface loadImage {
   (src: string): Promise<HTMLImageElement>
}
export interface map {
   (value: number, min: number, max: number, minr: number, maxr: number): number
}
export interface random {
   (start?: number, end?: number): number
}
export interface range {
   (start: number | string, end: number | string, step: number): Array<number | string>
}