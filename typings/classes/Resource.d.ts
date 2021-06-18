import { ResourceTile, ImageResource } from "../addons/loadResourceImage";
interface ResourceParam {
    src: string;
    lazy: boolean;
    type: "image" | "audio" | "plist" | "json" | "txt" | "map";
}
declare type ResourceType = ResourceTile | HTMLImageElement | HTMLAudioElement | any[] | Object | String;
export default class Resource {
    private _resourcesLoaded;
    private _desResources;
    private _set;
    private _delete;
    constructor(resources: {
        [propName: string]: string | ResourceParam;
    }, autoLoad?: boolean);
    isLoaded(name?: string): boolean;
    load(name?: string): Promise<void>;
    get(path: string): ResourceType | ImageResource;
}
export {};
