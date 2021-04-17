export interface Emitter {
   on(name: string, callback: Function): void
   off(name: string, callback?: Function): void
   emit(name: string, payload: any): void
}