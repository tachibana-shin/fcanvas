export declare const requestAnimationFrame: ((
  callback: FrameRequestCallback
) => number) &
  typeof globalThis.requestAnimationFrame;
export declare const isTouch: boolean;
export declare const passive: boolean;
export declare function camelCase(str: string): string;
export declare const windowSize: {
  windowWidth: {
    get: () => number;
  };
  windowHeight: {
    get: () => number;
  };
};
export declare function convertToPx(string: string | number): string;
export declare function trim(string: string): string;
export declare function fontToArray(
  font: string
): {
  size: number;
  family: string;
  weight: string;
};
export declare function AutoToPx(
  string: string,
  fi: number,
  fontSize: number
): number;
export interface Touch {
  x: number;
  y: number;
  winX: any;
  winY: any;
  id: any;
}
export declare function getTouchInfo(element: Element, touches: any): Touch[];
export declare function toPromise<T>(promise: T): Promise<T>;
export declare function isMobile(): boolean;
