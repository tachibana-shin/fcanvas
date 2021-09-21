interface ImageResource extends HTMLImageElement {
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
    get(name: string): ImageResource;
    has(name: string): boolean;
}
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
