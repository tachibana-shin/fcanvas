import MyElement from "../core/MyElement";
interface ReturnInterfering {
    direction: number;
    element: MyElement;
}
export declare function getDirectionElement(el1: any, el2: any): any;
export declare function pressed(el: MyElement, ...otherEl: MyElement[]): ReturnInterfering | null;
export declare function isPressed(el: MyElement, ...otherEl: MyElement[]): boolean;
export {};
