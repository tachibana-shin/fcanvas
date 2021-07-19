export interface ImageResource extends HTMLImageElement {
    image: HTMLImageElement;
    size: {
        width: number;
        height: number;
    };
}
declare class TilesResource {
    private tileRoot;
    private plist;
    private __caching;
    constructor(image: HTMLImageElement, plist: object);
    /**
     * @param {string} name
     * @return {any}
     */
    get(name: string): ImageResource;
    /**
     * @param {string} name
     * @return {boolean}
     */
    has(name: string): boolean;
}
/**
 * @param {string} path
 * @return {Promise<TilesResource>}
 */
export declare function loadResourceImage(path: string): Promise<TilesResource>;
export default class Resource {
    private resourceLoaded;
    private resourceDescription;
    constructor(description: {
        [propName: string]: {
            src: string;
            lazy?: boolean;
        } | string;
    }, autoLoad?: boolean);
    load(name?: string): Promise<void>;
    isLoaded(name?: string): boolean;
    get(type: "image", path: string): HTMLImageElement;
    get(type: "audio", path: string): HTMLAudioElement;
    get(type: "plist", path: string): TilesResource;
}
export {};
