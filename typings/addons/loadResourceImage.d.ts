declare class ResourceTile {
    image: HTMLImageElement;
    plist: {
        [propName: string]: any;
    };
    __caching: {
        [propName: string]: HTMLImageElement;
    };
    constructor(image: HTMLImageElement, plist: object);
    /**
     * @param {string} name
     * @return {any}
     */
    get(name: string): {
        image: HTMLImageElement;
        size: {
            width: number;
            height: number;
        };
    };
    has(name: string): boolean;
}
/**
 * @param {string} path
 * @return {Promise<ResourceTile>}
 */
export default function loadResourceImage(path: string): Promise<ResourceTile>;
export {};
