export interface ImageResource extends HTMLImageElement {
    image?: HTMLImageElement;
    size: {
        width: number;
        height: number;
    };
}
export declare class ResourceTile {
    private image;
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
 * @return {Promise<ResourceTile>}
 */
export default function loadResourceImage(path: string): Promise<ResourceTile>;