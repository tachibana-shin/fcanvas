declare class ResourceTile {
    image: HTMLImageElement;
    plist: {
        [propName: string]: any;
    };
    __caching: {
        [propName: string]: HTMLImageElement;
    };
    constructor(image: HTMLImageElement, plist: object);
    get(name: string): {
        image: HTMLImageElement;
        size: {
            width: number;
            height: number;
        };
    };
    has(name: string): boolean;
}
export default function (path: string): Promise<ResourceTile>;
export {};
