export * from "classes/Emitter";
export interface setup {
   (callback: Function, args: any): void
}
export interface draw {
   (callback: Function, jcanvas: jCanvas, args: any): void
}
export interface keyPressed {
   (callback: Function, element: window | HTMLElement)
}
export interface changeSize {
   (callback: Function, element: window | HTMLElement)
}
export interface mouseWheel {
   (callback: Function, element: window | HTMLElement)
}
export interface mousePressed {
   (callback: Function, element: window | HTMLElement)
}
export interface mouseClicked {
   (callback: Function, element: window | HTMLElement)
}
export interface mouseMoved {
   (callback: Function, element: window | HTMLElement)
}
export interface touchStarted {
   (callback: Function, element: window | HTMLElement)
}
export interface touchMoved {
   (callback: Function, element: window | HTMLElement)
}
export interface touchEnded {
   (callback: Function, element: window | HTMLElement)
}

export * from "./jCanvas"
export * from "./MyElement"
export * from "./methods"